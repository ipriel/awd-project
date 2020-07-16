const http = require('http');
const socketio = require('socket.io');
const chat = require('./plugins/chat');
const pushUpdater = require('./plugins/push-updater');
const authPlugin = require('./plugins/auth');
const search = require('./plugins/search');
const { auth } = require('firebase-admin');

module.exports = {
    init: async (app) => {
        const server = http.createServer(app);
        const io = socketio(server);

        authPlugin.init(io);
        pushUpdater.init(io);

        io.on('connection', async (socket) => {
            console.log('a user connected');

            const sub = await pushUpdater.listen(socket);
            const session = await chat.listen(socket);
            search.listen(socket);

            socket.on('disconnect', () => {
                console.log('user disconnected');
                sub.unsubscribe();
                session.delete();
            });
        });

        return io;
    }
}