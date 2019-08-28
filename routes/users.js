var express = require('express');
var router = express.Router();
var httpUtils = require('../lib/http-utils');
var apiController = require('../lib/login-api');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*Login API
* @params:
* req body : {
* emialId:
* phoneNumber:
* password:
* otp:
* userExtraInfo:
*
* }
*/
router.post('/login', respondToLoginPost);

function respondToLoginPost (req, res) {
  apiController.doLogin(req.body)
      .then(function (loginData) {
        httpUtils.sendResponseData(req, res, loginData);
      }).catch(function (err) {
      httpUtils.sendResponseData(err);
  })

};

module.exports = router;
