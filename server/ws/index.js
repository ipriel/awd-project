const http = require('http');
const socketio = require('socket.io');
const admin = require('firebase-admin');
const chat = require('./chat');
const pushUpdater = require('./push-updater');
var serviceAccount = require("../firebase-secret.json");

module.exports = {
    init: (app) => {
        const server = http.createServer(app);
        const io = socketio(server);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://awd-project-f7bf9.firebaseio.com"
        });

        // token middleware
        io.use(async (socket, next) => {
            const idToken = socket.handshake.query.token;
            if(idToken == null || typeof idToken == 'undefined')
                return next();
            
            try {
                const token = await admin.auth().verifyIdToken(idToken);
                socket.username = token.uid;
                next();
            } catch(error) {
                next(error);
            }
        });

        /* 
        //client-side:
        //const idToken = await firebase.auth().currentUser.getIdToken(false);
        //const socket = io({
        //  query: {
        //    token: idToken
        //  }
        //});
        // - or -
        //socket.io.opts.query = {
        //  token: idToken
        //}
        */

        pushUpdater.init(io);

        io.on('connection', (socket) => {
            console.log('a user connected');

            const sub = await pushUpdater.listen(socket);
            const session = await chat.listen(socket);

            socket.on('disconnect', () => {
                console.log('user disconnected');
                sub.unsubscribe();
                session.delete();
            });
        });

        return io;
    }
}