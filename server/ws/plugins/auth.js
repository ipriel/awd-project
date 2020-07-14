const admin = require('firebase-admin');
var serviceAccount = require("../firebase-secret.json");

module.exports = {
    init: (io) => {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://awd-project-f7bf9.firebaseio.com"
        });

        // token middleware
        io.use(async (socket, next) => {
            const idToken = socket.handshake.query.token;
            if (idToken == null || typeof idToken == 'undefined')
                return next();

            try {
                const token = await admin.auth().verifyIdToken(idToken);
                socket.username = token.uid;
                next();
            } catch (error) {
                next(error);
            }
        });
    }
};