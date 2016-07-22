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
    $scope.bookmarks = [];
    $scope.addBookmark = function() {
        add_link_form();
    };
    $scope.finishForm = function () {
        alert("hi");
    };
}]);

add_link_form = function() {
    $('#link_form').html('<div class="alert alert-success fade in"><button ng-click="finishForm()">Submit</button></div>');
};
