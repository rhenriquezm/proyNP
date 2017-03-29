(function() {
    var app = angular.module('app.controllers', ['LocalStorageModule', 'ngMessages'])
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
    app.controller('page23Ctrl', function($scope, $stateParams, localStorageService, $http, loginFactory, $state) {
        $scope.np_usuario = localStorageService.get('np_usuario');
        var servicios = [{
            "id": "funerarias",
            "nom_ser": "Funeraria"
        }, {
            "id": "floreria",
            "nom_ser": "Floreria"
        }, {
            "id": "seguro",
            "nom_ser": "Seguros"
        }];
        $scope.servicios = servicios;
        $scope.servicio = "funerarias";
        $scope.ciudad = "295";
        mostrarCiudades();

        function mostrarCiudades() {
            $http.get("http://localhost/proyNP/apiNP/np_servicios/ciudades").then(function(res) {
                $scope.ciudades = res.data.ciudades;
            })
        }
        $scope.buscar = function(ciudadServ) {
            alert($scope.servicio + " " + ciudadServ);
            $http.post("http://localhost/proyNP/apiNP/np_servicios/busqueda", {
                "id": $scope.servicio,
                "ciudad": ciudadServ
            }).then(function(res) {
                loginFactory.data = {};
                if (res.data.estado == 1) {
                    //loginFactory.data.mensaje = "exito";
                    loginFactory.data.servicios = res.data.servicios
                    $state.go("menu.page24");
                    //console.log(res.data.servicios);
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Lo sentimos',
                        template: 'No se encontraron resultados para esa ciudad'
                    });
                    //loginFactory.data.mensaje = "No se encontraron Resultados";
                    //console.log("No se encontraron Resultados");
                }
            })
        }
    })
    app.controller('page24Ctrl', function($scope, $stateParams, localStorageService, loginFactory) {
        $scope.np_usuario = localStorageService.get('np_usuario');
        $scope.servicios = loginFactory.data.servicios;
    })
    app.controller('page21Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page22Ctrl', function($scope, $stateParams, localStorageService) {
        $scope.np_usuario = localStorageService.get('np_usuario');
    })
    app.controller('page14Ctrl', function($scope, $http, $stateParams, localStorageService, $ionicHistory, $state, loginFactory, $filter) {
        $scope.nuevoUsuario = {};
        $scope.hoy = $filter('date')(new Date(), 'yyyy-MM-dd');
        $scope.nuevoUsuario.fec_registro = $scope.hoy;
        $scope.nuevoUsuario.idConvenio = 1;
        $scope.claveConfirm = null;
        $scope.sexos = [{
            "id": "M",
            "nombre": "Masculino"
        }, {
            "id": "F",
            "nombre": "Femenino"
        }];
        ///// Pais y Region 
        $scope.JSONPaises = {};
        $scope.JSONRegiones = {};
        obtenerPaises();
        $scope.mostrarRegiones = function(selPaises) {
            // $scope.selPaises NOS TRAE EL VALOR DEL SELECT DE paises
            obtenerRegiones(selPaises);
        };

        function obtenerRegiones(idPais) {
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
        //////////////
        $scope.registrar = function() {
            console.log($scope.nuevoUsuario.fec_nacimiento);
            loginFactory.data.usuario = $scope.nuevoUsuario;
            $ionicHistory.clearCache().then(function() {
                $state.go("menu.page28");
            });
        }
    })
    app.controller('page16Ctrl', function($scope, $stateParams, localStorageService, $state, loginFactory, $http, $ionicHistory, $filter) {
        $scope.np_usuario = localStorageService.get('np_usuario');
        $scope.hoy = $filter('date')(new Date(), 'yyyy-MM-dd');
        //Sexo
        $scope.sizeLimit = 10585760; // 10MB in Bytes
        $scope.uploadProgress = 0;
        $scope.creds = {};

        function upload(file) {
            AWS.config.update({
                accessKeyId: "AKIAJCFGX4TXMKJOMHMQ",
                secretAccessKey: "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"
            });
            AWS.config.region = 'us-west-2';
            var bucket = new AWS.S3({
                params: {
                    Bucket: "nplace-movil"
                }
            });
            if (file) {
                // Perform File Size Check First
                var fileSize = Math.round(parseInt(file.size));
                if (fileSize > $scope.sizeLimit) {
                    console.log('Sorry, your attachment is too big. <br/> Maximum ' + $scope.fileSizeLabel() + ' file attachment allowed', 'File Too Large');
                    return false;
                }
                // Prepend Unique String To Prevent Overwrites
                var uniqueFileName = $scope.uniqueString() + '-' + file.name;
                $scope.datosUsuario.url_avatar = "https://s3-us-west-2.amazonaws.com/nplace-movil/" + uniqueFileName;
                var params = {
                    Key: uniqueFileName,
                    ContentType: file.type,
                    Body: file,
                    ServerSideEncryption: 'AES256',
                    ACL: 'public-read'
                };
                bucket.putObject(params, function(err, data) {
                    if (err) {
                        console.log(err.message, err.code);
                        return false;
                    } else {
                        setTimeout(function() {
                            $scope.uploadProgress = 0;
                            $scope.$digest();
                        }, 4000);
                    }
                }).on('httpUploadProgress', function(progress) {
                    $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                    $scope.$digest();
                });
            } else {
                // No File Selected
                console.log('Please select a file to upload');
            }
        }
        $scope.fileSizeLabel = function() {
            // Convert Bytes To MB
            return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
        };
        $scope.uniqueString = function() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 8; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
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
        function cargarDatos() {
            datosUsuarios.fec_nacimiento = new Date(localStorageService.get('nuevoUsuario').fec_nacimiento);
            $scope.datosUsuario = datosUsuarios;
            $scope.datosH = datosHistoricos;
            $scope.datosUsuario.clave = null;
            $scope.claveConfirm = null;
            $scope.data = {};
        }
        cargarDatos();
        /** function compararClave() {
            if ($scope.claveConfirm == $scope.datosUsuario.clave) {
                return true;
            } else {
                alert("Contraseñas no coinciden");
                $scope.datosUsuario.clave = null;
                $scope.claveConfirm = null;
                return false;
            }
        }
        **/
        $scope.cambio = true;
        $scope.$watchCollection("datosUsuario", function(newCollection, oldCollection) {
            $scope.nocambios = "";
            if (newCollection.nombres != datosHistoricos.nombres || newCollection.ap_paterno != datosHistoricos.ap_paterno || newCollection.ap_materno != datosHistoricos.ap_materno || newCollection.idPais != datosHistoricos.idPais || newCollection.idRegion != datosHistoricos.idRegion || newCollection.nro_documento_identif != datosHistoricos.nro_documento_identif || newCollection.sexo != datosHistoricos.sexo || newCollection.clave !== null) {
                $scope.cambio = false;
            } else {
                $scope.cambio = true;
            }
        });
        $scope.actualizar = function() {
            upload($scope.data.imagen);
            datosHistoricos.fec_nacimiento = new Date(datosHistoricos.fec_nacimiento);
            if (!$scope.cambio) {
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
                loginFactory.data.url_avatar = $scope.datosUsuario.url_avatar;
                $ionicHistory.clearCache().then(function() {
                    $state.go("menu.page15");
                });
            } else {
                $scope.nocambios = "No realizaste cambios en tu perfil";
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
                'clave': usuarioModificado.clave,
                'url_avatar': usuarioModificado.url_avatar
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
    app.controller('page28Ctrl', function($ionicHistory, $scope, $stateParams, localStorageService, loginFactory, $http, $state, $ionicLoading, $location, $ionicPopup) {
        var usuarioModificado = loginFactory.data.usuario;
        $scope.usuarioModificado = loginFactory.data.usuario;
        console.log(usuarioModificado);
        $scope.confirmar = function() {
            $http.put("http://localhost/proyNP/apiNP/np_usuario/registro", {
                'email': usuarioModificado.email,
                'nombres': usuarioModificado.nombres,
                'ap_paterno': usuarioModificado.ap_paterno,
                'ap_materno': usuarioModificado.ap_materno,
                'sexo': usuarioModificado.sexo,
                'idPais': usuarioModificado.idPais,
                'idRegion': usuarioModificado.idRegion,
                'clave': usuarioModificado.clave,
                'idConvenio': usuarioModificado.idConvenio
            }).then(function(res) {
                var estado = res.data.estado;
                if (estado == 1) {
                    $state.go("menu.home")
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
    app.directive('file', function() {
        return {
            restrict: 'AE',
            scope: {
                file: '@'
            },
            link: function(scope, el, attrs) {
                el.bind('change', function(event) {
                    var files = event.target.files;
                    var file = files[0];
                    scope.file = file;
                    scope.$parent.file = file;
                    scope.$apply();
                });
            }
        };
    })
    app.directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
}());