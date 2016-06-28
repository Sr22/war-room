angular.module("warRoom")
    .controller("myAngularController2", ["$scope", function($scope) {
      $scope.message = "Angular put me here as well!";
    }]);

function clickedOnMe() {
  alert("You clicked on me!");
}