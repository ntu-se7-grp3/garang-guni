import contactUsBanner from "../assets/contactUsBanner.png";
import darkContactUsBanner from "../assets/darkContactUsBanner.png";
import styles from "./Contact.module.css"

const CONTACT_DETAILS = 87414896;
const OPERATING_HOURS = ["Mon-Fri (9am-6pm)", "Saturday (9am-12pm)"];
const ADDRESS = ["99 Marshmallow Street","#00-00 Spaghetti Tower","Singapore ---101 🔥"];

function Contact() {
  // Temp until light mode context is introduced.
  const currentHour = new Date().getHours();
  const isDark = currentHour >= 18 || currentHour <= 5 ;

  return (
    <div className={`${styles.container} ${isDark && styles.dark}`}>
      <h1>Contact Us</h1>
      <div className={styles.contactUsBanner}>
        <img className={styles.contactUsContent} 
             src={isDark ? darkContactUsBanner : contactUsBanner} 
             alt="banner"/>
      </div>
      <p>{CONTACT_DETAILS}</p>
      {OPERATING_HOURS.map((item, i) => <p key={i}>{item}</p>)}
      {ADDRESS.map((item, i) => <p key={i}>{item}</p>)}
      <br/>
      You May Send Us Your Inquiry Below:
    </div>
  );
}

export default Contact;