angular.module('warRoom')
    .controller('headerController', ['$scope', 'widgetCtrl', 'widgetService', function ($scope, widgetCtrl, widgetService) {
      $scope.saveWidgets = function() {
        widgetCtrl.saveWidgetsToCookie(gridstack, 'grid');
      };
      
      $scope.loadWidgets = function() {
        widgetCtrl.removeAllWidgets(gridstack);
        widgetCtrl.instantiateWidgetsFromCookie(gridstack, 'grid');
      }
      
      $scope.removeWidget = function(widget) {
        widgetService.removeWidget(widget);
      }
    }]);