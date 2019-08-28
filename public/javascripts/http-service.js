var ngApp = angular.module('ngApp');


ngApp.service('httpService', [ '$http', '$q', '$rootScope', '$window', '$state',
    function ( $http, $q, $rootScope, $window, $state) {

        var logger  = console;
        if ($window.$log) {
            logger = $window.$log.getInstance('httpService');
        }

        init();

        function init() {
            logger.info('Initing the httpService .. ');
        }

        this.userLogin = function (userObj) {
            var postUrl = '/users/login';
            var bodyData = userObj;
            return this.sendCommandForRestPost(postUrl, bodyData);
        };

        this.generateOTP = function (bodyData) {
            var postUrl = '/users/generateOTP';
            return this.sendCommandForRestPost(postUrl, bodyData);
        };



        //todo need to move and store all response status in a config service
        var RESPONSE_STATUS_ERROR = "500";
        var RESPONSE_STATUS_OK = "200";

        this.sendCommandForRestGet = function (getUrl) {
            logger.debug('sendCommandForRestGet: url: ' + getUrl);
            var qGetDefered = $q.defer();
            $http.get(getUrl)
                .success(function (data, status, headers) {
                    processGetPostResponse(qGetDefered, data, status, headers);
                    // qGetDefered.resolve(data);
                }).
            error(function (data, status, headers) {
                var errMessage = 'ERROR in httpGet: ' + JSON.stringify(status);
                logger.error(errMessage);
                qGetDefered.reject(errMessage);
            });
            return qGetDefered.promise;
        };

        this.sendCommandForRestPost = function (postUrl, bodyData) {

            if (postUrl !== '/api/login') {
                logger.debug('sendCommandForRestPost: url: ' + postUrl + ' :bodyData: ' + JSON.stringify(bodyData));
            }

            var qPostDefered = $q.defer();
            $http.post(postUrl, bodyData)
                .then(function (data, status, headers) {
                    processGetPostResponse(qPostDefered, data, status, headers);
                })
                .catch(function (data, status, headers) {
                    var errMessage = 'ERROR in httpPost: ' + JSON.stringify(status);
                    logger.error(errMessage);
                    qPostDefered.reject(errMessage);
                });
            return qPostDefered.promise;
        };

        function processGetPostResponse (qGetPostDefered, data, status, headers) {
            console.log(JSON.stringify(data) + " response ");
            if(data.status == RESPONSE_STATUS_ERROR) { // change the hard-coding
                var errMessage = 'Operation error: ' + data.message;
                logger.error(errMessage);
                qGetPostDefered.reject(errMessage);
            }
            //      console.log("data = in service =" +data);
            qGetPostDefered.resolve(data);
        }
    }]);
