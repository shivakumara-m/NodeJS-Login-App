const accountSid = 'ACfa91706c6545733ccc069292e3680d2a'; // Your Account SID from www.twilio.com/console
const authToken = '03d9817ecab50cb30421addff0fa25b5';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
const TWILIO_FROM_NUMBER = '+12052559679';
var twilioUtils = module.exports;

twilioUtils.sendSMS = function (body, toAddress) {
    /*client.messages.create({
        body: body,
        to: toAddress,  // Text this number
        from:  TWILIO_FROM_NUMBER// From a valid Twilio number
    }).then((message) => console.log(message));*/
};

