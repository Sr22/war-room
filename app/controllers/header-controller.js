angular.module('warRoom')

.controller('headerController', ['$scope','widgetList', 'widgetService', function ($scope,widgetList, widgetService) {
  $scope.saveWidgets = function() {
    widgetService.saveWidgets();
  };

  $scope.loadWidgets = function() {
    widgetService.removeAllWidgets();
    widgetService.loadWidgets();
    widgetService.commit();
  };

   $scope.gridstackEnabled = false;
  $scope.toggleEnable = function() {
    $scope.gridstackEnabled = !$scope.gridstackEnabled;
    widgetService.setWidgetsEnabled($scope.gridstackEnabled);
  };

 $scope.addWidget = function(widget, callback) {
   for (var i = 0; i < widgetList.length; i++) {
     if (widgetList[i].name === widget) {
       widgetService.addWidget({content: widgetList[i]}, callback);
       widgetService.commit();
     }
   }
 };

  $scope.widgetList = widgetList;
}]);