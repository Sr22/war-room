

angular
  .module("warRoom")
  .directive("wwWidgets", ['$window', 'widgetList', 'widgetCtrl', wwWidgets]);

function createGridstack(elem) {
  return $(elem).gridstack({
/*     cellHeight: 80,
    virtualMargin: 10,
    horizontalMargin: 10 */
    float: true
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
        widgetList.forEach(function (el) {
          //gridstack.addWidget($('<div><div class="grid-stack-item-content"></div><div/>'), 1, 1, 1, 1);
          widgetCtrl.addWidget(el, $scope, function () {}, gridstack);
          
          /* widgetCtrl.addWidget(el, $scope, function () {
            numElements -= 1;
            if (numElements == 0) {
              //gridstack = createGridstack($(".grid-stack"), widgetsSize, cols);
            }
          }); */
        });
      });
    }
  };
  return directive;
}