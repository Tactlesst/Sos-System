// pages/dashboard.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Dashboard.module.css"; // Ensure this file exists
import Cookies from "js-cookie"; // Import js-cookie to handle cookies

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const authToken = Cookies.get("authToken");
        console.log("Auth Token:", authToken); // Debugging  

        if (!authToken) {
          console.warn("No token found, redirecting to /setup");
          router.push("/setup");
          return;
        }

        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send token in header
          },
        });

        console.log("Response Status:", response.status); // Debugging  

        if (response.ok) {
          const userData = await response.json();
          console.log("User Data:", userData); // Debugging  
          setUser(userData);
        } else {
          console.warn("Invalid token, redirecting to /setup");
          Cookies.remove("authToken"); // Remove invalid token
          router.push("/setup");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/setup");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!user) {
    return null; // User not loaded or redirected
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome, {user.firstName} {user.lastName}!
      </h1>
      <p className={styles.phone}>Phone: {user.phone}</p>
      {/* Add more user details or dashboard components here */}
    </div>
  );
}
