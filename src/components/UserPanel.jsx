import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import styles from './UserPanel.module.css';

function UserPanel ({isOpen}) {
    const { logout } = useContext(AuthContext);

    return (
        <div className={`${styles.userPanel} ${isOpen ? styles.userPanelOpen : ''}`}>
            <div className={styles.panelContent}>
                <ul>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><NavLink to="/manage">Manage Booking</NavLink></li>
                    <li><NavLink to="/setting">Setting</NavLink></li>
                    <li><button onClick={logout}>Log Out</button></li>
                </ul>
            </div>
        </div>
    )
}

export default UserPanel;