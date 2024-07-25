import { useState } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import styles from './Auth.module.css';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRightPanelActive, setRightPanelActive] = useState(false); // Toggling between LoginForm & RegisterForm

  return (
    <div className={styles.contentContainer}>
      <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`} id="container">
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <RegisterForm onLoad={setIsLoading} />
        </div>

        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <LoginForm onLoad={setIsLoading} />
        </div>

        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 style={{ fontWeight: 'bold' }}>Welcome Back!</h1>
              <p className={styles.overlayText}>To keep connected with us please login with your personal info</p>
              <button
                className={`${styles.loginOverlayBtn} ${styles.ghost}`}
                id="signIn"
                onClick={() => setRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>

            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 style={{ fontWeight: 'bold' }}>Hello, Friend!</h1>
              <p className={styles.overlayText}>Enter your personal details and start journey with us</p>
              <button
                className={`${styles.registerOverlayBtn} ${styles.ghost}`}
                id="signUp"
                onClick={() => setRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress variant="indeterminate" size={'5%'} />
        </Backdrop>
      </div>
    </div>
  );
}
