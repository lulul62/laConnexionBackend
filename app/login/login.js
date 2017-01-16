'use strict';

angular.module('myApp.login', ['ngRoute', 'ngMaterial'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl',
            controllerAs: "LoginCtrl"
        });
    }])

    .controller('LoginCtrl', ["$http", "$mdToast", function ($http, $mdToast) {
        const vm = this;
        vm.userToLog = {};
        vm.dataToCheck = {};

        /**
         * /Get sur le mot de passe et le login en base
         */
        $http.get(baseUrlLogin).then(function checkValidationSuccess(response) {
            vm.dataToCheck = response.data;
            console.log(vm.dataToCheck);
        }, function errorResponse() {
            $mdToast.show($mdToast.simple().textContent("Erreur interne"));
        });

        /**
         * Check si les informations du formulaire correspondent avec l'bjet récuperé en base
         */
        vm.checkUserInformation = function () {
            console.log(vm.dataToCheck);
          if(vm.dataToCheck.username === vm.userToLog.username && vm.dataToCheck.password === vm.userToLog.password) {
              localStorage.setItem('isUserLogged', true);
              $mdToast.show($mdToast.simple().textContent("Bienvenue" + " " +  vm.userToLog.username + " !" ))
                  .then(function redirectUser() {
                 window.location = "http://localhost:8000/#!/project";
              });
          } else {
              $mdToast.show($mdToast.simple().textContent("Le login et le mot de passe ne correspondent pas"));
          }
        };

    }]);