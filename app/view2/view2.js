'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl',
            controllerAs: "View2Ctrl"
        });
    }])

    .controller('View2Ctrl', ["$http", function ($http) {
        const vm = this;
        vm.userInformation = {
            introduction: "",
            section1: "",
            section2: "",
            section3: "",
            section4: ""
        };
        var userInformationEmpty = {
            introduction: emptyValue,
            section1: emptyValue,
            section2: emptyValue,
            section3: emptyValue,
            section4: emptyValue
        };


            if (user) {
                $http.get(baseUrl).then(function getWithSuccess(response) {
                    if (vm.userInformation !== null && vm.userInformation !== undefined) {
                        vm.userInformation = response.data;
                    }
                    else {
                        vm.userInformation = userInformationEmpty;
                    }
                }, function getWithError(response) {
                    vm.userInformation = response
                });

                vm.updateInformation = function () {
                    var userInformationToPost = vm.userInformation;
                    $http({
                        method: "PUT",
                        url: "https://axeladministration.firebaseio.com/userInformation/-K_y8iguXuK3t4BEJEGu.json",
                        data: userInformationToPost
                    }).then(function updateWithSucces(response) {
                            console.log(response)
                        }, function RejectUpdate(response) {
                            console.log(response.statusText);
                        }
                    )
                }
            }


    }]);