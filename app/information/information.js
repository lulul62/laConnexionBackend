'use strict';

angular.module('myApp.information', ['ngRoute', 'ngMaterial'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/information', {
            templateUrl: 'information/information.html',
            controller: 'View2Ctrl',
            controllerAs: "View2Ctrl"
        });
    }])

    .controller('View2Ctrl', ["$http", "$mdToast", function ($http, $mdToast) {
        const vm = this;
        vm.userInformation = {};
        vm.userIsLogged = localStorage.getItem("isUserLogged");
        if (vm.userIsLogged === null) {
            window.location.href = "hhttps://la-connexion-admin.herokuapp.com/#!/login";
        }
        else {
                /**
                 * Récuperation de l'objet information et affiche une notification en cas de succés ou d'erreur
                 */
                $http.get(baseUrl).then(function getWithSuccess(response) {
                    if (vm.userInformation !== null && vm.userInformation !== undefined) {
                        vm.userInformation = response.data;
                        $mdToast.show($mdToast.simple().textContent(notificationMessage.success));
                    }
                    else {
                        $mdToast.show($mdToast.simple().textContent(notificationMessage.empty));
                    }
                }, function getWithError() {
                    $mdToast.show($mdToast.simple().textContent(notificationMessage.externalError));
                });

                /**
                 * Update les informations du formulaire et affiche une notifcation en cas de succés ou d'erreur
                 */
                vm.updateInformation = function () {
                    var userInformationToPost = vm.userInformation;
                    $http.put(baseUrl, userInformationToPost).then(function updateWithSucces() {
                            $mdToast.show($mdToast.simple().textContent(notificationMessage.updateSucces));
                        }, function RejectUpdate() {
                            $mdToast.show($mdToast.simple().textContent(notificationMessage.externalError));
                        }
                    )
                }
            }

    }]);
