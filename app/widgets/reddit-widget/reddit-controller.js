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
            RedditService.retrievePostInformation($scope.search).then(function(data) {
                $scope.$evalAsync(function() {
                    searches.push(data.name);
                    widgetService.saveValue('reddit-widget', 'searches', searches);
                    $scope.topics.push(data);
                });
            }).catch(function(error) {
                console.error("ERROR " + error);
            });
            $scope.search = '';
        };
    }]);
