import { useState } from "react";
import Cookies from "js-cookie";

export default function RegisterModal({ onClose, onSwitch }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, phone, password, dob }),
    });

    const data = await response.json();

    if (response.ok) {
      // Show success message and switch to login form
      alert("Registration successful! Please log in.");
      onSwitch(); // Switch to login form
    } else {
      setError(data.error || "Registration failed");
    }
  };

  return (
    <>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={onClose}>Close</button>
      <p>
        Already have an account?{" "}
        <button onClick={onSwitch}>Login</button>
      </p>
    </>
  );
}