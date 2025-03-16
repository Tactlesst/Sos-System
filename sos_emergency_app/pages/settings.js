import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Settings.module.css';

export default function Settings() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart SOS - Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src="/smartsos_settings.png"
            alt="Smart SOS Settings Screen"
            layout="responsive"
            width={375}
            height={812}
          />
        </div>
      </main>
    </div>
  );
}