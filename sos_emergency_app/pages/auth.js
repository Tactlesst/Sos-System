import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Auth.module.css';
import RegisterModal from '../components/RegisterModal';
import LoginModal from '../components/LoginModal';
import Image from 'next/image';

export default function Auth() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>MORAMO - Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image src="/images/Dmrro.png" alt="MORAMO Logo" width={200} height={200} />
          <Image src="/images/ambulance-icon.png" alt="Ambulance Icon" width={100} height={100} />
        </div>

        <div className={styles.authOptions}>
          <button className={styles.authButton} onClick={handleOpenLoginModal}>
            Log In
          </button>
          <button className={styles.authButton} onClick={handleOpenRegisterModal}>
            Register
          </button>
        </div>
      </main>

      {showRegisterModal && <RegisterModal onClose={handleCloseRegisterModal} />}
      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}
    </div>
  );
}