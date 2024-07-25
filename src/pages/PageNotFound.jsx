import pageNotFoundLogo from "../assets/error404.png"
import styles from "./PageNotFound.module.css"

function PageNotFound() {
  return (
    <>
      <img className={styles.logo} src={pageNotFoundLogo} alt="Missing 404 error page"/>
    </>
  );
}

export default PageNotFound;