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

async function render(url, clickElem, wait) {
    let nightmare = Nightmare()
        .goto(url)
        .wait(1000)
        .wait('body');
    if (clickElem)
        nightmare = nightmare.click(clickElem);
    if (wait)
        nightmare = nightmare.wait(wait);

    return nightmare
        .evaluate(() => document.querySelector('body').innerHTML)
        .end()
        .then(res => cheerio.load(res));
}

function stripUrlParams(url) {
    if (url.includes('?'))
        url = url.slice(0, url.indexOf('?'))

    return url;
}

function urlBuilder(host, path) {
    path = stripUrlParams(path);
    if (host.endsWith('/') && path.startsWith('/'))
        host = host.slice(0, -1);

    return host + path;
}

function sanitizeFileName(name) {
    return name.replace(/[\/<>:*?"|]/g, match => {
        let replace = match;
        switch (match) {
            case '\\':
                replace = ' - ';
                break;
            case '/':
                replace = ' - ';
                break;
            case '<':
                replace = '[';
                break;
            case '>':
                replace = ']';
                break;
            case ':':
                replace = '-';
                break;
            case '*':
                replace = '';
                break;
            case '?':
                replace = '';
                break;
            case '\"':
                replace = "''";
                break;
            case '|':
                replace = ' - ';
                break;
        }
        return replace;
    });
}

function arrayFilterUnique(arr, key) {
    const map = arr.reduce((map, val) => {
        const prop = key ? val[key] : val;
        if (!map.hasOwnProperty(prop))
            map[prop] = val;
        return map;
    }, {});

    return Object.values(map);
}

module.exports = {
    scrape,
    render,
    urlBuilder,
    stripUrlParams,
    sanitizeFileName,
    arrayFilterUnique
};
