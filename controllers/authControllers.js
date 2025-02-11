import { authAdmin, db } from "../config/firebaseConfig.js"; 
import jwt from "jsonwebtoken";


const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const userRecord = await authAdmin.createUser({
      email,
      password,
      displayName: name,
    });

    if (!userRecord.uid) {
      throw new Error("User ID is undefined");
    }

    await db.collection("users").doc(userRecord.uid).set({
      id: userRecord.uid,
      name,
      email,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "User registered successfully", user: userRecord });
  } catch (error) {
    console.error("Error Registering User:", error.message);
    next(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "ID Token is required" });
    }
    const decodedToken = await authAdmin.verifyIdToken(idToken);
    const user = await authAdmin.getUser(decodedToken.uid);

    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }

    const token = jwt.sign(
      { uid: user.uid, email: user.email, name: user.displayName },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error Logging In:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const getAllUsers = async (req, res) => {
    try {
      const usersRef = db.collection("users");
      const snapshot = await usersRef.get();

      if (snapshot.empty) {
        return res.status(404).json({ message: "No users found" });
      }

      const users = snapshot.docs.map(doc => doc.data());

      res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
      console.error("Error fetching users:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };


export { registerUser, loginUser, getAllUsers };
