var MovieApp = angular
        .module('MovieApp', ['ngRoute', 'firebase'])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/', {
                        controller: 'movieAddController',
                        templateUrl: 'app/view/lisays.html'
                    })
                    .when('/movies', {
                        controller: 'movieAddController',
                        templateUrl: 'app/view/lista.html'
                    })
                    .when('/movies/new', {
                        controller: 'movieAddController',
                        templateUrl: 'app/view/lisays.html'
                    })
                    .when('/movies/:movieid', {
                        controller: 'movieAddController',
                        templateUrl: 'app/view/elokuva.html'
                    })
                    .when('/movies/:movieid/edit', {
                        controller: 'movieAddController',
                        templateUrl: 'app/view/editoi.html'
                    })
                    .when('/haku', {
                        controller: 'movieAddController',
                        templateUrl: 'app/view/haku.html'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });


        }).config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }]);

