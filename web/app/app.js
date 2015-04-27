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
            .otherwise({
                redirectTo: '/'
            });
});

