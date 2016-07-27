
angular
  .module('warRoom')
  
  .controller('wwWidgetsController', ['$scope', '$sce', '$compile', 'widgetList', 'widgetService', '$injector', function ($scope, $sce, $compile, widgetList, widgetService, $injector) {
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
        return [$compile('<div><div class="grid-stack-item-content"><div ng-controller="removeController"><button class="btn remove-widget" ng-click="removeWidget()">x</button></div><'+dir+'></'+dir+'></div></div>')($scope), dir, el];
      }).forEach(function (el) {
        var localScope = angular.element(el[0]).find(el[1]).scope();
        localScope.identifier = el[2].identifier;
        $scope.gridstack.addWidget(el[0], el[2].x || 0, el[2].y || 0, el[2].width || 4, el[2].height || 4, el[2].auto === undefined ? true : el[2].auto);
        $('#widgets').append(el[0]);
        if (el[2].content.initialize) {
          var initializeFunction = el[2].content.initialize.split('.');
          $injector.invoke([initializeFunction[0], function (s) {
            s[initializeFunction[1]](localScope, el[2].save);
          }]);
        }
        el[0].data('widget', el[2]);
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