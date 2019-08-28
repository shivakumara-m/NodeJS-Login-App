var baseConnector = module.exports;
var knex = require('knex');
var connectionObject = null;
const Q = require('q');
const connStr =  'postgres://' + 'owner' + ':' + 'user' + '@' + 'localhost' + ':' + '5432' + '/' + 'schema';
baseConnector.getDefaultDBConnection = function () {
    if(!connectionObject) {
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

