// components/LoginModal.js

import { useState } from 'react';
import styles from '../styles/Modal.module.css';
import { useRouter } from 'next/router'; // Import useRouter

export default function LoginModal({ onClose }) {
  const [phoneCountryCode, setPhoneCountryCode] = useState('+63'); // Default to PH
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: `${phoneCountryCode}${phoneNumber}`,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        onClose(); // Close the modal
        // Redirect to a dashboard or main app page after successful login
        router.push('/dashboard'); // Example: Redirect to /dashboard
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Log In</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.phoneInput}>
            <select
              className={styles.countryCode}
              value={phoneCountryCode}
              onChange={(e) => setPhoneCountryCode(e.target.value)}
            >
              <option value="+63">PH (+63)</option>
              {/* Add more country codes as needed */}
              <option value="+1">US (+1)</option>
              <option value="+44">UK (+44)</option>
            </select>
            <input
              type="tel"
              placeholder="Phone Number"
              className={styles.input}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        </form>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}