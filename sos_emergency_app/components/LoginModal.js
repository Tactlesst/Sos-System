import { useState } from "react";
import Cookies from "js-cookie";

export default function LoginModal({ onClose, onSwitch }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store auth token in cookies and redirect to dashboard
      Cookies.set("authToken", data.token, { expires: 1, path: "/" });
      window.location.href = "/dashboard";
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      <button onClick={handleLogin}>Login</button>
      <button onClick={onClose}>Close</button>
      <p>
        Don't have an account?{" "}
        <button onClick={onSwitch}>Register</button>
      </p>
    </>
  );
}