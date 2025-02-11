
import { db } from "../config/firebaseConfig.js"; 


const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const userRef = db.collection("users").doc(id);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRef.update({ name, email });

    return res.json({ message: "User updated successfully", id, name, email });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userRef = db.collection("users").doc(id);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ id: userSnapshot.id, ...userSnapshot.data() });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export {updateUser , getUserById};
