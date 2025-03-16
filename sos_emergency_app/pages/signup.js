import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Signup.module.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup:', { name, email, password });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart SOS - Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.appName}>Smart SOS</h1> {/* App name at the top */}

        <div className={styles.imageContainer}>
          <Image
            src="/smartsos_signup.png"
            alt="Smart SOS Sign Up Screen"
            layout="responsive"
            width={375}
            height={812}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>

        <Link href="/login">
          <p className={styles.loginLink}>Already have an account? Login</p>
        </Link>
      </main>
    </div>
  );
}