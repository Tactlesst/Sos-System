// pages/index.js - Smart SOS Emergency Alert App (Next.js)

/**
 * @fileoverview Home page for the Smart SOS Emergency Alert App.
 * Initializes the application and sets up core functionalities.
 * @author
 * @version 1.0.0
 */

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css'; // Import your styles
import { useRouter } from 'next/router'; // Import useRouter hook

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to the next page or component (e.g., setup or main app)
    router.push('/setup'); // Assuming you have a /setup page
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart SOS - Emergency Alert</title>
        <meta name="description" content="Smart SOS Emergency Alert App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.appName}>
            Smart SOS
          </h1>

          <p className={styles.description}>
            An emergency alert app
          </p>

          <div className={styles.iconContainer}>
            <Image 
              src="/images/ambulance-icon.png" // Replace with your image path
              alt="Ambulance"
              width={200} // Adjust as needed
              height={150} // Adjust as needed
              layout="responsive" // Make image responsive
            />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleGetStarted}>
              LET'S GET STARTED
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}