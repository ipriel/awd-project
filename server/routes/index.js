const path = require('path');
const order = require('./order.route');
const productMeta = require('./product-meta.route');
const product = require('./product.route');
const user = require('./user.route');

module.exports = {
    register: function (app, rootDir) {
        app.use('/api/order', order);
        app.use('/api/product-meta', productMeta);
        app.use('/api/product', product);
        app.use('/api/user', user);

        console.log(path.join(rootDir, 'www', 'index.html'));
        // Catch all requests for assets (js, css, etc.)
        app.get('*.*$', function (req, res) {
            res.sendFile(path.join(rootDir, 'www', req.path));
        });

        // Catch all other routes and return the index file
        app.all('*', function (req, res) {
            res.sendFile(path.join(rootDir, 'www', 'index.html'));
        });
    }
};