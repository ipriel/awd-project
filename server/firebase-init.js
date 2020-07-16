const admin = require("firebase-admin");

const cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/" +
    process.env.FIREBASE_EMAIL.replace('@', '%40');
const serviceAccount = {
    "type": "service_account",
    "project_id": "awd-project-f7bf9",
    "private_key_id": process.env.FIREBASE_PKID,
    "private_key": process.env.FIREBASE_PK,
    "client_email": process.env.FIREBASE_EMAIL,
    "client_id": process.env.FIREBASE_CID,
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

module.exports.admin = admin;