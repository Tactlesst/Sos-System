// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      router.push("/"); // Redirect to login page if no token
      return;
    }

    // Fetch user data
    fetch("/api/user", {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          router.push("/");
        } else {
          setUser(data);
        }
      });
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.firstName} {user?.lastName}!</h1>
      <p>Your Phone: {user?.phone}</p>
      <button onClick={() => { Cookies.remove("authToken"); router.push("/"); }}>
        Logout
      </button>
    </div>
  );
}
