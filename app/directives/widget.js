

angular
  .module('warRoom')
  .controller('wwWidgetController', ['$scope', wwWidgetController])
  .directive('wwWidget', wwWidget);

function wwWidget() {
  var directive = {
    scope: {
      row: '@',
      col: '@',
      sizex: '@',
      sizey: '@'
    },
    transclude: true,
    template: '<li data-row="{{row}}" data-col="{{col}}" data-sizex="{{sizex}}" data-sizey="{{sizey}}"></li>',
    restrict: 'E'
  };
  return directive;
};

function wwWidgetController($scope) {
  $scope.row 
}