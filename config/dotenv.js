require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
//   firebaseApiKey: process.env.FIREBASE_API_KEY,
//   firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  googleAppCredential: process.env.FIREBASE_CREDENTIALS,

};
