import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';

function SideBar({ isOpen }) {
  return (
    <div className={`${styles.sideBar} ${isOpen ? styles.sideBarOpen : ''}`}>
      <div className={styles.barContent}>
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/list">List & Rate</NavLink></li>
          <li><NavLink to="/schedule">Schedule</NavLink></li>
          <li><NavLink to="/booknow">Book Now</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;