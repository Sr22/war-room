angular.module('warRoom')
    .controller('headerController', ['$scope', 'widgetService', function ($scope, widgetService) {
      $scope.saveWidgets = function() {
        widgetService.saveWidgets();
      };
      
      $scope.loadWidgets = function() {
        widgetService.removeAllWidgets();
        widgetService.loadWidgets();
        widgetService.commit();
      }
      
      $scope.removeWidget = function(widget) {
        widgetService.removeWidget(widget);
      }
      
      $scope.gridstackEnabled = false;
      $scope.toggleEnable = function() {
        $scope.gridstackEnabled = !$scope.gridstackEnabled;
        widgetService.setWidgetsEnabled($scope.gridstackEnabled);
      }
    }]);