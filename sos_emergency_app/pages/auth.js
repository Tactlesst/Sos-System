import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'; // Import SweetAlert
import styles from "../styles/Auth.module.css";

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);

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

  // Check if the user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');

    if (token && userId && userType) {
      if (userType === 'user') {
        router.push('/user'); // Redirect to /parent for users
      } else if (userType === 'station') {
        router.push('/station'); // Redirect to /station for station users
      } else if (userType === 'super_admin') {
        router.push('/super_admin'); // Redirect to /admin for super admins
      } else {
        router.push('/'); // Default fallback
      }
    }
  }, [router]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: loginPhone, password: loginPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store auth token and user details in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userType', data.userType); // Store userType

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
        }).then(() => {
          // Redirect based on userType after the user clicks "OK" on the success message
          if (data.userType === 'user') {
            router.push('/user'); // Redirect to /parent for users
          } else if (data.userType === 'station') {
            router.push('/station'); // Redirect to /station for station users
          } else if (data.userType === 'super_admin') {
            router.push('/super_admin'); // Redirect to /admin for super admins
          } else {
            router.push('/'); // Default fallback
          }
        });
      } else {
        // Handle specific errors
        if (data.redirect) {
          // Token expired or invalid, redirect to login page
          localStorage.removeItem('token'); // Clear expired token
          localStorage.removeItem('userId'); // Clear userId
          localStorage.removeItem('userType'); // Clear userType
          router.push(data.redirect);
        } else {
          setLoginError(data.error || 'Login failed');
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: data.error || 'Invalid credentials. Please try again.',
          });
        }
      }
    } catch (error) {
      setLoginError('An error occurred during login');
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'An error occurred during login. Please try again.',
      });
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (regPassword !== confirmPassword) {
      setRegError('Passwords do not match');
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Passwords do not match. Please try again.',
      });
      return;
    }

    if (!agreeTerms) {
      setRegError('You must agree to the terms and conditions');
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'You must agree to the terms and conditions.',
      });
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, phone: regPhone, password: regPassword, dob }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message and switch to login form
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Please log in to continue.',
        });
        setIsLogin(true); // Switch to login form
        setLoginPhone(''); // Clear the phone number in the login form
        setLoginPassword(''); // Clear the password field
      } else {
        setRegError(data.error || 'Registration failed');
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.error || 'An error occurred during registration.',
        });
      }
    } catch (error) {
      setRegError('An error occurred during registration');
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: 'An error occurred during registration. Please try again.',
      });
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

  // Handle close button click
  const handleClose = () => {
    setShowForm(false); // Reset to the selection screen
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose(); // Call the handleClose function
            }}
            className={styles.closeButton}
          >
            &times;
          </button>

          {!showForm ? (
            // Selection Screen
            <div className={styles.selectionScreen}>
              <h2 className={styles.welcomeTitle}>Welcome!</h2>
              <p className={styles.welcomeSubtitle}>Please choose an option:</p>
              <div className={styles.buttonContainer}>
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
    </div>
  );
}