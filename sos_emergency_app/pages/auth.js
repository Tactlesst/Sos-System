import Head from 'next/head';
import { useState, useEffect } from 'react'; // Import useEffect
import styles from '../styles/Auth.module.css';
import RegisterModal from '../components/RegisterModal';
import LoginModal from '../components/LoginModal';
import Image from 'next/image';
import { getSession, signOut } from 'next-auth/react';

export default function Auth({ session }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // Initialize to null

  useEffect(() => {
    // Update loggedInUser when session changes
    if (session && session.user) {
      setLoggedInUser(session.user);
    } else {
      setLoggedInUser(null);
    }
  }, [session]); // Depend on session

  const handleOpenRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    setShowLoginModal(false);
    console.log('User logged in:', user);
  };

  const handleLogout = async () => {
    await signOut();
  };

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
          {loggedInUser ? (
            <>
              <p>Welcome, {loggedInUser.firstName}!</p>
              <button className={styles.authButton} onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className={styles.authButton} onClick={handleOpenLoginModal}>
                Log In
              </button>
              <button className={styles.authButton} onClick={handleOpenRegisterModal}>
                Register
              </button>
            </>
          )}
        </div>
      </main>

      {showRegisterModal && !loggedInUser && (
        <RegisterModal onClose={handleCloseRegisterModal} />
      )}
      {showLoginModal && (
        <LoginModal
          onClose={handleCloseLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}