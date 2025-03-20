// pages/setup.js

import { useState } from 'react';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import styles from '../styles/Setup.module.css'; // Create Setup.module.css

export default function Setup() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleCloseModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Smart SOS Setup</h1>
      <p className={styles.description}>
        Please log in or register to continue.
      </p>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleLoginClick}>
          Log In
        </button>
        <button className={styles.button} onClick={handleRegisterClick}>
          Register
        </button>
      </div>

      {showLogin && <LoginModal onClose={handleCloseModal} />}
      {showRegister && <RegisterModal onClose={handleCloseModal} />}
    </div>
  );
}