var loginController = module.exports;
const emailAuthType = "EMAIL_PASSWORD";
const otpAuthType = "OTP_PASSWORD";
const oAuth = "OAUTH"; // could be google/facebook/microsoft etc
const userDbClient = require('./dbconnectors/user-db-connector');
const Q = require('q');
const otpPadding = 1967;
const moment = require('moment');
const OTP_EXPIRY_DURATION_SECONDS = 180;
var OTPCache = {};
loginController.doLogin = function (requestBody) {
  let userObj = {};
    switch (requestBody.authType) {
        case emailAuthType:
            return authenticateByEmailPwd(requestBody);
        case otpAuthType:
            return authentocateByOTP(requestBody);
            break;
        case oAuth:
            return authenticateByOther();
            break;
        default:
            return authenticateByOther();
            break;
    }
};

//TODO: Store OTP in DB than in memory, otherwise on restart otp will be lost
loginController.generateOTP = function (requestBody) {
    let retPromise = Q.defer();
    let userNumber = requestBody.userTelNumber ;
    let OTP = Math.floor((Math.random()*10000)+1);
    if(OTP < 1000) {
        OTP += otpPadding;
    }
    OTPCache[userNumber] = {
        otp: OTP,
        created: moment()
    };
    retPromise.resolve({'otp': OTPCache}); //TODO: Remove OTP from response
    return retPromise.promise;
};



function authenticateByEmailPwd(requestBody) {
    let retPromise = Q.defer();
    let user = {
        email: requestBody.email
    };
    userDbClient.getUser(user)
        .then(function (data) {
            console.log(data);
            if(data && data.length > 0 ) {
                let user = data[0]; // only one user can be present for given email
                if(user.passwordhash === getHashFromPassword(requestBody.password)) {
                    retPromise.resolve(user);
                } else {
                    throw Error('Invalid credentials');
                }
            } else {
                throw Error('Invalid credentials');
            }
            retPromise.resolve(data);
        }).catch(function (error) {
        retPromise.reject(error);
    });

    return retPromise.promise;
}

function authentocateByOTP(requestBody) {
    let retPromise = Q.defer();
    let otp = requestBody.otp;
    let userNumber = requestBody.userNumber;
    let storedOTPObj = OTPCache[userNumber];
    if (storedOTPObj) {
        let currentTime = moment();
        if(currentTime.diff(storedOTPObj.created, 'seconds') > OTP_EXPIRY_DURATION_SECONDS) {
            retPromise.reject();
        }
        else {
            if (otp == storedOTPObj.otp) {
                delete OTPCache[userNumber]; // Invalidate OTP once verified
                retPromise.resolve();
            }
            retPromise.reject();
        }
    } else {
        retPromise.reject();
    }
    return retPromise.promise;
}

function authenticateByOther(requestBody) {
    let retPromise = Q.defer();
    retPromise.resolve('Auth mechanism not supported yet');
    return retPromise.promise;
}

function getHashFromPassword(plainPassword) {
    return plainPassword; //TODO: Implement hashing logic
}

