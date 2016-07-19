angular.module("warRoom")
    .controller("meganController",   ['$scope', 'WidgetCtrl', function ($scope, widgetCtrl) {

    }]);
	
angular.module("warRoom")
    .directive("meganWidget", function () {
      var directive = {
        templateUrl: "widgets/meganwidget.html"
      };
      
      return directive;
    });

	
	
