const { Product } = require('../../models/product.model');
const { ProductMeta } = require('../../models/product-meta.model');

module.exports = {
    listen: (socket) => {
        socket.on('search:product', async (term, cb) => {
            const res = await Product.fuzzySearch(term);
            cb(res);
        });
        
        socket.on('search:productMeta', async (term, cb) => {
            const res = await ProductMeta.fuzzySearch(term);
            cb(res);
        });
    }
}