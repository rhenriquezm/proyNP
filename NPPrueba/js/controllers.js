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
            alert($scope.np_usuario.email + " " + $scope.np_usuario.clave);
            if ($scope.np_usuario.email != '' && $scope.np_usuario.clave != '') {
                $http.post("http://localhost/proyNP/apiNP/np_usuario/login", {
                    'email': $scope.np_usuario.email,
                    'clave': $scope.np_usuario.clave
                }).then(function(res) {
                    var estado = res.data.estado;
                    console.log(estado);
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
        var datosUsuario = localStorageService.get('nuevoUsuario');
        console.log(datosUsuario)
        if (datosUsuario.sexo == 'M') {
            datosUsuario.sexo = $scope.sexos[0];
        } else {
            datosUsuario.sexo = $scope.sexos[1];
        }
        //Pais y Region 
        $scope.JSONPaises = {};
        $scope.JSONRegiones = {};
        obtenerPaises();
        obtenerRegiones(datosUsuario.idPais);
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
        datosUsuario.fec_nacimiento = new Date(localStorageService.get('nuevoUsuario').fec_nacimiento);
        $scope.datosUsuario = datosUsuario;
        var passActual = $scope.datosUsuario.clave;
        $scope.datosUsuario.clave = "";
        $scope.actualizar = function() {
            loginFactory.data = {};
            loginFactory.data.id = localStorageService.get('np_usuario').id;
            loginFactory.data.nombres = $scope.datosUsuario.nombres;
            loginFactory.data.ap_paterno = $scope.datosUsuario.ap_paterno;
            loginFactory.data.ap_materno = $scope.datosUsuario.ap_materno;
            loginFactory.data.sexo = $scope.datosUsuario.sexo.id;
            loginFactory.data.nro_documento_identif = $scope.datosUsuario.nro_documento_identif;
            loginFactory.data.idPais = $scope.datosUsuario.idPais;
            loginFactory.data.idRegion = $scope.datosUsuario.idRegion;
            if ($scope.datosUsuario.clave == "") {
                loginFactory.data.clave = passActual;
            } else {
                loginFactory.data.clave = $scope.datosUsuario.clave;
            }
            $ionicHistory.clearCache().then(function() {
                $state.go("menu.page15");
            });
        }
    }) app.controller('page18Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('page19Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('page20Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('page9Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('page10Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('page15Ctrl', function($scope, $stateParams, localStorageService, loginFactory, $http, $state, $ionicLoading, $location, $ionicPopup) {
        $scope.np_usuario = localStorageService.get('np_usuario');
        var usuarioModificado = loginFactory.data;
        alert("MENSAJE: " + usuarioModificado.id);
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
            alert(estado);
            if (estado == 1) {
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
    }) app.controller('page25Ctrl', function($scope, $stateParams, localStorageService, $http, $ionicLoading, $ionicPopup, $state, $location) {
        //$scope.np_usuario = localStorageService.get('np_usuario');
        //alert(localStorageService.get("np_usuario").id);
        $scope.perfil_usuario = {};
        var nuevoUsuario = {};
        localStorageService.set('nuevoUsuario', nuevoUsuario);
        $http.post("http://localhost/proyNP/apiNP/np_usuario/usuario", {
            'id': localStorageService.get("np_usuario").id
        }).then(function(res) {
            var estado = res.data.estado;
            if (estado == 1) {
                console.log(res.data.usuario);
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
        //$scope.usuario = {};
        //$scope.usuario.nombre = "TABAI PURO WEANDO";
    }) app.controller('page26Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('page27Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('page17Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('page11Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('page13Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('page12Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    }) app.controller('menuCtrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
        $scope.logout = function() {
            localStorageService.clearAll();
            alert(localStorageService.get('np_usuario'));
        }
    }) app.filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    })
}());