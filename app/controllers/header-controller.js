angular.module('warRoom')
    .controller('headerController', ['$scope', 'widgetCtrl', 'widgetService', function ($scope, widgetCtrl, widgetService) {
        $scope.saveWidgets = function() {
            widgetCtrl.saveWidgetsToCookie(gridstack, 'grid');
        };

        $scope.loadWidgets = function() {
            widgetCtrl.removeAllWidgets(gridstack);
            widgetCtrl.instantiateWidgetsFromCookie(gridstack, 'grid');
        };

        $scope.removeWidget = function(widget) {
            widgetService.removeWidget(widget);
        };

        $scope.gridstackEnabled = false;
        $scope.toggleEnable = function() {
            $scope.gridstackEnabled = !$scope.gridstackEnabled;
            widgetService.setWidgetsEnabled($scope.gridstackEnabled);
        };
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

        $scope.addBoi = function () {
            widgetService.addWidget('MeganWidget', 0, 0, 2, 4, true);
        };
    }]);