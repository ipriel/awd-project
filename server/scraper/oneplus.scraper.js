const { scrape, render, urlBuilder, stripUrlParams } = require('./util');
const fs = require('fs');
const stringify = require('json-stable-stringify');

async function runScraper() {
    const host = 'https://www.oneplus.com/';
    const company = 'OnePlus';
    const $ = await scrape(host);
    const nav = $('.footer-nav dl');

    const phones = $(nav[0]);
    phones.find('dd ul li a').each(async (_, obj) => {
        const ref = urlBuilder(host, $(obj).attr('href'));
        let data = await scrapePhone($(obj).text(), ref);
        data.company = company;
        data['_type'] = 'Phone';
        
        // If scraping succeeded, output results
        if(data.specs && data.specs.length > 0)
            fs.writeFileSync('./scraper/output/'+data.name+'.json', stringify(data, {space: 2}));
    });

    const accessories = $(nav[1]);
    accessories.find('dd ul li a').each(async (i, obj) => {
        const ref = urlBuilder(host, $(obj).attr('href'));
        try {
            let dataArr = await scrapeAccessoryType(company, $(obj).text(), ref);
            dataArr.forEach(data => fs.writeFileSync('./scraper/output/'+data.name+'.json', stringify(data, {space: 2})));
        } catch (err) {
            console.error(err);
        }
    });
}

async function scrapePhone(name, url) {
    url += '/specs';
    console.log('>' + url);
    const $ = await render(url);
    let data = {
        name,
        specs: {}
    }

    $('#specs-bottom .specs-left section').each((_, cat) => {
        const key = $(cat).find('div.title').text().replace('\n', '').trim();
        if (key == 'Note') return;
        data.specs[key] = {};
        $(cat).find('.tips .items li').each((_, stat) => {
            const text = $(stat).text();

            let param, val;
            if (text.indexOf(':') > 0) {
                [param, ...val] = text.split(':');
                data.specs[key][param] = val.join(':').trim();
            }
            else {
                param = $(stat).siblings('.font-subheading').text() || 'Data';
                if (!data.specs[key].hasOwnProperty(param))
                    data.specs[key][param] = [];
                data.specs[key][param].push(text);
            }
        });
    });

    const buyUrl = $('a.buy-btn', 'div.nav-list').attr('href');
    const price = await scrapePrice(buyUrl);
    if (price)
        data["list price"] = price;

    return data;
}

async function scrapePrice(url) {
    try {
        url = stripUrlParams(url);
        const $ = await render(url);
        let price = ($('span.price-money', '.device-choose').text() || $('.phone-info h6 span').text()).trim();

        if (price === "") return null; // Edge case - parse failure

        return parsePrice(price);
    } catch (err) {
        console.error('Error scraping url: ' + url);
        console.error(`${err.message} ${(err.code != null) ? '(' + err.code + ')' : ''}`);
        return null;
    }
}

async function scrapeAccessoryType(company, type, url) {
    if (type == "Bundles" || type == "Gear") return []; //skip because not relevant

    const $ = await render(url);
    let dataArr = [];

    let promises = $('.accessory-list-cards .accessory-list-card')
        .filter((_i, el) => {
            if ($('.accessory-name', el).text().includes('Bundle'))
                return false;

            const subElems = $(el).find('.carousel-list .carousel-slide');
            if (subElems.length == 0) {
                return $(el).has('.no-stock-hint').length == 0;
            } else {
                return subElems.filter(':not(:has(.no-stock-hint))').length > 0;
            }
        })
        .map(async (_, accessory) => {
            let data = {
                _type: type,
                company,
                specs: {}
            }

            const price = $('.accessory-price .price', accessory).text() || $('.accessory-price .discounted', accessory).text();
            data["list price"] = parsePrice(price);
            data.name = $('.accessory-name', accessory).text();
            data.specs = await scrapeAccessory($('.accessory-card', accessory).attr('href'));
            
            dataArr.push(data);
        })
        .get();
    
    await Promise.all(promises);
    return dataArr;
}

async function scrapeAccessory(url) {
    const $ = await scrape(url);
    if ($('.add-info .add-info-box').length) { // 1 == true
        return parseGridType($);
    } else {
        return parseColType($);
    }
}

async function parseGridType($) {
    let specs = {};

    $('.info-row', '.add-info-box .body-content').each((_, cat) => {
        const key = $('.second-subject', cat).text().replace('\n', '').trim();
        if ($(cat).has('.third-subject').length == 0) {
            specs[key] = [];
            $('.item .text', cat).each((_, val) => {
                specs[key].push($(val).text());
            });
        } else {
            specs[key] = {};
            $('.item', cat).each((_, spec) => {
                let val;
                if ($('.text', spec).length == 1) {
                    val = $('.text', spec).text();
                } else {
                    val = [];
                    $('.text', spec).each((_, text) => {
                        val.push($(text).text());
                    });
                }
                const param = $('.third-subject', spec).text();

                specs[key][param] = val;
            });
        }
    });

    return specs;
}

async function parseColType($) {
    let specs = {};

    $('.content-container', '.tech-specs .cmp__tech-specs').each((_, cat) => {
        const key = $('.left-part .title', cat).text().replace('\n', '').trim();
        if ($('.right-part', cat).has('h6').length == 0) {
            specs[key] = [];
            $('.right-part p', cat).each((_, val) => {
                specs[key].push($(val).text());
            });
        } else {
            specs[key] = {};
            let param;
            $('.right-part', cat).children().each((_, elem) => {
                if (elem.name == 'h6') {
                    param = $(elem).text();
                } else {
                    switch (typeof specs[key][param]) {
                        case 'undefined':
                            specs[key][param] = $(elem).text();
                            break;
                        case 'string':
                            specs[key][param] = [specs[key][param], $(elem).text()];
                            break;
                        case 'object':
                            specs[key][param].push($(elem).text());
                            break;
                    }
                }
            });
        }
    });

    return specs;
}

function parsePrice(price) {
    return parseFloat(price.replace(/[^0-9.,]/g, ""));
}

module.exports = {
    run: runScraper
};