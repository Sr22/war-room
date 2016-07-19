
angular
  .module('warRoom')
  
  .controller('wwWidgetsController', ['$scope', '$sce', '$compile', 'widgetList', 'widgetService', function ($scope, $sce, $compile, widgetList, widgetService) {
    $scope.gridstack = $('.grid-stack').gridstack({
      virtualMargin: 4,
      float: false,
      auto: true,
      width: 12,
      removable: true,
      animate: true,
      disableDrag: true,
      disableResize: true }).data('gridstack');

    $scope.widgets = [];

    $scope.updateWidgets = function () {
      $scope.gridstack.removeAll(true);
      $('#widgets').html('');
      $scope.widgets.map(function (el) {
        el.identifier = randomString(12);
        var dir = camelToDash(dashToCamel(el.content.directive));
        return [$compile('<div><div class="grid-stack-item-content"><'+dir+'></'+dir+'></div></div>')($scope), dir, el];
      }).forEach(function (el) {
        var localScope = angular.element(el[0]).find(el[1]).scope();
        localScope.identifier = el[2].identifier;
        $scope.gridstack.addWidget(el[0], el[2].x || 0, el[2].y || 0, el[2].width || 4, el[2].height || 0, el[2].auto === undefined ? true : el[2].auto);
        $('#widgets').append(el[0]);
        if (el[2].initialize) angular.injector().invoke([el[2].initialize.split('.')[0], function (s) {
          console.log("calling " + el[2].initialize.split('.')[0]);
          s[el[2].initialize.split('.')[1]](localScope, el[0].save);
        }]);
      });
    };

    var count = widgetList.length;
    widgetList.forEach(function (el) {
      widgetService.addWidget({ content: el }, function () {
        if (!(--count)) {
          widgetService.commit();
        }
      });
    });
  }])

  .directive('wwWidgets', ['$window', 'widgetList', function ($window, widgetList) {
    return {
      transclude: true,
      templateUrl: 'directives/widgets.html',
      controller: 'wwWidgetsController'
    };
  }]);