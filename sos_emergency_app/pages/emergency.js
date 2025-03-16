import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Emergency.module.css';

export default function Emergency() {
  const handleHelpClick = () => {
    // Add logic to trigger emergency services or alert responders
    console.log('Emergency Help Requested');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart SOS - Emergency</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src="/smartsos_emergency.png"
            alt="Smart SOS Emergency Screen"
            layout="responsive"
            width={375}
            height={812}
          />
        </div>

        <button onClick={handleHelpClick} className={styles.helpButton}>HELP</button>
      </main>
    </div>
  );
}