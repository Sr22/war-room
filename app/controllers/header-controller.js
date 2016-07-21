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
    $scope.linkName;
    $scope.linkUrl;
    $scope.bookmarks = [
        {
            name: 'Stash',
            url: 'http://stash.cdk.com/projects'
        },
        {
            name: 'Jira',
            url: 'https://jira.cdk.com'
        },
        {
            name: 'Confluence',
            url: 'https://confluence.cdk.com'
        }
    ];
    $scope.addBookmark = function() {
        var linkUrl = window.prompt("Url of Link (Copy and Paste from Website): ", " ");
        var linkName = window.prompt("Name of Link: ", " ");
        console.log(linkUrl);
        console.log(linkName);
        if (linkUrl == " " || linkName == " ") {
            alert("Please fill all input fields");
        }
        else if (linkUrl == null || linkName == null) {
            alert("Please fill all input fields");
        }
        else {
            $scope.$evalAsync(function () {
                $scope.bookmarks.push({name: linkName, url: linkUrl});
            });
        }
    }
}]);