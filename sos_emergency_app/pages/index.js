import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter(); // Initialize useRouter

  const handleGetStartedClick = () => {
    router.push('/auth'); // Redirect to /auth
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart SOS - Let's Get Started</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.appName}>Smart SOS</h1>

        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <Image
              src="/images/ambulance-icon.png"
              alt="Ambulance Icon"
              width={150}
              height={150}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleGetStartedClick}>
              Let's Get Started
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}