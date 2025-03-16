import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Responders.module.css';

export default function Responders() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart SOS - Responders</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src="/smartsos_responders.png"
            alt="Smart SOS Responders Screen"
            layout="responsive"
            width={375}
            height={812}
          />
        </div>
      </main>
    </div>
  );
}