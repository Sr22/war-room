angular.module("warRoom")
    .controller("myAngularController", ["$scope", function($scope) {
      $scope.message = "Angular put me here as well!";
    }]);

function clickedOnMe() {
  alert("You clicked on me!");
}
