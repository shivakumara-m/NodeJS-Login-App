var ngApp= angular.module('ngApp',['ui.router']);

var uiLogging = function (loggingFunc, context) {
    var myContext = context;
    return function () {
        var newArgs = [].slice.call(arguments);
        var dateStr = (new Date()).toISOString();
        var callerFunc = arguments.callee.caller.name;
        newArgs[0] = [dateStr + ':[' + myContext + ':' + callerFunc + ']=> '] + newArgs[0];
        loggingFunc.apply(null, newArgs);
    };
};


ngApp.config(function ($httpProvider) {

    var logsOutUserOn401 = ['$rootScope', '$q', '$location', function ($rootScope, $q, $location) {
        return {
            'responseError': function (rejection) {
                if (rejection.status === 401) {
                    console.log(' session error - session time out - redirect to login loc');
                    var windowsHash = window.location.hash;
                    console.log('Hash when 401:', windowsHash);

                    window.location = '/#/login';
                }
                return $q.reject(rejection);
            }
        };
    }];

    $httpProvider.interceptors.push(logsOutUserOn401);
});

ngApp.run(['$window', '$rootScope', '$log', '$state', '$stateParams','httpService',
    function ($window, $rootScope, $log, $state, $stateParams,httpService) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.go('login.email');
        $log.getInstance = function (contextl) {
            var myContext = contextl;
            return {
                log: uiLogging($log.log, myContext),
                info: uiLogging($log.info, myContext),
                warn: uiLogging($log.warn, myContext),
                debug: uiLogging($log.debug, myContext),
                error: uiLogging($log.error, myContext)
            };
        };

        $window.$log = $log;
        var logger = $window.$log.getInstance('ngApp');

        function message(to, toP, from, fromP) {
            return from.name + angular.toJson(fromP) + " -> " + to.name + angular.toJson(toP);
        }

        $rootScope.$on("$stateChangeStart", function (evt, to, toP, from, fromP) {
            return;
        });

        $rootScope.$on("$stateChangeSuccess", function (evt, to, toP, from, fromP) {
            logger.debug("Success: " + message(to, toP, from, fromP));
        });

        $rootScope.$on("$stateChangeError", function (evt, to, toP, from, fromP, err) {
            logger.debug("Error:   " + message(to, toP, from, fromP), err);
        });



    }]);

