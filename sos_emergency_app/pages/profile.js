// pages/profile.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Profile.module.css";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else if (response.status === 401) {
          router.push("/setup");
        } else {
          console.error("Failed to fetch profile:", response.status);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
        router.push("/setup");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading profile data. Please log in.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>
      {user && (
        <>
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
        </>
      )}
    </div>
  );
}