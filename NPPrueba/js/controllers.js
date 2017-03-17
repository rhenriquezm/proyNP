(function() {
    var app = angular.module('app.controllers', ['LocalStorageModule'])
    app.directive('match', function($parse) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    return $parse(attrs.match)(scope) === ctrl.$modelValue;
                }, function(currentValue) {
                    ctrl.$setValidity('mismatch', currentValue);
                });
            }
        };
    });
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
    app.controller('page14Ctrl', function($scope, $stateParams, localStorageService, $ionicHistory, $state) {
        if (localStorageService.get('np_usuario') != null) {
            $scope.np_usuario = localStorageService.get('np_usuario');
        } else {
            $ionicHistory.clearCache().then(function() {
                $state.go("menu.home");
            });
        }
    })
    app.controller('page16Ctrl', function($scope, $stateParams, localStorageService, $state, loginFactory, $http, $ionicHistory) {
        $scope.np_usuario = localStorageService.get('np_usuario');
        //Sexo
        $scope.sexos = [{
            "id": "M",
            "nombre": "Masculino"
        }, {
            "id": "F",
            "nombre": "Femenino"
        }];
        var datosUsuarios = localStorageService.get('nuevoUsuario');
        var datosHistoricos = localStorageService.get('nuevoUsuario');
        //if (datosUsuarios.sexo == 'M') {
        //    datosUsuarios.sexo = $scope.sexos[0];
        //} else {
        //   datosUsuarios.sexo = $scope.sexos[1];
        //}
        //Pais y Region 
        $scope.JSONPaises = {};
        $scope.JSONRegiones = {};
        obtenerPaises();
        obtenerRegiones(datosUsuarios.idPais);
        // EVENTO QUE GENERA LA DIRECTIVA ng-change
        $scope.mostrarRegiones = function(selPaises) {
            // $scope.selPaises NOS TRAE EL VALOR DEL SELECT DE CATEGORIAS
            obtenerRegiones(selPaises);
        };

        function obtenerRegiones(idPais) {
            //console.log(idPais);
            $http.post('http://localhost/proyNP/apiNP/REG_POR_PAIS/obtenerRegiones', {
                "id": idPais
            }).then(function(res) {
                $scope.JSONRegiones = res.data.regiones;
            });
        }

        function obtenerPaises() {
            $http.get('http://localhost/proyNP/apiNP/REG_POR_PAIS/obtenerPaises').
            then(function(res) {
                $scope.JSONPaises = res.data.paises;
            });
        }
        //Fecha de Nacimiento
        datosUsuarios.fec_nacimiento = new Date(localStorageService.get('nuevoUsuario').fec_nacimiento);
        $scope.datosUsuario = datosUsuarios;
        $scope.datosUsuario.clave = null;
        $scope.claveConfirm = null;

        function compararObj() {
            if ($scope.datosUsuario.nombres != datosHistoricos.nombres || $scope.datosUsuario.ap_paterno != datosHistoricos.ap_paterno || $scope.datosUsuario.ap_materno != datosHistoricos.ap_materno || ($scope.datosUsuario.fec_nacimiento - datosHistoricos.fec_nacimiento) != 0 || $scope.datosUsuario.idPais != datosHistoricos.idPais || $scope.datosUsuario.idRegion != datosHistoricos.idRegion || $scope.datosUsuario.nro_documento_identif != datosHistoricos.nro_documento_identif || $scope.datosUsuario.sexo != datosHistoricos.sexo || $scope.datosUsuario.clave != null) {
                return true;
            } else {
                return false;
            }
        }
        $scope.actualizar = function() {
            datosHistoricos.fec_nacimiento = new Date(datosHistoricos.fec_nacimiento);
            if (compararObj()) {
                loginFactory.data = {};
                loginFactory.data.id = localStorageService.get('np_usuario').id;
                loginFactory.data.nombres = $scope.datosUsuario.nombres;
                loginFactory.data.ap_paterno = $scope.datosUsuario.ap_paterno;
                loginFactory.data.ap_materno = $scope.datosUsuario.ap_materno;
                loginFactory.data.sexo = $scope.datosUsuario.sexo;
                loginFactory.data.nro_documento_identif = $scope.datosUsuario.nro_documento_identif;
                loginFactory.data.idPais = $scope.datosUsuario.idPais;
                loginFactory.data.idRegion = $scope.datosUsuario.idRegion;
                loginFactory.data.clave = $scope.datosUsuario.clave;
                $ionicHistory.clearCache().then(function() {
                    $state.go("menu.page15");
                });
            } else {
                alert("NO CAMBIASTE NADA");
            }
        }
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
    app.controller('page15Ctrl', function($ionicHistory, $scope, $stateParams, localStorageService, loginFactory, $http, $state, $ionicLoading, $location, $ionicPopup) {
        $scope.np_usuario = localStorageService.get('np_usuario');
        var usuarioModificado = loginFactory.data;
        $scope.usuarioModificado = loginFactory.data;
        $scope.confirmar = function() {
            $http.put("http://localhost/proyNP/apiNP/np_usuario/actualizarUsuario", {
                'id': usuarioModificado.id,
                'nombres': usuarioModificado.nombres,
                'ap_paterno': usuarioModificado.ap_paterno,
                'ap_materno': usuarioModificado.ap_materno,
                'sexo': usuarioModificado.sexo,
                'nro_documento_identif': usuarioModificado.nro_documento_identif,
                'idPais': usuarioModificado.idPais,
                'idRegion': usuarioModificado.idRegion,
                'clave': usuarioModificado.clave
            }).then(function(res) {
                var estado = res.data.estado;
                if (estado == 1) {
                    $state.go("menu.page25")
                    //localStorageService.set("apellido", res.data.usuario.ap_paterno);
                    //loginFactory.data.nombres = localStorageService.get('nombre');
                    //loginFactory.data.ap_paterno = localStorageService.get('apellido');
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Oops',
                        template: 'No se pudo guardar'
                    });
                }
            });
        }
        $scope.modificarPerfil = function() {
            //$ionicHistory.clearCache().then(function() {
            $state.go("menu.page16");
            // });
        }
    })
    app.controller('page25Ctrl', function($scope, $stateParams, localStorageService, $http, $ionicLoading, $ionicPopup, $state, $location, $ionicHistory) {
        $scope.np_usuario = localStorageService.get('np_usuario');
        $scope.perfil_usuario = {};
        var nuevoUsuario = {};
        localStorageService.set('nuevoUsuario', nuevoUsuario);
        $http.post("http://localhost/proyNP/apiNP/np_usuario/usuario", {
            'id': localStorageService.get("np_usuario").id
        }).then(function(res) {
            var estado = res.data.estado;
            if (estado == 1) {
                localStorageService.set('nuevoUsuario', res.data.usuario);
                $scope.perfil_usuario = res.data.usuario;
            } else {
                $ionicLoading.hide(); //Termina de mostrar el "Cargando"
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops',
                    template: 'Usuario no encontrado, por favor vuelve a logearte'
                });
            }
        });
        $scope.modificarPerfil = function() {
            $ionicHistory.clearCache().then(function() {
                $state.go("menu.page16");
            });
        }
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
    app.controller('menuCtrl', function($scope, $stateParams, localStorageService, $ionicHistory, $state) {
        $scope.np_usuario = localStorageService.get('np_usuario');
        $scope.logout = function() {
            localStorageService.clearAll();
            $ionicHistory.clearCache().then(function() {
                $state.go("menu.home");
            });
        }
        $scope.editarReg = function() {
            $ionicHistory.clearCache().then(function() {
                $state.go("menu.page25");
            });
        }
    })
    app.filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    })
}());