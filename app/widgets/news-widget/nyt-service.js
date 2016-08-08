angular.module('warRoom')

    .service('nytService', ['$resource', function ($resource) {
        return {
            getnytNews: function (section, callback) {
                $resource('http://api.nytimes.com/svc/topstories/v1/:section.json?api-key=d60b0871560c4805a6ce5a7c571be4d1').get({
                        section: section
                    }, function(response) {
                        allDataNyt = response.results;
                        if (callback) {
                            callback(allDataNyt);
                        }
                        
                    }
                )
            }
        }
    }]);

/*
angular.module('warRoom')

    .service('nytService', ['$resource', function ($resource) {
        return {
            getnytNews: function (callback) {
                $resource('https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=1e6a60b2d3c8478cadcba75fc83040e0').get({
                    }, function(response) {
                        allDataNyt = response.articles
                        if (callback) {
                            callback(allDataNyt);
                        }

                    }
                )
            }
        }
    }]);
*/
