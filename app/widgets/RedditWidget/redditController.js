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
        $scope.removeSearch = function(search) {
            console.log("Searches: " + searches);
            for(var a = searches.length - 1; a >- 0; a--) {
                if (searches[a] == search) {
                    console.log("In the first if statement. Index: " + a);
                    $scope.$evalAsync(function() {
                        searches.splice(a, 1);
                        console.log(searches);
                        widgetService.saveValue('RedditWidget', 'searches', searches);
                    });
                }
            }
            /*for(var i = 0; i < $scope.topics.length; i++) {
                if ($scope.topics[i].name == search) {
                    $scope.$evalAsync(function() {
                        $scope.topics.splice(i, 1);
                        console.log($scope.topics);
                    });
                }
            }
            console.log("HERE");*/
        }
    }]);

angular.module("warRoom")
    .directive("redditWidget", function () {
        var directive = {
            templateUrl: "widgets/redditwidget/redditWidgetDesign.html",
            controller: "rController"
        };
        return directive;
    });

function lowerCaseFirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}