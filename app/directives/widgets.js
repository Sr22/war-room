

angular
  .module("warRoom")
  .directive("wwWidgets", ['$window', 'widgetList', 'widgetCtrl', wwWidgets]);

function createGridstack(elem) {
  return $(elem).gridstack({
    virtualMargin: 4,
    horizontalMargin: 4,
    float: false,
    auto: true,
    width: 12,
    //height: 8,
    removable: true,
    animate: true,
  }).data('gridstack');
}
  
function wwWidgets($window, widgetList, widgetCtrl) {
  gridstack = null;
  var directive = {
    transclude: true,
    template: '<div class="grid-stack"></div>',
    restrict: 'EA',
    link: function($scope, elem, attrs) {
      var windowSizeCurrent = $window.innerWidth;
      var widgetsSize = windowSizeCurrent - 100;
      var cols = Math.max(Math.floor(widgetsSize/340), 1);
      
      elem.ready(function() {
        gridstack = createGridstack($(".grid-stack"), 0, 0);

        var numElements = widgetList.length;
        if (!widgetCtrl.instantiateWidgetsFromCookie(gridstack, 'grid')) {
          widgetList.forEach(function (el) {
            widgetCtrl.addWidget(el, $scope, null, gridstack);
          });
        }
      });
    }
  };
  return directive;
}