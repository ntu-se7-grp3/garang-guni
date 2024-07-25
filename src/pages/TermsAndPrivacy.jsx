import styles from "./TermsAndPrivacy.module.css"
import TermsAndConditionsContent from "../components/TermsAndConditionsContent";

function TermsAndPrivacy() {
  return (
    <div className={styles.tc}>
      <h1>Terms and Conditions</h1>
      <TermsAndConditionsContent />
    </div>
  );
}

export default TermsAndPrivacy;
