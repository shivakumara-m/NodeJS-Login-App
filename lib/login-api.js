var loginController = module.exports;
const emailAuthType = "EMAIL_PASSWORD";
const otpAuthType = "OTP_PASSWORD";
const oAuth = "OAUTH"; // could be google/facebook/microsoft etc
const userDbClient = require('./dbconnectors/user-db-connector');
const Q = require('q');
loginController.doLogin = function (requestBody) {
  let userObj = {};
    switch (requestBody.authType) {
        case emailAuthType:
            return authenticateByEmailPwd(requestBody);
        case otpAuthType:
            break;
        case oAuth:
            break;
        default:
            break;
    }
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

}

function authenticateByOther(requestBody) {

}

function getHashFromPassword(plainPassword) {
    return plainPassword; //TODO: Implement hashin logic
}

