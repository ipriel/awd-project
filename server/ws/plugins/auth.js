const auth = require('../../firebase-init');

module.exports = {
    init: (io) => {
        // token middleware
        io.use(async (socket, next) => {
            const idToken = socket.handshake.query.token;
            if (idToken == null || typeof idToken == 'undefined')
                return next();

            try {
                const token = await auth.verifyIdToken(idToken);
                socket.username = token.uid;
                next();
            } catch (error) {
                next(error);
            }
        });
    }
};