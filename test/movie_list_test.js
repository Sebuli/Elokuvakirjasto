describe('Movie list', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MovieApp');

        FirebaseServiceMock = (function () {
            var movies = [
                {
                    desc: 'hieno leffa',
                    director: 'joku hyvä',
                    name: 'Avatar',
                    year: 2011
                },
                {
                    desc: 'hieno huono',
                    director: 'joku kakka',
                    name: 'Troll 2',
                    year: 2008
                }
            ];
            return {
                addMovie: function (movie) {
                    movies.push(movie);
                },
                removeMovie: function (movie) {
                    for (var i in movies) {
                        if (movies[i].desc === movie.desc &&
                                movies[i].director === movie.director && 
                                movies[i].name === movie.name &&
                                movies[i].year === movie.year) {
                            movies.pop(movies[i]);
                        }
                    }
                },
                getMovies: function () {
                    return movies;
                }

            }
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('movieAddController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should list all movies from the Firebase', function () {
        expect(scope.movies.length).toBe(2);
    });

    /* 
     * Testaa, että elokuvan pystyy poistamaan Firebasesta.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to remove a movie', function () {
        var movie = scope.movies[0];
        scope.removeMovie(movie);
        expect(scope.movies.length).toBe(1);
        expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
    });
});