/**
 * Created by hank on 7/29/2016.
 */
angular.module('warRoom')

    .service('espnService', ['$resource', function ($resource) {
        return {
            getSportsNews: function (callback) {
                $resource('https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=1e6a60b2d3c8478cadcba75fc83040e0').get({
                    }, function (response) {
                        allSportsData = response.articles;
                        if (callback) {
                            callback(allSportsData);
                        }


                    }
                )
            }
        }
    }]);