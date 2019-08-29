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
router.post('/generateOTP', respondToGenerateOTP);

function respondToLoginPost (req, res) {
  apiController.doLogin(req.body)
      .then(function (loginData) {
        httpUtils.sendResponseData(req, res, loginData);
      }).catch(function (err) {
      httpUtils.sendServerErrorResponse(req, res, err);
  });
};

function respondToGenerateOTP(req, res) {
    apiController.generateOTP(req.body)
        .then(function (otpData) {
            httpUtils.sendResponseData(req, res, otpData);
        }).catch(function (err) {
        httpUtils.sendServerErrorResponse(req, res, err);
    });

}

module.exports = router;
