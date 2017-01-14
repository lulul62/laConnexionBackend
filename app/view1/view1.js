'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl',
            controllerAs: "View1Ctrl"
        });
    }])

    .controller('View1Ctrl', ["$http", "$mdToast", function ($http, $mdToast) {
        var vm = this;
        vm.projectList = [];
        vm.parsedProjectList = [];
        $http.get(baseProjectUrl).then(function Success(response) {
            vm.projectList = response.data;
            angular.forEach(vm.projectList, function (value) {
                vm.parsedProjectList.push(value);
            });
            $mdToast.show($mdToast.simple().textContent(projectNotification.success));
        }, function Error(response) {
            $mdToast.show($mdToast.simple().textContent(projectNotification.externalError));
        })
    }]);