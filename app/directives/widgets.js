

angular
  .module("warRoom")
  .directive("wwWidgets", ['widgetList', '$window', wwWidgets]);

function wwWidgets(widgetList, $window) {
  var body = '<div class="gridster widgets" ng-transclude><ul>' + widgetList.map(function (elem) {
    if (elem instanceof Array) {
      return '<ww-widget data-row=1 data-col=1 data-sizex=1 data-sizey=2><include-executable-file src="' + elem[0] + '"></include-executable-file></ww-widget><span class="gs-remove-handle gs-remove-handle-all"></span>';
    } else {
      return '<ww-widget data-row=1 data-col=1 data-sizex=1 data-sizey=2><include-executable-file src="' + elem + '"></include-executable-file></ww-widget><span class="gs-remove-handle gs-remove-handle-all"></span>';
    }
  }).reduce(function (cumu, elem){
    return cumu + elem;
  }, "") + '</ul></div>'
  
  var gridster = null;
  
  var directive = {
        transclude: true,
        template: body,
        restrict: 'EA',
        link: function($scope, elem, attrs) {
          var windowSizeCurrent = $window.innerWidth;
          var widgetsSize = windowSizeCurrent - 100;
          var cols = Math.max(Math.floor(widgetsSize/340), 1);
          
          elem.ready(function() {
            gridster = $(elem).find('ul').gridster({
              widget_selector: 'ww-widget',
              widget_margins: [2, 2],
              widget_base_dimensions: [widgetsSize/cols, 340/2],
              min_cols: cols,
              max_cols: cols,
              resize: {
                enabled: true
              }
            }).data('gridster');
            
            /*$window.addEventListener('resize', function() {              
              cols = Math.max(Math.floor(widgetsSize/340), 1);
              
              if (gridster && windowSizeCurrent != $window.innerWidth) {
                windowSizeCurrent = $window.innerWidth;
                widgetsSize = windowSizeCurrent - 100;
                
                gridster.destroy(false);
                gridster = $(elem).find('ul').gridster({
                  widget_margins: [2, 2],
                  widget_base_dimensions: [widgetsSize/cols, 340/2],
                  min_cols: cols,
                  max_cols: cols,
                  resize: {
                    enabled: true
                  }
                }).data('gridster');
              }
            });*/
          });
       }
  };
  return directive;
}