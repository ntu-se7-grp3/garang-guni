import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import SideBar from "./SideBar";
import UserPanel from "./UserPanel";
import styles from "./Header.module.css";
import page_logo from "../assets/logo.png";
import sidebar_logo from "../assets/sidebar.png";
import profile_logo from "../assets/profile.png";
import sideBarStyles from "./SideBar.module.css";
import userPanelStyles from "./UserPanel.module.css";
import { UserContext } from "../context/user-context";

function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const { isLoggedIn, credentials } = useContext(UserContext);
  // const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsSideBarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSideBarOpen(false);
  };

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setIsUserPanelOpen((prevState) => !prevState);
    } else {
      // navigate("/login");
      setIsUserPanelOpen((prevState) => !prevState);
    }
  };

  const handleDocumentClick = (event) => {
    if (isSideBarOpen || isUserPanelOpen) {
      if (
        !event.target.closest(`.${sideBarStyles.sideBar}`) &&
        !event.target.closest(`.${userPanelStyles.userPanel}`) &&
        !event.target.closest(`.${styles.sideBar_icon}`) &&
        !event.target.closest(`.${styles.user_icon}`)
      ) {
        setIsSideBarOpen(false);
        setIsUserPanelOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isSideBarOpen, isUserPanelOpen]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_top}>
          <img src={page_logo} alt="garang-guni logo" className={styles.page_logo} />
          <h1 className={styles.header_title}>GARANG GUNI - Earn Money While Recycling</h1>
          <div onClick={handleUserIconClick}>
            <img src={profile_logo} alt="user icon" className={styles.user_icon} />
          </div>
        </div>
        <div className={styles.header_bottom}>
          <img
            src={sidebar_logo}
            alt="menu bar icon"
            className={styles.sideBar_icon}
            onClick={() => setIsSideBarOpen((prevState) => !prevState)}
          />
          <div className={styles.username}>
            {isLoggedIn ? `Hello, ${credentials[0].firstName} ${credentials[0].lastName}` : <NavLink to="/auth">Login/Register</NavLink>}
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
