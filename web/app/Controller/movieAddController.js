MovieApp.controller('movieAddController', function ($scope, FirebaseService, $location, $routeParams) {

    $scope.movies = FirebaseService.getMovies();

    $scope.addMovies = function () {
        if ($scope.newName !== '' &&
                $scope.newDirector !== '' &&
                $scope.newYear !== '' &&
                $scope.newDesc !== '') {
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
        }
    };

    $scope.removeMovie = function (index) {
        FirebaseService.removeMovie(index);
    };

    $scope.setMovies = function (movies) {
        $scope.movies = movies;
    };

    $scope.changeMovie = function (movie) {

        
        if ($scope.editName) {
            movie.name = $scope.editName;
        } 
        
        if ($scope.editYear && $scope.editYear > 1000) {
            movie.year = $scope.editYear;
        } 
        
        if ($scope.editDesc) {
            movie.desc = $scope.editDesc;
        } 
        if ($scope.editDirector) {
            movie.director = $scope.editDirector;
        } 
        
        FirebaseService.changeMovie(movie);
        $location.path('/movies');
    };

    $scope.getMovie = function () {
        console.log($location);
        console.log($routeParams);
        $scope.nykyinen = $scope.movies[$routeParams.movieid.toLowerCase()];

    };


    $scope.nykyinen = FirebaseService.getMovie($routeParams.movieid);



});