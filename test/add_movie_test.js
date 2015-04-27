describe('Add movie', function () {
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
                    var m = [];
                    for (var i in movies) {
                        if (movies[i].desc != movie.desc) {
                            m.push(movies[i]);
                        }
                    }
                    movies = m;

                },
                getMovies: function () {
                    return movies;
                }

            }
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();

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
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {
        scope.newName = 'Lol';
        scope.newDirector = 'Hey';
        scope.newYear = '1992';
        scope.newDesc = 'Khyl';
        scope.addMovies();
        expect(scope.movies.length).toBe(3);
    });

    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        scope.newName = '';
        scope.newDirector = '';
        scope.newYear = '';
        scope.newDesc = '';
        scope.addMovies();
        expect(scope.movies.length).toBe(2);
    });
});