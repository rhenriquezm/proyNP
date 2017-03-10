angular.module('app.routes', []).config(function($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider.state('menu.home', {
        url: '/page1',
        cache: false,
        views: {
            'side-menu21': {
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            }
        }
    }).state('menu.page3', {
        url: '/seleccionar',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page3.html',
                controller: 'page3Ctrl'
            }
        }
    }).state('menu.page7', {
        url: '/homebiografias',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page7.html',
                controller: 'page7Ctrl'
            }
        }
    }).state('menu.page8', {
        url: '/crearbiografia',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page8.html',
                controller: 'page8Ctrl'
            }
        }
    }).state('menu.page23', {
        url: '/buscarservicio',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page23.html',
                controller: 'page23Ctrl'
            }
        }
    }).state('menu.page24', {
        url: '/resultadoservicios',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page24.html',
                controller: 'page24Ctrl'
            }
        }
    }).state('menu.page21', {
        url: '/busquedabiografia',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page21.html',
                controller: 'page21Ctrl'
            }
        }
    }).state('menu.page22', {
        url: '/resultadobusqueda',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page22.html',
                controller: 'page22Ctrl'
            }
        }
    }).state('menu.page14', {
        url: '/registrarse',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page14.html',
                controller: 'page14Ctrl'
            }
        }
    }).state('menu.page16', {
        url: '/editarregistro',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page16.html',
                controller: 'page16Ctrl'
            }
        }
    }).state('menu.page18', {
        url: '/olvidecontraseña',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page18.html',
                controller: 'page18Ctrl'
            }
        }
    }).state('menu.page19', {
        url: '/olvidecontraseña2',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page19.html',
                controller: 'page19Ctrl'
            }
        }
    }).state('menu.page20', {
        url: '/condiciones',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page20.html',
                controller: 'page20Ctrl'
            }
        }
    }).state('menu.page9', {
        url: '/editarbiografias',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page9.html',
                controller: 'page9Ctrl'
            }
        }
    }).state('menu.page10', {
        url: '/vistabiografia',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page10.html',
                controller: 'page10Ctrl'
            }
        }
    }).state('menu.page15', {
        url: '/preregistro',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page15.html',
                controller: 'page15Ctrl'
            }
        }
    }).state('menu.page25', {
        cache: false,
        url: '/miperfil',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page25.html',
                controller: 'page25Ctrl'
            }
        }
    }).state('menu.page26', {
        url: '/vercomentarios',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page26.html',
                controller: 'page26Ctrl'
            }
        }
    }).state('menu.page27', {
        url: '/editarcomentarios',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page27.html',
                controller: 'page27Ctrl'
            }
        }
    }).state('menu.page17', {
        url: '/registrado',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page17.html',
                controller: 'page17Ctrl'
            }
        }
    }).state('menu.page11', {
        url: '/verconmemoraciones',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page11.html',
                controller: 'page11Ctrl'
            }
        }
    }).state('menu.page13', {
        url: '/crearconmemoracion',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page13.html',
                controller: 'page13Ctrl'
            }
        }
    }).state('menu.page12', {
        url: '/micirculo',
        views: {
            'side-menu21': {
                templateUrl: 'templates/page12.html',
                controller: 'page12Ctrl'
            }
        }
    }).state('menu', {
        url: '/side-menu21',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
    })
    $urlRouterProvider.otherwise('/side-menu21/page1')
});