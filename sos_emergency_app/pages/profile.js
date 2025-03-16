import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart SOS - Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src="/smartsos_profile.png"
            alt="Smart SOS Profile Screen"
            layout="responsive"
            width={375}
            height={812}
          />
        </div>
      </main>
    </div>
  );
}