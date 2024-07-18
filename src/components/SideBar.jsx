import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import home_logo from "../assets/home.png";
import list_logo from "../assets/list_rate.png";
import schedule_logo from "../assets/schedule.png";
import booknow_logo from "../assets/booknow.png";
import contact_logo from "../assets/contact.png";

function SideBar({ isOpen }) {
  return (
    <div className={`${styles.sideBar} ${isOpen ? styles.sideBarOpen : ""}`}>
      <div className={styles.barContent}>
        <NavLink to="/home">
          <img src={home_logo} alt="home icon" className={styles.sideBar_icon} />
          <p>Home</p>
        </NavLink>
        <hr />

        <NavLink to="/list">
          <img src={list_logo} alt="list&rate icon" className={styles.sideBar_icon} />
          <p>List & Rate</p>
        </NavLink>
        <hr />

        <NavLink to="/schedule">
          <img src={schedule_logo} alt="schedule icon" className={styles.sideBar_icon} />
          <p>Schedule</p>
        </NavLink>
        <hr />

        <NavLink to="/booknow">
          <img src={booknow_logo} alt="booknow icon" className={styles.sideBar_icon} />
          <p>Book Now</p>
        </NavLink>
        <hr />

        <NavLink to="/contact">
          <img src={contact_logo} alt="contact icon" className={styles.sideBar_icon} />
          <p>Contact</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
