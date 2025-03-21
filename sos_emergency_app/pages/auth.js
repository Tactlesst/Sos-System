import { useState } from 'react';
import styles from "../styles/Auth.module.css";

export default function Auth({ onClose = () => {} }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const [showForm, setShowForm] = useState(false); // Control whether to show the form or selection screen

  // State for login form
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // State for registration form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [regError, setRegError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: loginPhone, password: loginPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store auth token in cookies and redirect to dashboard
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      window.location.href = '/dashboard';
    } else {
      setLoginError(data.error || 'Login failed');
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (regPassword !== confirmPassword) {
      setRegError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setRegError('You must agree to the terms and conditions');
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, phone: regPhone, password: regPassword, dob }),
    });

    const data = await response.json();

    if (response.ok) {
      // Show success message and switch to login form
      alert('Registration successful! Please log in.');
      setIsLogin(true); // Switch to login form
      setLoginPhone(''); // Clear the phone number in the login form
      setLoginPassword(''); // Clear the password field
    } else {
      setRegError(data.error || 'Registration failed');
    }
  };

  // Switch between login and registration forms
  const switchForm = () => {
    setIsLogin(!isLogin);

    // Clear all form inputs and errors
    setLoginPhone('');
    setLoginPassword('');
    setLoginError('');

    setFirstName('');
    setLastName('');
    setRegPhone('');
    setRegPassword('');
    setConfirmPassword('');
    setDob('');
    setRegError('');
  };

  // Handle selection of login or register
  const handleSelection = (isLoginSelection) => {
    setIsLogin(isLoginSelection);
    setShowForm(true); // Show the form after selection
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button
          onClick={() => {
            console.log('onClose:', onClose); // Debugging
            onClose();
          }}
          className={styles.closeButton}
        >
          &times;
        </button>

        {!showForm ? (
          // Selection Screen
          <div className={styles.selectionScreen}>
            <h2>Welcome!</h2>
            <p>Please choose an option:</p>
            <button
              className={styles.selectionButton}
              onClick={() => handleSelection(true)}
            >
              Log In
            </button>
            <button
              className={styles.selectionButton}
              onClick={() => handleSelection(false)}
            >
              Register
            </button>
          </div>
        ) : (
          // Form Screen
          <>
            <h2>{isLogin ? 'Sign in to your account' : 'Create an account'}</h2>

            {isLogin ? (
              // Login Form
              <form onSubmit={handleLogin}>
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                <div className={styles.inputGroup}>
                  <label>Phone</label>
                  <div className={styles.phoneInput}>
                    <span>+63</span>
                    <input
                      type="text"
                      placeholder="Phone"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.rememberMe}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label>Remember me</label>
                </div>
                <button type="submit" className={styles.submitButton}>Log in</button>
                <p className={styles.forgotPassword}>Forgot password?</p>
              </form>
            ) : (
              // Registration Form
              <form onSubmit={handleRegister}>
                {regError && <p style={{ color: 'red' }}>{regError}</p>}
                <div className={styles.inputGroup}>
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Phone</label>
                  <div className={styles.phoneInput}>
                    <span>+63</span>
                    <input
                      type="text"
                      placeholder="Phone"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.terms}>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <label>Agree with terms and conditions</label>
                </div>
                <button type="submit" className={styles.submitButton}>Register</button>
              </form>
            )}

            <p className={styles.switchForm}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={switchForm}>
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}