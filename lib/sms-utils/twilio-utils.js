const accountSid = process.env.TWILIO_ACC_ID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);
const twilioNumber = '+12134187919';
const Q = require('q');
var twilioUtils = module.exports;
//Twilio template
client.messages
    .create({
        body: 'Hi',
        from: twilioNumber,
        to: '+'
    })
    .then(message => console.log(message))
    .done();

twilioUtils.sendSMS = function (toAddr, OTP) {
    console.log('sending to twilio');
    let retPromise = Q.defer();
    let message = 'Your OTP to login to XYZ app is ' + OTP ;
    client.messages
        .create({
            body: message,
            from: twilioNumber,
            to: toAddr
        })
        .then(function (message) {
            console.log('Response from twilio');
            console.log(message);
            retPromise.resolve(OTP);
        }).catch(function (err) {
            console.log(err);
        retPromise.resolve();
    });
    return retPromise.promise;

};
