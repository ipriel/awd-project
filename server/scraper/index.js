const onePlus = require('./oneplus.scraper');
const samsung = require('./samsung.scraper');

//test function (remove for production)
(async () => {
    //await onePlus.run();
    await samsung.run();
})();