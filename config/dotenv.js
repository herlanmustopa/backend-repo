require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  googleAppCredential: process.env.FIREBASE_CREDENTIALS,
};
