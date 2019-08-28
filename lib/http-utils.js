var httpUtils = module.exports;
const API_OK_STATUS = 200;
const API_ERROR_STATUS = 500;
const API_ERROR_MESSAGE = 'Invalid operation';

httpUtils.sendResponseData = function (req, resp, rdata) {
    let replyHeaders = makeReplyHeaders(req);
    resp.writeHead(API_OK_STATUS, replyHeaders);
    resp.write(JSON.stringify(getGenereicSuccessResp(rdata)));
    resp.end();
};

httpUtils.sendServerErrorResponse = function(req, resp, errorObj) {
    let replyHeaders = makeReplyHeaders(req);
    if(!errorObj) {
        errorObj = {
            errorCode: API_ERROR_STATUS,
            message: API_ERROR_MESSAGE
        }
    }
    resp.writeHead(API_ERROR_STATUS, replyHeaders);
    resp.write(JSON.stringify(getGenereicErrorResp(errorObj)));
    resp.end();
};
let makeReplyHeaders = function (req) {
    var orig = (req.origin && req.headers.origin) ? req.headers.origin : '*';
    var replyHeaders = {
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": orig,
        "Access-Control-Allow-Credentials": true,
        'Cache-Control': 'no-cache'
    };
    return replyHeaders;
};

function getGenereicSuccessResp(resp) {
    let respObj = {
        status: API_OK_STATUS,
        data: resp ? resp : {}
    };
    return respObj;
}

function getGenereicErrorResp(resp) {
    let respObj = {
        status: API_ERROR_STATUS,
        data: resp ? resp : {}
    };
    return respObj;
}
