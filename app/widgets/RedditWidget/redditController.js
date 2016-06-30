/**
 * Created by davisjac on 6/29/2016.
 */
angular.module("warRoom")
    .controller('rController', ['$scope', 'RedditGetService', function($scope, RedditGetService) {
        $scope.search = [{ title: ''}];
        $scope.posts = [{
            title: '',
            postURL: ''
        }];
        $scope.submit = function(rSearch) {
            $scope.search = $scope.search + rSearch;
            $scope.posts = $scope.posts + RedditGetService.retrievePostInfo(rSearch);
        };
    }]);

angular.module("warRoom")
    .directive("redditWidget", function () {
        var directive = {
            templateUrl: "widgets/redditwidget/redditWidgetDesign.html"
        };
        return directive;
    });
