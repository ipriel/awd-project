const serveStatic = require('serve-static');

module.exports = {
    register: function (app) {
        // add API routes here
        app.use(serveStatic('www'));
    }
};