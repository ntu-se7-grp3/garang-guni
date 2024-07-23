import styles from "./ContactInfoBox.module.css";

function ContactInfoBox({ additionalStyles, title, infoList }) {
  return (
    <div style={additionalStyles} className={styles.infoBox} >
      <p><strong>{title}:</strong></p>
      {infoList.map((item, i) =>
         <p className={styles.indentItems} key={i}>{item}</p>)}
    </div>
  );
}

export default ContactInfoBox;