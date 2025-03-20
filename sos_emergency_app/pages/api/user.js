import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.error("No Authorization header");
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    if (!token) {
      console.error("No token found in Authorization header");
      return res.status(401).json({ message: "Invalid token format" });
    }

    console.log("Received Token:", token); // Debugging  

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging  

    if (!decoded.userId) {
      console.error("Invalid token payload");
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.userId;
    const [users] = await pool.execute(
      "SELECT firstName, lastName, phone FROM users WHERE id = ?",
      [userId]
    );

    if (users.length === 0) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(users[0]);
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
