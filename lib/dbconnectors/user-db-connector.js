var userDbClient = module.exports;
var dbBaseClient = require('../dbconnectors/db-base-connection-utils');

userDbClient.getUser = function (userInfo) {
    let sqlQuery = 'select * from users where emailid = ?';
    let paramArray = [userInfo.email];
    return dbBaseClient.executeQuery(sqlQuery, paramArray);
};



