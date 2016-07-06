/**
 * Created by davisjac on 6/29/2016.
 */
angular.module("warRoom")
    .controller('rController', ['$scope', 'redditService', function($scope, RedditService) {
        $scope.search;
        $scope.topics = [];
        $scope.submit = function() {
            RedditService.retrievePostInformation($scope.search).then(function(data) {
                $scope.$evalAsync(function() {
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
