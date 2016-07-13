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
                $scope.$evalAsync(function() {$scope.topics.push(data);});
            });
        }$scope.submit = function() {
            RedditService.retrievePostInformation($scope.search).then(function(data) { $scope.$evalAsync(function() {
                    searches.push(data.name);
                    widgetService.saveValue('reddit-widget', 'searches', searches);
                    $scope.topics.push(data);
                });
            }).catch(function(error) {console.error("ERROR " + JSON.stringify(error));});
            $scope.search = ''; };
        $scope.removeSearch = function(search) { for(var i = $scope.topics.length - 1; i >= 0; i--) {
                if(search == $scope.topics[i].name) {
                    $scope.topics.splice(i, 1);
                }} for(var a = searches.length - 1; a >= 0; a--) { if(search == searches[a]) {
                    searches.splice(a, 1);
                    widgetService.saveValue('reddit-widget', 'searches', searches);
                }}};}]);
