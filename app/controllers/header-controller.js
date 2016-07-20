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
      
      $scope.gridstackEnabled = false;
      $scope.toggleEnable = function() {
        $scope.gridstackEnabled = !$scope.gridstackEnabled;
        widgetService.setWidgetsEnabled($scope.gridstackEnabled);
      };
        $scope.bookmarks = [{
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

        }
    }]);