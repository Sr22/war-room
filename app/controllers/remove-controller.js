/**
 * Created by deyoungm on 7/21/2016.
 */
angular.module('warRoom')

.controller('removeController', ['$scope', '$element','widgetService', function ($scope, $element, widgetService) {
    $scope.removeWidget = function () {
        widgetService.removeWidget(widgetService.getWidgetId($element));
        widgetService.commit();
    };
}]);