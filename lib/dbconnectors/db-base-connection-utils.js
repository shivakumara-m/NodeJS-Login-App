var baseConnector = module.exports;
var knex = require('knex');
var connectionObject = null;
const Q = require('q');
baseConnector.getDefaultDBConnection = function () {
    if(!connectionObject) {
        //'postgres://postgres:postgres@localhost:5432/database';
        const connStr =  'postgres://'
            + process.env.POSTGRES_USER + ':'
            + process.env.POSTGRES_PASSWORD + '@'
            + process.env.DB_HOST + ':'
            + '5432' + '/'
            + process.env.POSTGRES_DB;
        console.log(connStr);
        connectionObject = new knex({
            client: 'pg',
            connection: connStr,
            pool: {
                min: 1,
                max: 8
            }
        });
    }
    return connectionObject;
};

baseConnector.executeQuery = function (sqlQuery, paramArray) {
    let retPromise = Q.defer();
    let dbClient = baseConnector.getDefaultDBConnection();
    dbClient.raw(sqlQuery, paramArray)
        .then(function (dbResult) {
            retPromise.resolve(dbResult.rows);
        }).catch(function (dbErr) {
        retPromise.reject(dbErr);
    });

    return retPromise.promise;
};

