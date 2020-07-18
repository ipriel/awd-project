const admin = require("firebase-admin");
const fs = require('fs');
let firebaseSecrets = {};

try {
firebaseSecrets = JSON.parse(fs.readFileSync(__dirname + '/firebase-secret.json'));
}
// ignore error if firebase-secret does not exist
catch (err) {
}


const cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/" +
    (process.env.FIREBASE_EMAIL || firebaseSecrets.client_email).replace('@', '%40');
const serviceAccount = {
    "type": "service_account",
    "project_id": "awd-project-f7bf9",
    "private_key_id": (process.env.FIREBASE_PKID || firebaseSecrets.private_key_id),
    "private_key": process.env.FIREBASE_PK || firebaseSecrets.private_key,
    "client_email": process.env.FIREBASE_EMAIL || firebaseSecrets.client_email,
    "client_id": process.env.FIREBASE_CID || firebaseSecrets.client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": cert_url
};

let app;
if (typeof app == 'undefined') {
    app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://awd-project-f7bf9.firebaseio.com"
    });
}

module.exports = app.auth();