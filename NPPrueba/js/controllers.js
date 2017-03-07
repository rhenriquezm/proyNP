(function() {
    var app = angular.module('app.controllers', ['LocalStorageModule'])
    app.factory("loginFactory", function() {
        return {
            data: {}
        };
    })
    app.controller('homeCtrl', function($scope, $stateParams, loginFactory, $http, $ionicPopup, $state, $ionicLoading, localStorageService) {
        $scope.np_usuario = {};
        $scope.np_usuario.email = '';
        $scope.np_usuario.clave = '';
        $scope.login = function() {
            $ionicLoading.show({ //Comienzo del "Cargando"
                template: 'Cargando...'
            });
            if ($scope.np_usuario.email != '' && $scope.np_usuario.clave != '') {
                $http.post("http://localhost/proyNP/apiNP/np_usuario/login", {
                    'email': $scope.np_usuario.email,
                    'clave': $scope.np_usuario.clave
                }).then(function(res) {
                    var estado = res.data.estado;
                    if (estado == 1) {
                        localStorageService.set("np_usuario", res.data.usuario);
                        //localStorageService.set("apellido", res.data.usuario.ap_paterno);
                        //loginFactory.data.nombres = localStorageService.get('nombre');
                        //loginFactory.data.ap_paterno = localStorageService.get('apellido');
                        $ionicLoading.hide(); //Termina de mostrar el "Cargando"
                        $state.go("menu.page3");
                    } else {
                        $ionicLoading.hide(); //Termina de mostrar el "Cargando"
                        var alertPopup = $ionicPopup.alert({
                            title: 'Oops',
                            template: 'Usuario o clave incorrecto'
                        });
                    }
                });
            } else {
                $ionicLoading.hide(); //Termina de mostrar el "Cargando"
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops',
                    template: 'Faltan Campos por llenar'
                });
            }
        };
    })
    app.controller('page3Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page7Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page8Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page23Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page24Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page21Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page22Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page14Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page16Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page18Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page19Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page20Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page9Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page10Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page15Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page25Ctrl', function($scope, $stateParams, localStorageService, $http) {
        //$scope.np_usuario = localStorageService.get('np_usuario');
        //alert(localStorageService.get("np_usuario").id);
        $http.post("http://localhost/proyNP/apiNP/np_usuario/usuario", {
            //'id': localStorageService.get("np_usuario").id
            'id': 3
        }).then(function(res) {
            var estado = res.data.estado;
            if (estado == 1) {
                console.log(res.data.usuario);
                $scope.perfil_usuario = res.data.usuario;
            } else {
                $ionicLoading.hide(); //Termina de mostrar el "Cargando"
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops',
                    template: 'Usuario no encontrado, por favor vuelve a logearte'
                });
            }
        });
        //$scope.usuario = {};
        //$scope.usuario.nombre = "TABAI PURO WEANDO";
    })
    app.controller('page26Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page27Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page17Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page11Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page13Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page12Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('menuCtrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
        $scope.logout = function() {
            localStorageService.clearAll();
            alert(localStorageService.get('np_usuario'));
        }
    })
    app.filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    })
}());