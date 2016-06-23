

angular
  .module("warRoom")
  .directive("wwWidgets", ['widgetList', wwWidgets]);
  
function wwWidgets(widgetList) {
  var body = '<div class="gridster widgets" ng-transclude><ul>' + widgetList.map(function (elem) {
    return '<li data-row=1 data-col=1 data-sizex=1 data-sizey=1><ng-include src="\'' + elem + '\'"></ng-include></li>'
  }).reduce(function (cumu, elem){
    return cumu + elem;
  }, "") + '</ul></div>'
    
  var directive = {
        transclude: true,
        template: body,
        restrict: 'EA',
        link: function( $scope, elem, attrs ) {    
          elem.ready(function(){
            $(elem).find('ul').gridster({
              widget_margins: [2, 2],
              widget_base_dimensions: [240, 240],
              min_cols: 7,
              max_cols: 7,
              resize: {
                enabled: true
              }
            }).data('gridster');
          });
       }
  };
  return directive;
}