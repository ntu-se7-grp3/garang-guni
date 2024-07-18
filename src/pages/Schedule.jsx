import { useState } from "react";
import { NavLink } from "react-router-dom";
import ScheduleMap from "../components/ScheduleMap";
import styles from "./Schedule.module.css";

function Schedule() {
  const [postalCode, setPostalCode] = useState("");
  const [zone, setZone] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handlePostalCodeChange = (e) => {
    const code = e.target.value;
    setPostalCode(code);
    setShowMessage(false);
  };

  const zoneSearchHandler = () => {
    if (isNaN(postalCode) || postalCode.length != 6) {
      setZone("Invalid Postal Code");
      setShowMessage(true);
      return;
    }
    //check the first 2 digit of postalcode 01-82 to find the zone based on logic below
    const firstTwoDigits = postalCode.substring(0, 2);
    if (firstTwoDigits >= 83 || firstTwoDigits <= 0) {
      setZone("Invalid Postal Code");
      setShowMessage(true);
      return;
    }

    if ((firstTwoDigits >= 72 && firstTwoDigits <= 76) || firstTwoDigits == 58 || firstTwoDigits == 59) {
      setZone("North West");
    } else if ((firstTwoDigits >= 51 && firstTwoDigits <= 55) || firstTwoDigits == 82) {
      setZone("North East");
    } else if ((firstTwoDigits >= 60 && firstTwoDigits <= 71) || (firstTwoDigits >= 14 && firstTwoDigits <= 16)) {
      setZone("South West");
    } else if ((firstTwoDigits >= 31 && firstTwoDigits <= 50) || firstTwoDigits == 81) {
      setZone("North East");
    } else {
      setZone("Central");
    }
    setShowMessage(true);
  };

  const resetHandler = () => {
    setPostalCode("");
    setZone("");
    setShowMessage(false);
  };

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.intro}>
        <h3>Our Collection Schedule</h3>
        <p>Our team is rounding the island everyday.</p>
        <p>Checkout our collection station below (click on the pin)</p>
      </div>
      <ScheduleMap />
      <h3>Unsure which zone?</h3>
      <div className={styles.zoneCheck}>
        <label htmlFor="postalCode">Enter your postal code: </label>
        <input
          id="postalcode"
          type="number"
          value={postalCode}
          onChange={handlePostalCodeChange}
          className={styles.inputBox}
        />
        <button type="button" onClick={zoneSearchHandler} className={styles.button}>
          CHECK
        </button>
        <button type="button" onClick={resetHandler} className={styles.button}>
          RESET
        </button>
      </div>
      {showMessage && (
        <p>
          Postal code{" "}
          <span className={zone === "Invalid Postal Code" ? styles.invalidZone : styles.postalCode}>{postalCode}</span>{" "}
          zoning is :<span className={zone === "Invalid Postal Code" ? styles.invalidZone : styles.zone}>{zone}</span>
        </p>
      )}
      <br />
      <p>
        Got Something to trade with us? Click{" "}
        <NavLink to="/booking" style={{ textDecoration: "underline" }}>
          here
        </NavLink>{" "}
        to book
      </p>
    </div>
  );
}

export default Schedule;
