angular.module("warRoom")
    .controller("meganController",   ['$scope', 'widgetService', 'WidgetCtrl', function ($scope, widgetCtrl, widgetService) {
		
      $scope.addWidget = function(widget) {
        widgetService.addWidget(widget);
      }
	  
    }]);
	
angular.module("warRoom")
    .directive("meganWidget", function () {
      var directive = {
        templateUrl: "widgets/meganwidget.html"
      };
      
      return directive;
    });

	
	
