const admin = require("firebase-admin");
const path = require("path");

// Cek apakah Firebase sudah diinisialisasi
if (!admin.apps.length) {
  const serviceAccountPath = path.join(__dirname, "../firebase.json");
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
