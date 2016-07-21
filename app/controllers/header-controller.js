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
      };
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
            if (linkUrl == " " || linkName == " ") {
                alert("Please fill all input fields");
            }
            else {
                $scope.$evalAsync(function () {
                    $scope.bookmarks.push({name: linkName, url: linkUrl});
                });
            }
        }
      $scope.addWeather = function() {
          widgetService.addWidget('WeatherWidget', 0, 0, 2, 4, true);
      };

      $scope.addTime = function() {
          widgetService.addWidget('TimeWidget', 0, 0, 2, 4, true);
      };

      $scope.addCalendar = function() {
          widgetService.addWidget('CalendarWidget', 0, 0, 2, 4, true);
      };

      $scope.addReddit = function() {
          widgetService.addWidget('RedditWidget', 0, 0, 2, 4, true);
      };

      $scope.addNotify = function() {
          widgetService.addWidget('NotificationsWidget', 0, 0, 2, 4, true);
      };

      $scope.addStash = function() {
          widgetService.addWidget('StashWidget', 0, 0, 2, 4, true);
      };
    }]);