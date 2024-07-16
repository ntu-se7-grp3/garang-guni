import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SideBar from './SideBar';
import UserPanel from './UserPanel';
import styles from './Header.module.css';

function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleMouseEnter = () => {
    setSideBarOpen(true);
  }

  const handleMouseLeave = () => {
    setSideBarOpen(false);
  }

  return (
    <>
        <div className={styles.header}>
            <div className={styles.header_top}>
                <div className={styles.header_left}>
                <img 
                    src="../assets/logo.png" 
                    alt="garang-guni logo" 
                    className={styles.page_logo} 
                />
                <h1 className={styles.header_title}>GARANG GUNI - Earn Money While Recycling</h1>
                </div>
                <div className={styles.header_right} onClick={() => setUserPanelOpen(!userPanelOpen)}>
                <img src="../assets/usericon.png" alt="user icon" className={styles.user_icon} />
                </div>
            </div>
            <div className={styles.header_bottom}>
                <img 
                src="../assets/sidebar.png" 
                alt="side bar icon" 
                className={styles.sideBar_icon}
                onClick={() => setSideBarOpen(!sideBarOpen)} 
                />
                <div className={styles.username}>
                {user ? `Hello, ${user.username}` : <NavLink to="/login">Login/Register</NavLink>}
                </div>
            </div>
        </div>
        <div
            className={styles.sideBarHoverArea}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
        <SideBar isOpen={sideBarOpen} />
        <UserPanel isOpen={userPanelOpen} />
    </>
  );
}

export default Header;
