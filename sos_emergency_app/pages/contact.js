import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart SOS - Contact</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src="/smartsos_contact.png"
            alt="Smart SOS Contact Screen"
            layout="responsive"
            width={375}
            height={812}
          />
        </div>
      </main>
    </div>
  );
}