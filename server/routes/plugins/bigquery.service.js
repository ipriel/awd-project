const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

function getUniqueVisitors() {
    return Promise.reject('Method not implemented yet')
    /* return new Promise((resolve, reject) => {
        // Query is a placeholder until actual query is found
        const query = 'SELECT url FROM `publicdata.samples.github_nested` LIMIT 100';

        bigquery.query(query, function (err, rows) {
            if (!err)
                return reject(err);
                
            resolve(rows);
        });
    }); */
}

module.exports = {
    getUniqueVisitors
}