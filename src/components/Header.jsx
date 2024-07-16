import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import SideBar from "./SideBar";
import UserPanel from "./UserPanel";
import styles from "./Header.module.css";
import companyLogo from "../assets/logo.png";

function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleMouseEnter = () => {
    setIsSideBarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSideBarOpen(false);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_top}>
          <img src={companyLogo} alt="garang-guni logo" className={styles.page_logo} />
          <h1 className={styles.header_title}>GARANG GUNI - Earn Money While Recycling</h1>
          <div onClick={() => setIsUserPanelOpen((prevState) => !prevState)}>
            <img src="../assets/usericon.png" alt="user icon" className={styles.user_icon} />
          </div>
        </div>
        <div className={styles.header_bottom}>
          <img
            src="../assets/sidebar.png"
            alt="side bar icon"
            className={styles.sideBar_icon}
            onClick={() => setIsSideBarOpen((prevState) => !prevState)}
          />
          <div className={styles.username}>
            {user ?
              `Hello, ${user.username}` : 
              <NavLink to="/login">Login/Register</NavLink>
            }
          </div>
        </div>
      </div>
      <div className={styles.sideBarHoverArea} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      <SideBar isOpen={isSideBarOpen} />
      <UserPanel isOpen={isUserPanelOpen} />
    </>
  );  
}

export default Header;
