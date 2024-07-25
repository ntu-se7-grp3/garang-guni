import { Link, useNavigate } from "react-router-dom";
import pageNotFoundLogo from "../assets/error404.png"
import styles from "./PageNotFound.module.css"

function PageNotFound() {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={pageNotFoundLogo} alt="Missing 404 error page"/>
      <button className={styles.button} onClick={handleOnClick}>Return back home</button>
    </div>
  );
}

export default PageNotFound;