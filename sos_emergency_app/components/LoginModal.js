import { useState } from 'react';
import styles from '../styles/LoginModal.module.css';
import Image from 'next/image';

export default function LoginModal({ onClose, onLoginSuccess }) { // Added onLoginSuccess prop
  const [phone, setPhone] = useState('+63');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null); // Added error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch('/api/login', { // Changed to /api/login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        console.log('Login successful:', data);
        onLoginSuccess(data.user); // Pass user data to parent component
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.logoContainer}>
          <Image src="/images/Dmrro.png" alt="Dmrro Logo" width={80} height={80} />
        </div>
        <h2>Sign in to your account</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label className={styles.rememberLabel}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Remember me
          </label>
          <button type="submit" className={styles.loginButton}>Log In</button>
          <p className={styles.forgotPassword}>Forgot password?</p>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}