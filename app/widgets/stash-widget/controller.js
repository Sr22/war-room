angular.module('warRoom')

.controller('stashWidgetController', ['$scope', 'stashApiService', function ($scope, stashApiService) {
  $scope.isLoggedIn = false;
  
  $scope.pullRequestsJson = null;
  
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
      $scope.$digest();
    });
  };
}])