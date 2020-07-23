const { Product } = require('../../models/product.model');
const { ProductMeta } = require('../../models/product-meta.model');
const { User } = require('../../models/user.model');
const { arrayFilterUnique } = require('../../scraper/util');

function filterResults() {

}

module.exports = {
    listen: (socket) => {
        socket.on('search:product', async (term, cb) => {
            const res = await Product.fuzzySearch(term);
            const filteredRes = arrayFilterUnique(res, '_id');
            cb(res);
        });

        socket.on('search:productMeta', async (term, cb) => {
            const res = await ProductMeta.fuzzySearch(term);
            cb(res);
        });

        socket.on('search:user', async (term, cb) => {
            const regex = new RegExp(term, 'i');

            const res = await User.find({
                $or: [
                    { 'firstName': regex },
                    { 'lastName': regex },
                    { 'email': regex }
                ]
            });
            
            cb(res);
        });
    }
}