const { db } = require("../config/firebaseConfig");
const UserEntity = require("../entities/UserEntity");

const createUser = async (id, name, email) => {
  const userEntity = new UserEntity(id, name, email);
  await db.collection("users").doc(id).set({
    ...userEntity,
    createdAt: new Date(),
  });
  return userEntity;
};

const getUserById = async (id) => {
  const user = await db.collection("users").doc(id).get();
  if (!user.exists) return null;
  return new UserEntity(user.id, user.data().name, user.data().email);
};

module.exports = { createUser, getUserById };
