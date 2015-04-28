describe('Edit movie', function () {
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
                },
                editMovie: function(key, movie){
                    movies[0] = movie;
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
                $routeParams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should fill the edit form with the current information about the movie', function () {
        message = getMovie(RouteParamsMock.key);
        editMovie({
                    desc: 'Outoo',
                    director: 'joku hyvä',
                    name: 'Avatar',
                    year: 2011
                })
        expect(movies[0].desc).toBe('Outoo');
    })

    /* 
     * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to edit a movie by its name, director, release date and description', function () {
        expect(true).toBe(true);
    });

    /*
     * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
     * käyttämällä not.toBeCalled-oletusta.
     */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        expect(true).toBe(false);
    });
});