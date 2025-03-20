import { useState } from "react";

export default function AuthPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);
  };

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: formData.phone, password: formData.password }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    alert(data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Authentication</h1>

      <button onClick={() => setIsLoginOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Log In
      </button>
      <button onClick={() => setIsRegisterOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded ml-4">
        Register
      </button>

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            <input name="firstName" placeholder="First Name" onChange={handleChange} className="w-full p-2 border mb-3" />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border mb-3" />
            <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border mb-3" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border mb-3" />
            <input name="dob" type="date" onChange={handleChange} className="w-full p-2 border mb-3" />
            <button onClick={handleRegister} className="w-full bg-green-500 text-white p-2 rounded">Register</button>
            <button onClick={() => setIsRegisterOpen(false)} className="w-full bg-gray-300 p-2 rounded mt-2">Close</button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Log In</h2>
            <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border mb-3" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border mb-3" />
            <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">Log In</button>
            <button onClick={() => setIsLoginOpen(false)} className="w-full bg-gray-300 p-2 rounded mt-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
