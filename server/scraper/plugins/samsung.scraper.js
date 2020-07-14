const { URL } = require('url');
const { scrape, render, urlBuilder, sanitizeFileName, arrayFilterUnique, parseImage, parsePrice, save } = require('../util');
const xeRate = 4.31838;

async function runScraper() {
    //console.log('Begin Scrapping - Samsung');

    const host = 'https://www.samsung.com/uk/';
    const company = 'Samsung';
    const $ = await scrape(host);
    const nav = $('.footer .footer-column').children().first();
    const promises = $('li', nav)
        .map(async (_, elem) => {
            const prodType = $('a', elem);
            let prodName = prodType.text();
            let ref = stripUrlPrefix(prodType.attr('href'));
            let newVal;

            if (prodName == 'Memory Storage') {
                newVal = await scrapeSublinks(host, urlBuilder(host, ref));
            } else if (['Air Solutions', 'Smart Switch', 'Lifestyle TVs'].includes(prodName)) {
                newVal = null;
            } else {
                if (['Audio Sound', 'Watches'].includes(prodName)) {
                    prodName = 'Wearables';
                    ref = '/wearables/';
                } else if (prodName == 'Laundry') {
                    ref = '/laundry/';
                } else if (prodName == 'Sound Devices') {
                    prodName = 'Home Audio';
                }

                newVal = {
                    name: prodName,
                    url: urlBuilder(host, addUrlSuffix(ref))
                };
            }

            return newVal;
        })
        .get();

    const prodTypes = (await Promise.all(promises)).flat();

    for (const prodType of arrayFilterUnique(prodTypes, 'url')) {
        //console.log(`${prodType.name} Start`);
        await scrapeCategory(company, prodType.name, host, prodType.url);
        //console.log(`${prodType.name} Complete`);
    }
}

async function scrapeSublinks(host, url) {
    try {
        const $ = await scrape(url);

        return $('.aem-Grid', '.root .aem-Grid .responsivegrid')
            .children('.pd-g-feature-benefit')
            .map((_, elem) => {
                let ref = $('a.cta', elem).attr('href');
                ref = stripUrlPrefix(ref);
                return {
                    name: $('.feature-benefit__title', elem).text(),
                    url: urlBuilder(host, addUrlSuffix(ref))
                };
            })
            .get();
    } catch (err) {
        console.error(url);
        console.error(err);
    }
}

async function scrapeCategory(company, type, host, url) {
    let $ = await render(url, '.s-btn-more a.s-btn-text', 2000);
    let cards = $('.shop-grid-col', '.shop-grid')
        .has('.cm-shop-card__price-num');

    // In case there is <24 products, clicking the 'more' button
    // causes error where product grid is emptied (cards.length == 0).
    // Fix is to re-render page without clicking 'more';
    if (cards.length == 0) {
        $ = await render(url);
        cards = $('.shop-grid-col', '.shop-grid')
            .has('.cm-shop-card__price-num');
    }

    cards.each(async (i, prod) => {
        let data = {
            _type: type,
            company,
            specs: {}
        }

        //TODO: Add scrape for SKU and options (color, etc.)
        const price = $('.cm-shop-card__price-num strong', prod).text();
        const title = $('.js-cm-shop-card__product .cm-shop-card__product', prod);
        const ref = stripUrlPrefix($(title).attr('href'));
        let imgSrc = ($('.cm-shop-card__img', prod).has('.s-slick').length > 0)
            ? $('.cm-shop-card__img .s-slick', prod)
                .children()
                .first()
                .children('img')
                .attr('src')
            : $('.product-card-pdp-link img', '.cm-shop-card__img', prod)
                .attr('src');
        if (imgSrc.startsWith('//'))
            imgSrc = 'https:' + imgSrc;
        data["list price"] = parsePrice(price, xeRate);
        data.name = $('.s-txt-title', title).text().replace(/\.+$/, '');
        try {
            data.image = await parseImage(imgSrc);
        }
        catch (err) {
            console.error('Error scraping image: ' + imgSrc);
            console.error(data.name + ' = ' + $('.cm-shop-card__img', prod).has('.s-slick').length);
            console.error(err);
        }

        try {
            const spec = await getSpecSrc(host, ref);
            if (typeof spec == 'undefined')
                return; // skip if parse failed

            if (spec.hasSpecPage)
                data.specs = await scrapeSpecPage(spec.$);
            else
                data.specs = await scrapeSpecPanel(spec.$, spec.url);

            if (Object.keys(data.specs).length) {
                const name = sanitizeFileName(data.name);
                save(data);
            }
        } catch (err) {
            console.error(url);
            console.error(err);
        }
    });
}

async function getSpecSrc(host, ref) {
    let url = urlBuilder(host, ref);
    let $ = await scrape(url);

    const hasSpecPage = !$('body').has('#anchorContainer').length &&
        !($('a.cl-sticky-navigation-text__link').attr('href') || '').startsWith('#');

    try {
        if (hasSpecPage) {
            const specRef = $('li a').filter((_, elem) => {
                return /:spec[a-z]*$/g.test($(elem).data('omni'));
            }).attr('href');

            if (typeof specRef == 'undefined') return; // skip if parse failed 

            if (host.endsWith(specRef.substr(1, 3)))
                url = urlBuilder(host, stripUrlPrefix(specRef));
            else
                url = (new URL(specRef, url)).href;

            $ = await render(url);
        }
    } catch (err) {
        console.error({ url, hasSpecPage });
        console.error(err);
    }

    return {
        hasSpecPage,
        $,
        url
    };
}

async function scrapeSpecPage($) {
    const specs = {};

    $('.fp-spec__table-row', '.fp-spec__content-table')
        .each((_, cat) => {
            const key = $('.fp-spec__table-th h3', cat).text();

            $('.fp-spec__table-td .spec-list li', cat)
                .each((i, spec) => {
                    const name = $('.name', spec).text();
                    const val = $('.detail', spec).text();

                    if (i == 0) { // init spec[key]
                        specs[key] = (name.length == 0) ? val : { [name]: val };
                    }
                    else {
                        if (name.length > 0) {
                            specs[key][name] = val;
                        } else if (typeof specs[key] == 'string') {
                            specs[key] = [specs[key], val];
                        } else {
                            specs[key].push(val);
                        }
                    }
                });
        });

    return specs;
}

async function scrapeSpecPanel($, url) {
    const specs = {};

    $('.product-specs__highlights-wrap .product-specs__highlights-list')
        .children()
        .each((_, cat) => {
            const key = $('.product-specs__highlights-title', cat)
                .text()
                .replace(/[\r\n\s\t\u202F\u00A0]*$/g, '');

            if ((!$(cat).has('.product-specs__highlights-desc-list--sub').length) &&
                (!$(cat).has('.product-specs__highlights-desc-list').length)) {
                specs[key] = $('.product-specs__highlights-desc', cat).text();
            } else {
                specs[key] = {};
                $('ul li', cat)
                    .each((_, spec) => {
                        let name = $('.product-specs__highlights-sub-title', spec).text() ||
                            $('.product-specs__highlights-sub-title--grey', spec).text();
                        name = name.replace(/[\r\n\s\t\u202F\u00A0]*$/g, '');
                        const val = $('.product-specs__highlights-desc', spec).text();

                        if (name == "")
                            specs[key] = val;
                        else
                            specs[key][name] = val;
                    });
            }
        });

    return specs;
}

/** Strips country prefix from url
 * @example '/uk/tvs/' => '/tvs/'
*/
function stripUrlPrefix(ref) {
    return ref.replace(/^\/[^/]+/, '')
}

/** Adds 'all-*' suffix to url for all product listing
 * @example '/tvs' => '/tvs/all-tvs/'
 */
function addUrlSuffix(ref) {
    if (!ref.endsWith('/') && !ref.includes('?'))
        ref += '/';
    if (!/\/([^/]+)\/all-\1\/?(?:\?.*)?$/.test(ref))
        ref = ref.replace(/\/([^/]+)\/(\?.*)?$/, '/$1/all-$1/$2');
    return ref;
}

module.exports = {
    run: runScraper
};