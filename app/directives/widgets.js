

angular
  .module("warRoom")
  .directive("wwWidgets", ['widgetList', '$window', wwWidgets]);
  
function wwWidgets(widgetList, $window) {
  var body = '<div class="gridster widgets" ng-transclude><ul>' + widgetList.map(function (elem) {
    return '<li data-row=1 data-col=1 data-sizex=1 data-sizey=2><include-executable-file src="' + elem + '"></include-executable-file></li><span class="gs-remove-handle gs-remove-handle-all"></span>';
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
                
                var options = {
                  widget_base_dimensions: [widgetsSize/cols, 340/2]//,
                  //min_cols: cols,
                  //max_cols: cols
                }
                
                if (options.widget_margins) {
                  gridster.options.widget_margins = options.widget_margins;
                }

                if (options.widget_base_dimensions) {
                  gridster.options.widget_base_dimensions = options.widget_base_dimensions;
                }

                gridster.min_widget_width  = (gridster.options.widget_margins[0] * 2)
                    + gridster.options.widget_base_dimensions[0];
                gridster.min_widget_height = (gridster.options.widget_margins[1] * 2)
                    + gridster.options.widget_base_dimensions[1];

                gridster.$widgets.each($.proxy(function(i, widget) {
                    var $widget = $(widget);
                    var data = $widget.data();
                    this.resize_widget($widget, data.sizex, data.sizey);
                }, gridster));

                gridster.generate_grid_and_stylesheet();
                gridster.get_widgets_from_DOM();
                gridster.set_dom_grid_height();
              }
            });*/
          });
       }
  };
  return directive;
}