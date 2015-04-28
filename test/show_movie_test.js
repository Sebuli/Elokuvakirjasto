describe('Show movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyAwesomeModule');

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
                },
                getMovie: function (key) {
                    if (key == 'abc123') {
                        return movies[0];
                    } else{
                        return null;
                    }
                }

            }
        })();

        RouteParamsMock = (function () {
            return {
                key: 'abc123'
            }
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('MyAwesomeController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routePrams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /* 
     * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
     * käyttämällä toBeCalled-oletusta.
     */
    it('should show current movie from Firebase', function () {
        elokuva = getMovie(RouteParamsMock.key);
        expect(elokuva).toBe(true);
    });
});