const { auth, db } = require("../config/firebaseConfig");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Buat user di Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    if (!userRecord.uid) {
      throw new Error("User ID is undefined");
    }

    // Simpan user ke Firestore
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

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await auth.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { uid: user.uid, email: user.email, name: user.displayName },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error Logging In:", error.message);
    res.status(401).json({ error: "Invalid email or password" });
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


module.exports = { registerUser, loginUser, getAllUsers };
