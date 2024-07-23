import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import styles from "./UserPanel.module.css";
import profile2 from "../assets/profile2.png";
import manage from "../assets/managebooking.png";
import setting from "../assets/setting.png";

function UserPanel({ isOpen }) {
  const { logout } = useContext(AuthContext);

  return (
    <div className={`${styles.userPanel} ${isOpen ? styles.userPanelOpen : ""}`}>
      <div className={styles.panelContent}>
        <NavLink to="/profile">
          <img src={profile2} alt="profile icon" className={styles.userBar_icon} />
          <p>Profile</p>
        </NavLink>
        <hr />

        <NavLink to="/manage">
          <img src={manage} alt="manage icon" className={styles.userBar_icon} />
          <p>Manage Booking</p>
        </NavLink>
        <hr />

        <NavLink to="/setting">
          <img src={setting} alt="setting icon" className={styles.userBar_icon} />
          <p>Setting</p>
        </NavLink>
        <br />

        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
}

export default UserPanel;
