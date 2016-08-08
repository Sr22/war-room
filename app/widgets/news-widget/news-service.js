angular.module('warRoom')

    .service('newsService', ['$resource', function ($resource) {
        return {
            getAllNews: function (callback) {
                $resource('https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=1e6a60b2d3c8478cadcba75fc83040e0').get({
                    }, function (response) {
                        allData = response.articles;
                        if (callback) {
                            callback(allData);
                        }


                    }
                )
            }
        }
    }]);