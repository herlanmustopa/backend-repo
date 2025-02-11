const express = require("express");
const { updateUser, getUserById} = require("../controllers/userControllers");

const router = express.Router();

router.put("/user/:id", updateUser);
router.get("/user/:id", getUserById);

module.exports = router;
