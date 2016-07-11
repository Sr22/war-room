/**
 * Created by davisjac on 6/29/2016.
 */
angular.module("warRoom")
    .controller('rController', ['$scope', 'redditService', 'widgetService', function($scope, RedditService, widgetService) {
        $scope.search;
        var searches = widgetService.loadValue('RedditWidget', 'searches') || [];
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
                    console.log(data.name);
                    widgetService.saveValue('RedditWidget', 'searches', searches);
                    $scope.topics.push(data);
                });
            }).catch(function(error) {
                console.log('caught it -', error)
            });
            $scope.search = '';
        };
    }]);

angular.module("warRoom")
    .directive("redditWidget", function () {
        var directive = {
            templateUrl: "widgets/redditwidget/redditWidgetDesign.html",
            controller: "rController"
        };
        return directive;
    });