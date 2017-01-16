'use strict';

angular.module('myApp.project', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/project', {
            templateUrl: 'project/project.html',
            controller: 'View1Ctrl',
            controllerAs: "View1Ctrl"
        });
    }])

    .controller('View1Ctrl', ["$http", "$mdToast", "$route", function ($http, $mdToast, $route) {
        var vm = this;
        vm.projectList = [];
        vm.parsedProjectList = [];
        vm.userIsLogged = localStorage.getItem("isUserLogged");
        if (vm.userIsLogged === null) {
            window.location.href = "http://localhost:8000/#!/login";
        }
        else {
            /**
             * /GET sur la liste des projets en base et affichage d'une notification en cas de succés ou d'erreur
             */
            $http.get(baseProjectUrl).then(function Success(response) {
                vm.projectList = response.data;
                angular.forEach(vm.projectList, function (value) {
                    vm.parsedProjectList.push(value);
                });
                $mdToast.show($mdToast.simple().textContent(projectNotification.success));
            }, function Error(response) {
                $mdToast.show($mdToast.simple().textContent(projectNotification.externalError));
            });

            vm.newProject = {
                projectUrl: baseProjectUrlToPut
            };

            /**
             * /POST d'un nouveau projet en base puis /PUT de celui ci sur son objet afin de lui mapper la base URL
             * pour faciliter l'edit de celui-ci
             */
            vm.postNewProject = function () {
                if (vm.newProject.title != null && vm.newProject.image !== null && vm.newProject.content !== null) {
                    vm.dataToPost = vm.newProject;
                    $http.post(baseProjectUrl, vm.dataToPost).then(function SuccessPost(response) {
                        vm.newProject.projectUrl = baseProjectUrlToPut + response.data.name + ".json";
                    }, function ErrorPost(response) {
                        console.log(response);
                    }).then(function putprojectUrl() {
                        var urlToPut = vm.newProject.projectUrl;
                        var dataToPut = vm.newProject;
                        $http.put(urlToPut, dataToPut).then(function successPut() {
                            $route.reload();
                        }, function errorPut() {
                            $mdToast.show($mdToast.simple().textContent(notificationMessage.errorPost));
                        });
                    });
                } else {
                    vm.showFormError = true;
                }

            };

            /**
             * Recupere le current project puis effectue un update /PUT de ce projet en base
             * @param project
             */
            vm.postEditedProject = function (project) {
                vm.currentProject = project;
                $http.put(vm.currentProject.baseProjectUrl, vm.currentProject).then(function () {
                    $route.reload();
                }, function () {
                    $mdToast.show($mdToast.simple().textContent(notificationMessage.errorPost));
                })
            };

            /**
             * Supprime /DELETE le current project en base au clic sur l'item et refraichis le controlleur
             * @param project
             */
            vm.deleteProject = function (project) {
                vm.projectToDelete = project;
                $http.delete(vm.projectToDelete.projectUrl).then(function successDelete() {
                        $route.reload();
                        $mdToast.show($mdToast.simple().textContent(notificationMessage.successDelete));
                    }, function errorDelete() {
                        $mdToast.show($mdToast.simple().textContent(notificationMessage.errorDelete));
                    }
                )
            };

        }


}]);