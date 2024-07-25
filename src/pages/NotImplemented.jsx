import notImplementedLogo from "../assets/error501.png"
import styles from "./NotImplemented.module.css"

function NotImplemented() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={notImplementedLogo} alt="Missing 501 error page"/>
    </div>
  )
}

export default NotImplemented;