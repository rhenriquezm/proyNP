(function() {
    var app = angular.module('app.controllers', [''])
    app.factory("loginFactory", function() {
        return {
            data: {}
        };
    })
    app.controller('homeCtrl', function($scope, $stateParams, loginFactory, $http, $ionicPopup, $state, $ionicLoading) {
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
                        loginFactory.data.nombres = res.data.usuario.nombres;
                        loginFactory.data.ap_paterno = res.data.usuario.ap_paterno;
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
    app.controller('page3Ctrl', function($scope, $stateParams, loginFactory) {
        $scope.np_usuario = loginFactory.data;
    });
    app.controller('page7Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page8Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page23Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page24Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page21Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page22Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page14Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page16Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page18Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page19Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page20Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page9Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page10Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page15Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page25Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page26Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page27Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page17Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page11Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page13Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('page12Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page'sapp.controller. See https://docs.angularjs.org/guideapp.controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {}
    ])
    app.filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    })
}());