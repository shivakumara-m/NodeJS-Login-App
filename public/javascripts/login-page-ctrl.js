var ngApp = angular.module('ngApp');

ngApp.controller('loginPageCtrl', ['$window', '$scope', '$rootScope', '$state', 'httpService', '$interval',
    function ($window, $scope, $rootScope, $state, httpService, $interval) {
        $scope.user = {};
        $state.go('login.email');
        $scope.otpGenerated = false;
        var timer = null;
        $scope.invalidCredential = false;
        $scope.invalidOtp = false;
        $scope.loginWithEmail = function (email, password) {
            var postData={
                "email": email,
                "password": password,
                "authType" : 'EMAIL_PASSWORD'
            };

            httpService.userLogin(postData)
                .then(function (success) {
                console.log("Login successful " +$scope.username);
                    $scope.invalidCredential = false;
                    $state.go('login.home');

            }).catch(function (error) {
                $scope.invalidCredential = true;
                console.log(" login failed" + error);
            });
        };

        $scope.loginWithOTP = function (number, otp) {
            if(timer) {
                $interval.cancel(timer);
            }
            var postData={
               "userNumber": number,
                "otp": otp,
                "authType" : 'OTP_PASSWORD'
            };

            httpService.userLogin(postData)
                .then(function (success) {
                    console.log("Login successful " +$scope.username);
                    $scope.resetUI();
                    $state.go('login.home');

                }).catch(function (error) {
                //console.log(" login failed" + error);
                $scope.invalidOtp = true;
                //alert('login failure:')

            });
        };

        $scope.generateOTP = function (mobileNumber) {
            $scope.invalidOtp = false;
            $scope.userMobileNum = mobileNumber;
            var postData = {
                "userTelNumber": mobileNumber
            };

            httpService.generateOTP(postData)
                .then(function (success) {
                    $scope.timeRemaining = 180;
                    $scope.otpGenerated = true;
                    timer = $interval(function () {
                        $scope.timeRemaining--;

                        if($scope.timeRemaining === 0) {
                            alert('OTP Expired. Please generate again');
                            $scope.resetUI()
                        }
                    }, 900);

                }).catch(function (error) {
                $scope.otpGenerated = false;
                alert('login failure:')
            });
        };

        $scope.resetUI = function () {
            $interval.cancel(timer);
            $scope.otpGenerated = false;
        };

        $scope.$on('$destroy', function() {
            $interval.cancel(timer);
        });
    }]);
