/**
 * Created by davisjac on 6/29/2016.
 */
angular.module("warRoom")
    .service("redditService", [ '$http', '$q', function($http, $q) {
    return {
        retrievePostInformation: function(redditSearch) {
            var defer = $q.defer();
            return $http.get("http://www.reddit.com/r/" + redditSearch + "/top/.json?limit=3").then(function onSuccess(response) {
                console.log('SUCCESS');
                var tempTopic = {
                    name: redditSearch,
                    posts: [{
                            title: response.data.data.children[0].data.title,
                            postUrl: response.data.data.children[0].data.url
                        },
                        {
                            title: response.data.data.children[1].data.title,
                            postUrl: response.data.data.children[1].data.url
                        },
                        {
                            title: response.data.data.children[2].data.title,
                            postUrl: response.data.data.children[2].data.url
                        }
                    ]
                };
                defer.resolve(tempTopic);
                console.log(defer)
                return defer.promise;
            }, function onError(response) {
                console.log('ERROR');
                defer.reject(response);
                return defer.promise;
            })
        }
    }
}])