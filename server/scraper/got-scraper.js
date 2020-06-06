const got = require('got');
const cheerio = require('cheerio');

/**
 * Loads html document at url and returns $() function
 * that allows jquery-stile DOM parsing.
 * @param url the html document url
 * @param options options object - see 'got' package
 * @returns $() parse function
 */
const scraper = got.extend({
    handlers: [
        (options, next) => {
            if (options.isStream) {
                return next(options);
            }

            return (async () => {
                const response = await next(options);
                return cheerio.load(response.body);
            })();
        }
    ]
});

module.exports = scraper;

/* (async () => {
    const $ = await scraper('https://www.oneplus.com/store/cases-protection?from=head');
    const test = $('h1.text-black.text-center.font-headline-2').text();
    console.log(test); // Cases & Protection
})(); */