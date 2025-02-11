require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db, auth } = require("./config/firebaseConfig"); // **Import hanya dari config/firebase.js**
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);


// Global Error Handling Middleware
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
