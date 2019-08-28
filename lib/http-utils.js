var httpUtils = module.exports;
const API_OK_STATUS = 200;
httpUtils.sendResponseData = function (req, resp, rdata) {
    let replyHeaders = makeReplyHeaders(req);
    resp.writeHead(API_OK_STATUS, replyHeaders);
    resp.write(JSON.stringify(rdata));
    resp.end();
};

httpUtils.sendServerErrorResponse = function(req, resp, errorObj) {
    let replyHeaders = makeReplyHeaders(req);
    resp.writeHead(errorObj.errorCode, replyHeaders);
    resp.write(JSON.stringify(errorObj.errorData));
    resp.end();
};
let makeReplyHeaders = function (req) {
    var orig = (req.origin && req.headers.origin) ? req.headers.origin : '*';
    var replyHeaders = {
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": orig,
        "Access-Control-Allow-Credentials": true
    };
    return replyHeaders;
};
