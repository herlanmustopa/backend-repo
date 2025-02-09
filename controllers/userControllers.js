const { getUserById } = require("../models/userModels");

const getProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.uid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfile };
