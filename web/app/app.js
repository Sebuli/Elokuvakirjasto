var MovieApp = angular
        .module('MovieApp', ['ngRoute', 'firebase'])
        .config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'movieAddController',
                template: '<form name="movieForm"><input type="text" placeholder="Elokuvan nimi" ng-model="newName" required><input type="text" placeholder="Elokuvan ohjaaja" ng-model="newDirector" required><input type="text" placeholder="Elokuvan kuvausvuosi" ng-model="newYear" required><input type="text" placeholder="Elokuvan kuvaus" ng-model="newDesc" required><input type = "submit" value="Lisää elokuva" ng-click="addMovies()" ng-disabled="movieForm.$invalid"></form>'
            })
            .when('/movies', {
                controller: 'movieAddController',
                template: '<form name="movieForm"><input type="text" placeholder="Elokuvan nimi" ng-model="newName" required><input type="text" placeholder="Elokuvan ohjaaja" ng-model="newDirector" required><input type="text" placeholder="Elokuvan kuvausvuosi" ng-model="newYear" required><input type="text" placeholder="Elokuvan kuvaus" ng-model="newDesc" required><input type = "submit" value="Lisää elokuva" ng-click="addMovies()" ng-disabled="movieForm.$invalid"></form><li ng-repeat="movie in movies", style="list-style: none"><h1>{{movie.name}} ({{movie.year}})</h1><p>{{movie.desc}}</p><b>Director</b><p>{{movie.director}}</p></li>'
            })
            .when('/movies/new', {
                controller: 'movieAddController',
                template: '<form name="movieForm"><input type="text" placeholder="Elokuvan nimi" ng-model="newName" required><input type="text" placeholder="Elokuvan ohjaaja" ng-model="newDirector" required><input type="text" placeholder="Elokuvan kuvausvuosi" ng-model="newYear" required><input type="text" placeholder="Elokuvan kuvaus" ng-model="newDesc" required><input type = "submit" value="Lisää elokuva" ng-click="addMovies()" ng-disabled="movieForm.$invalid"></form>'
            })
            .otherwise({
                redirectTo: '/'
            });
});

MovieApp.controller('movieAddController', function ($scope, FirebaseService, $location) {
    
    $scope.movies = FirebaseService.getMovies();
    
    $scope.addMovies = function () {
        FirebaseService.addMovie({
            name: $scope.newName,
            director: $scope.newDirector,
            year: $scope.newYear,
            desc: $scope.newDesc
        });

        $scope.newName = '';
        $scope.newDirector = '';
        $scope.newYear = '';
        $scope.newDesc = '';
        $location.path('/movies');
    };
});

MovieApp.controller('movieListController', function ($scope, FirebaseService) {
    
});