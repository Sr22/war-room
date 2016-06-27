

angular
  .module("warRoom")
  .directive("wwWidgets", ['$window', 'widgetList', 'widgetCtrl', wwWidgets]);

function createGridster(elem, widgetsSize, cols) {
  return $(elem).find('ul').gridster({
    widget_selector: 'ww-widget',
    widget_margins: [2, 2],
    widget_base_dimensions: [widgetsSize/cols, 340/2],
    min_cols: cols,
    max_cols: cols,
    resize: {
      enabled: true
    }
  }).data('gridster');
}
  
function wwWidgets($window, widgetList, widgetCtrl) {
  gridster = null;
  var directive = {
    transclude: true,
    template: '<ul class="ww-widgets-ul"></ul>',
    restrict: 'EA',
    link: function($scope, elem, attrs) {
      var windowSizeCurrent = $window.innerWidth;
      var widgetsSize = windowSizeCurrent - 100;
      var cols = Math.max(Math.floor(widgetsSize/340), 1);
      
      elem.ready(function() {
        var numElements = widgetList.length;
        widgetList.forEach(function (el) {
          widgetCtrl.addWidget(el, $scope, function () {
            numElements -= 1;
            if (numElements == 0) {
              gridster = createGridster(elem, widgetsSize, cols);
            }
          });
        });
      });
    }
  };
  return directive;
}