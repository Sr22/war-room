angular.module("warRoom")
    .controller("myAngularController", ["$scope", function($scope) {
      $scope.message = "Angular put me here!";
    }]);

function clickedOnMe() {
  alert("You clicked on me!");
}
