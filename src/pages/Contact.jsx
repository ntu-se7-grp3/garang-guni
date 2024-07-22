import { useState } from "react";

import contactUsBanner from "../assets/contactUsBanner.png";
import darkContactUsBanner from "../assets/darkContactUsBanner.png";
import ContactInfoBox from "../components/ContactInfoBox";
import styles from "./Contact.module.css"
import ModalDialog from "../components/ModalDialog";
import ContactForm from "../components/ContactForm";


const CONTACT_DETAILS = ["📞 Phone: 87414896", "📧 Email: test@test.com"];
const OPERATING_HOURS = ["Mon-Fri (9am-6pm)", "Saturday (9am-12pm)"];
const ADDRESS = ["99 Marshmallow Street","#00-00 Spaghetti Tower","Singapore ---101 🔥"];

function Contact() {
  const [isShowingForm, setIsShowingForm] = useState(false);
  // Temp until light mode context is introduced.
  const currentHour = new Date().getHours();
  const isDark = currentHour >= 18 || currentHour <= 5 ;

  const toggleInquiryForm = () => {
    setIsShowingForm((prevState) => !prevState);
  };

  return (
    <div className={`${styles.containerCol} ${isDark && styles.dark}`}>
      <h1>Contact Us</h1>
      <div className={styles.contactUsBanner}>
        <img className={styles.contactUsBannerContent} 
             src={isDark ? darkContactUsBanner : contactUsBanner} 
             alt="banner"/>
      </div>
      <div className={styles.container}>
        <div className={styles.meetUs}>
          <h2>Meet Us</h2>
          <div className={styles.meetUsContainer}>
            <ContactInfoBox title= "Contact Info" infoList= {CONTACT_DETAILS} />
            <ContactInfoBox title= "Operating Hours" infoList= {OPERATING_HOURS} />
            <ContactInfoBox title= "Address" infoList= {ADDRESS} />
          </div>
        </div>
        <div className={styles.inquiryBox}>
          <h2>Talk to Us!</h2>
          <div style={{padding:"10px 0px"}}>
            Have a burning question? We would love to hear from you!
          </div>
          <button className={styles.inquryButton}
                  onClick={toggleInquiryForm}
          >Contact us</button>
          <ModalDialog isOpen={isShowingForm} handleClose={toggleInquiryForm}>
            <ContactForm handleClose={toggleInquiryForm} isDark={isDark} />
          </ModalDialog>
        </div>
      </div>
    </div>
  );
}

export default Contact;