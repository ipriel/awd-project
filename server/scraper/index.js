const schedule = require('node-schedule');
const path = require('path');
const fs = require('fs');

let plugins;

async function getPlugins(directoryPath) {
    const files = await new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return reject(err);
            }

            resolve(files);
        });
    });

    return files.map(file => require(path.join(directoryPath, file)));
}

async function init() {
    const directoryPath = path.join(__dirname, 'plugins');
    plugins = await getPlugins(directoryPath);
}

async function initScheduler() {
    await init();
    schedule.scheduleJob('0 1 * * 6', run);
}

async function run() {
    for (plugin of plugins) {
        await plugin.run();
    }
}

async function runOnce() {
    if (typeof plugins == 'undefined' ||
        plugins == null ||
        plugins.length == 0)
        await init();
    
    run();
}

module.exports = {
    init,
    initScheduler,
    run,
    runOnce
}