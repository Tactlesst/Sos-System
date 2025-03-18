import { useState } from 'react';
import styles from '../styles/RegisterModal.module.css';
import Image from 'next/image';

export default function RegisterModal({ onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('+63');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!terms) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    console.log('Register:', { firstName, lastName, phone, password, confirmPassword, dob, terms });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.logoContainer}>
          <Image src="/images/Dmrro.png" alt="Dmrro Logo" width={80} height={80} />
        </div>
        <h2>Create an account</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <div className={styles.dobContainer}>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <label className={styles.termsLabel}>
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
            Agree with terms and condition
          </label>
          <button
            type="submit"
            style={{ backgroundColor: '#e53935', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer' }}
          >
            Register
          </button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}