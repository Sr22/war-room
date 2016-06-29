angular.module('warRoom')
    .controller('headerController', ['$scope', 'widgetCtrl', function ($scope, widgetCtrl) {
      $scope.saveWidgets = function() {
        widgetCtrl.saveWidgetsToCookie(gridstack, 'grid');
      };
      
      $scope.loadWidgets = function() {
        widgetCtrl.removeAllWidgets(gridstack);
        widgetCtrl.instantiateWidgetsFromCookie(gridstack, 'grid');
      }
    }]);