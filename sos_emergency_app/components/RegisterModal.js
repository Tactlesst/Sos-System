// components/RegisterModal.js

import { useState } from 'react';
import styles from '../styles/Modal.module.css';

export default function RegisterModal({ onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+63'); // Default to PH
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    try {
      const response = await fetch('/api/register', { // Create /api/register route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: `${phoneCountryCode}${phoneNumber}`,
          password,
          dob,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        onClose(); // Close the modal
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Register</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type="date"
            className={styles.input}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}