var ngApp = angular.module('ngApp');

ngApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise(function () {
        return '/login'
    });

    var login = {
            access: {
                requiredLogin: false
            },
            url: '/login',
            templateUrl: '/views/login-page.html',
            controller: 'loginPageCtrl',

        },
        loginEmail = {
            access: {
                requiredLogin: false
            },
            url: '/email',
            views: {
                emailLoginView: {
                    templateUrl: '/views/login-email.html',
                }
            }


        },
        loginOTP = {
            access: {
                requiredLogin: false
            },
            url: '/otp',
            views: {
                mobilOTPLoginView: {
                    templateUrl: '/views/login-otp.html',
                }
            },
        },
        home = {
            access: {
                requiredLogin: false
            },
            url: '/home',
            views: {
                homeView: {
                    templateUrl: '/views/home.html',
                }
            },
        }
    ;

    $stateProvider
        .state('login', login)
        .state('login.email',loginEmail)
        .state('login.otp', loginOTP)
        .state('login.home', home)
    ;
});
