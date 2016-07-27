/**
 * Created by davisjac on 6/29/2016.
 */
angular.module("warRoom")
    .controller('redditController', ['$scope', 'redditService', 'widgetService', function($scope, RedditService, widgetService) {
        $scope.search;
        var searches = widgetService.loadValue('reddit-widget', 'searches') || [];
        $scope.topics = [];
        var i = searches.length;
        for (var a = 0; a < i; a++) {
            RedditService.retrievePostInformation(searches[a]).then(function(data) {
                $scope.$evalAsync(function() {
                    $scope.topics.push(data);
                });
            });
        }
        $scope.submit = function() {
            var search = $scope.search;
            if (searches.indexOf(search) != -1) {
                duplicate_alert();
            } else {
                RedditService.retrievePostInformation(search).then(function(data) {
                    $scope.$evalAsync(function() {
                        searches.push(search);
                        widgetService.saveValue('reddit-widget', 'searches', searches);
                        $scope.topics.push(data);
                    });
                }).catch(function(error) {
                    console.error("ERROR " + JSON.stringify(error));
                    error_alert();
                });
            }
            $scope.search = '';
        };
        $scope.removeSearch = function(search) {
            for (var i = $scope.topics.length - 1; i >= 0; i--) {
                if (search == $scope.topics[i].name) {
                    $scope.topics.splice(i, 1);
                }
            }
            for (var a = searches.length - 1; a >= 0; a--) {
                if (search == searches[a]) {
                    searches.splice(a, 1);
                    widgetService.saveValue('reddit-widget', 'searches', searches);
                }
            }
        };
        $scope.redirectToSite = function(name) {
            window.location = "http://www.reddit.com/r/" + name;
        };
    }]);

error_alert = function() {
    $('#searchError').html('<div class="alert alert-danger fade in"><a class="close" data-dismiss="alert"></a><span><strong>Error!</strong> The search you made is not a subreddit</span></div>');
    $('#searchError').fadeTo(2000, 500).slideUp(500, function() {
        $('#searchError').alert('close');
    });
};

duplicate_alert = function() {
    $('#duplicateError').html('<div class="alert alert-warning fade in"><a class="close" data-dismiss="alert"></a><span><strong>Sorry!</strong> The search you made is already in your recent searches</span></div>');
    $('#duplicateError').fadeTo(2000, 500).slideUp(500, function() {
        $('#duplicateError').alert('close');
    });
};