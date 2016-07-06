angular.module('warRoom')

.controller('stashWidgetController', ['$scope', 'stashApiService', function ($scope, stashApiService) {
  $scope.isLoggedIn = false;
  
  $scope.isShowingPullRequests = false;
  
  $scope.pullRequestsJson = null;
  
  $scope.lastUpdatedString = function (lastUpdated) {
    if (!Date.now) { Date.now = function() { return new Date().getTime(); } }
    var dt = Math.floor(Date.now() / 1000) - Math.floor(lastUpdated / 1000);
    if (dt < 0) return "in the future";
    else if (dt < 120) return "just now";
    else if (dt < 3600) return "1 hour ago";
    else if (dt < 86400) return "" + Math.floor(dt / 3600) + " hours ago";
    else if (dt < 86400*2-1) return "1 day ago";
    else return "" + Math.floor(dt / 86400) + " days ago";
  };
  
  $scope.login = function (username, password) {
    if (stashApiService.setCredentials(username, password)) {
      $scope.isLoggedIn = true;
    } else {
      // handle fail
    }
  }
  
  $scope.updatePullRequestsJson = function (type, group, name) {
    return stashApiService.getPullRequests(type, group, name, function (data) {
      $scope.pullRequestsJson = data;
      $scope.isShowingPullRequests = true;
      //$scope.$digest();
    });
  };
}]);