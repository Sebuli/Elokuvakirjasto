MovieApp.controller('movieAddController', function ($scope, FirebaseService, $location) {

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


});