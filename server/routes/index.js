const serveStatic = require('serve-static');
const order = require('./order.route');
const productMeta = require('./product-meta.route');
const product = require('./product.route');
const user = require('./user.route');

module.exports = {
    register: function (app) {
        app.use('/api/order', order);
        app.use('/api/product-meta', productMeta);
        app.use('/api/product', product);
        app.use('/api/user', user);

        app.use(serveStatic('www'));
    }
};