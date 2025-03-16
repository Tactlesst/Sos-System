import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., authenticate with a backend)
    console.log('Login:', { email, password });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart SOS - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src="/smartsos_login.png"
            alt="Smart SOS Login Screen"
            layout="responsive"
            width={375}
            height={812}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
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
          <button type="submit" className={styles.button}>Login</button>
        </form>

        <Link href="/signup">
          <p className={styles.signupLink}>Don't have an account? Sign Up</p>
        </Link>
      </main>
    </div>
  );
}