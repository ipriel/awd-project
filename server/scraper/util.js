const got = require('got');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const FileType = require('file-type');
const { ProductMeta } = require('../models/product-meta.model')

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
        if (val == null)
            return map;
        const prop = key ? val[key] : val;
        if (!map.hasOwnProperty(prop))
            map[prop] = val;
        return map;
    }, {});

    return Object.values(map);
}

async function parseImage(src) {
    const buffer = await got(src, { responseType: 'buffer', resolveBodyOnly: true });
    const type = await FileType.fromBuffer(buffer);

    return {
        contentType: type.mime,
        data: buffer
    };

}

/** Parse string to float and convert to ILS
 * @example '$24.95' => 86.23
 */
function parsePrice(priceStr, xeRate) {
    priceStr = priceStr.replace(/[^0-9.]/g, "");
    const price = parseFloat(priceStr) * xeRate;
    return parseFloat(price.toFixed(2));
}

function save(data) {
    ProductMeta.updateOne({name: data.name, company: data.company}, data, {upsert: true, omitUndefined: true}, (err, doc) => {
        if(err)
            console.error(err);

        //console.log(data.name + ' saved: '+doc._id);
    });
}

module.exports = {
    scrape,
    render,
    urlBuilder,
    stripUrlParams,
    sanitizeFileName,
    arrayFilterUnique,
    parseImage,
    parsePrice,
    save
};
