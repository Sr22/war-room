angular.module("warRoom")
    .controller("myAngularController2", ["$scope", function($scope) {
      $scope.message = "Angular put me here as well!";
    }]);
    
angular.module("warRoom")
    .directive("myWidgetTwo", function () {
      var directive = {
        templateUrl: "widgets/examplewidgets/my-widget2.html"
      };
      
      return directive;
    });

function clickedOnMe() {
  alert("You clicked on me!");
}