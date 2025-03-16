import { useState } from 'react';
import styles from '../styles/LoginModal.module.css';
import Image from 'next/image';

export default function LoginModal({ onClose }) {
  const [phone, setPhone] = useState('+63');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { phone, password, remember });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.logoContainer}>
          <Image src="/images/Dmrro.png" alt="Dmrro Logo" width={80} height={80} />
        </div>
        <h2>Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label className={styles.rememberLabel}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Remember me
          </label>
          <button type="submit" className={styles.loginButton}>Log In</button> {/* Added type="submit" and className */}
          <p className={styles.forgotPassword}>Forgot password?</p>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}