const got = require('got');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');

/**
 * Loads html document at url and returns $() function
 * that allows jquery-stile DOM parsing.
 * @type function(string,any)
 * @param url the html document url
 * @param options options object - see 'got' package
 * @returns $() parse function
 */
const scrape = got.extend({
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

async function render(url) {
    return Nightmare()
        .goto(url)
        .wait('body')
        .evaluate(() => document.querySelector('body').innerHTML)
        .end()
        .then(res => cheerio.load(res));
}

function url(host, path) {
    if (host.endsWith('/') && path.startsWith('/'))
        host = host.slice(0, -1);

    return host + path;
}

module.exports = {
    scrape,
    render,
    url
};

/* (async () => {
    const $ = await scraper('https://www.oneplus.com/store/cases-protection?from=head');
    const test = $('h1.text-black.text-center.font-headline-2').text();
    console.log(test); // Cases & Protection
})(); */
