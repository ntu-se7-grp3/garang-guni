import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from "./BookNow.module.css";
import backEnd from "../api/back-end-api";

const HAIKU = ["Time for new chapters", "Treasure await new hands", "Book your slot today"];

const splitLastWord = (str) => {
  const wordArr = str.split(" ");
  return [wordArr.slice(0, -1).join(" ") + " ", wordArr.slice(-1).toString()];
};

/* This is temp until login and register component is done.*/
const getFakeToken = () => {return "70d3af81-7c2d-49a1-b5c4-f82ae8979426";}

const isValidSession = (token) => {return token === "70d3af81-7c2d-49a1-b5c4-f82ae8979426";}

const locationAreasInSg = ["Central","East","North","North-East","West"];

function BookNow() {
  const [dateAndLocations, setDateAndLocations] = useState({});
  const [listOfAvailDates, setlistOfAvailDates]= useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const sessionToken = getFakeToken();

  useEffect(() => {
    console.log("Getting date and location");
    getDatesAndLocations();
  },[]);

  const getDatesAndLocations = async () => {
    try {
      console.log("🔎Starting getDatesAndLocations");
      if (!isValidSession(sessionToken)) {
        console.error(`🚨 Error: Forbidden (403): Please log In with correct credientials!`);
        return;
      }
      const response = await backEnd.get("/dateAndLocations");
      setDateAndLocations(response.data[0]);
      console.log("✅ Data retrieved");
      console.log("⏳ Converting to list of available dates");
      setlistOfAvailDates(Object.keys(response.data[0].dateWithLocation)
                                 .map((unixStr) => {
                                   return new Date(parseInt(unixStr)* 1000);
                                 }));
      console.log("✅ Converted Successfully");
    } catch (error) {
      console.error(`🚨 Error: ${error.code}(${error.response.status}): ${error.message}`);
    } finally {
      console.log("✅ getDatesAndLocations ran successfully!");
    }
  };

  const isSelectable = (date) => {
    return listOfAvailDates.some((availableDate) => availableDate.getTime() === date.getTime());
  };

  const handleDateChange = (date) => {
    if (isSelectable(date)) {
      setSelectedDate(date);
    }
  };

  return (
    <>
      <div>
        <div>
          <p>Turn your trash into cash</p>
          <div>
            {HAIKU.map((text, i) => {
              if (i === 1) {
                const [preHighlightWord, highlightWord] = splitLastWord(text);
                return <p key={i}>
                  {preHighlightWord}<span className="highlight">{highlightWord}</span>
                </p>
              }
              return <p key={i}>{text}</p>;
            })}
          </div>
          <p>Find the list of eligible items for trade <button>here!</button></p>
        </div>
        <div>
          <div style={{display:"flex"}}>
            <div className="chooseLocation">
              <p>Location</p>
            </div>
            <div className="chooseDate">
              <p>Date</p>
              <DatePicker
                showIcon
                closeOnScroll={true}
                selected={selectedDate}
                onChange={handleDateChange}
                highlightDates={listOfAvailDates}
                dateFormat="dd/MM/YYYY"
                filterDate={isSelectable}
                popperPlacement="top-end"
                popperClassName={styles.popper}
              />
            </div>
            <button>Book Now </button>
          </div>
        </div>
      </div>
    </>

  );

}

export default BookNow;