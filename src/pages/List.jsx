import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import recycleLogo from "../assets/list/recycle-500.svg";
import bannerText from "../assets/list/listBannerText.png";
import radioLogo from "../assets/list/radio.svg";
import tvLogo from "../assets/list/tv.svg";
import phoneLogo from "../assets/list/phone.svg";
import laptopLogo from "../assets/list/laptop.svg";
import batteryLogo from "../assets/list/battery.svg";
import brokenBulbLogo from "../assets/list/brokenBulb.svg";
import refrigeratorLogo from "../assets/list/refrigerator.svg";
import newspaperLogo from "../assets/list/newspaper.svg";
import paperLogo from "../assets/list/paper.svg";
import magazineLogo from "../assets/list/magazine.svg";
import bookLogo from "../assets/list/book.svg";
import brochureLogo from "../assets/list/brochure.svg";
import plantLogo from "../assets/list/plant.svg";
import paperTowelLogo from "../assets/list/paperTowel.svg";
import styrofoamLogo from "../assets/list/styrofoam.svg";
import crayonPaperLogo from "../assets/list/crayonPaper.svg";
import clothesLogo from "../assets/list/clothes.svg";
import shoesLogo from "../assets/list/shoes.svg";
import bagsLogo from "../assets/list/bags.svg";
import curtainLogo from "../assets/list/curtain.svg";
import nonRecyclableLogo from "../assets/list/nonRecyclable.svg";
import styles from "./List.module.css";
import ListTable from '../components/ListTable';
import backEnd from '../api/back-end-api';

const DATAS = {
  OLD_ELECTRONIC_DEVICE: [ 
    "Old TV",
    "Old Radio",
    "Old HandPhone",
    "Old Laptop",
    "Old Power Supply Unit (PSU)",
    "Other Electronics"
  ],
  RECYCLABLE_PRODUCTS: [
    "Newspaper",
    "Paper",
    "Magazine",
    "Books",
    "Brouchers",
    "Cans",
    "Cardboard",
    "Scrap Metal",
    "Other Recyclable Products"
  ],
  CLOTHING_RELATED_OBJ: [
    "Old Clothes",
    "Old Shoes",
    "Old Bags",
    "Old Curtain"
  ]
}

const PICTURE_PATH = {
  OLD_ELECTRONIC_DEVICE: {
    ACCEPTED: [radioLogo, tvLogo, phoneLogo, laptopLogo],
    REJECTED: [brokenBulbLogo, refrigeratorLogo, batteryLogo],
  },
  RECYCLABLE_PRODUCTS:{
    ACCEPTED: [newspaperLogo, paperLogo, 
               magazineLogo, bookLogo, brochureLogo],
    REJECTED: [plantLogo, paperTowelLogo, styrofoamLogo, crayonPaperLogo],
  },
  CLOTHING_RELATED_OBJ:{
    ACCEPTED: [clothesLogo, shoesLogo, bagsLogo, curtainLogo],
    REJECTED: [nonRecyclableLogo],
  },
}

/* This is temp until login and register component is done.*/
const getFakeToken = () => {
  return "70d3af81-7c2d-49a1-b5c4-f82ae8979426";
};

const isValidSession = (token) => {
  return token === "70d3af81-7c2d-49a1-b5c4-f82ae8979426";
};

const formatVariableToDisplayName = (item) => {
  const itemName = item[0];
  const nameArr = itemName.split(/(?=[A-Z])/);
  const firstName = nameArr[0];
  nameArr[0] = firstName[0].toUpperCase() + firstName.slice(1);
  return [nameArr.join(' ') , item[1]];
}


function List() {
  const [buyableItems, setBuyableItems] = useState([]);
  const sessionToken = getFakeToken();

  useEffect(() => {
    getAllBuyableItems();
  }, [])

  const getAllBuyableItems = async () => {
    try {
      console.log("🔎Starting getAllBuyableItems");
      if (!isValidSession(sessionToken)) {
        console.error(`🚨 Error: Forbidden (403): Please log In with correct credientials!`);
        return;
      }
      const response = await backEnd.get("/Karang-guni");
      console.log("✅ getItems Data retrieved");
      console.log("⏳ Converting to list of buyable items");
      const itemsArr = [];
      response.data.forEach((person) => 
        Object.entries(person.items).forEach((item) => {
          let itemName = item[0];
          let itemPrice;
          if (item[0] !== "others") {
            itemPrice = item[1].pricePerKg;
            itemsArr.push([itemName,itemPrice])
          } else {
            const realItemArr = Object.entries(item[1]);
            realItemArr.forEach((realItem) => {
              itemName = realItem[0];
              itemPrice = realItem[1];
              itemsArr.push([itemName,itemPrice])
            });
          }}));
      const uniqueItems = itemsArr.filter((item, index) => {
        return itemsArr.findIndex(innerItem => 
                                    JSON.stringify(innerItem) === JSON.stringify(item)) === index;
      });
      const formattedItems = uniqueItems.map((item) => formatVariableToDisplayName(item));
      setBuyableItems(formattedItems);
      console.log("✅ Converted items Successfully");
    } catch (error) {
      console.error(`🚨 Error: ${error.code}(${error.response.status}): ${error.message}`);
    } finally {
      console.log("✅ getAllBuyableItems ran successfully!");
    }
  };
 
  return (
    <div className={styles.list}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <img src={recycleLogo} alt="Recycle Icon"/>
          <img src={bannerText} alt="Banner Text"/>
          <img src={recycleLogo} alt="Recycle Icon"/>
        </div>
      </div>
      <div className={styles.table}>
        <ListTable buyableItemsWithPrice={buyableItems} datas={DATAS} picturePaths={PICTURE_PATH} />
      </div>
      <div>
        <p className={styles.footer}>
          Got something to trade with us? Click here to <Link to='/book'>book</Link> here!
        </p>
        <p className={styles.footer}>
          We welcome you to donate to us too!
        </p>
      </div>
      <div className={styles.disclaimer}>
        <p>
          All earnings from your contributions will be donated to the 
          <strong> Singapore Environment Council (SEC). </strong>
          The <strong>SEC</strong> is dedicated to promoting environmental sustainability and 
          awareness in Singapore through various programs and initiatives. Your donations will 
          help support their efforts to protect and preserve the environment for future generations.
        </p>
      </div>
    </div>
  );
}

export default List;