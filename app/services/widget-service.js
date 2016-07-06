
angular.module('warRoom').service('widgetService', ['widgetCtrl', 'widgetList', function (widgetCtrl, widgetList) {
  var service = {};
  
  service.addWidget = function (widgetName, x, y, width, height, autoArrange, callback) {
    if (widgetList.length == 0) return;
    
    // find widget
    var widget = undefined;
    widgetList.forEach(function (el) {
      if (el instanceof Array && el.length >= 3) {
        if (el[0] == widgetName) {
          widget = el;
        } else {
        }
      } else {
        throw ("Invalid widget: " + el);
      }
    });
    
    // find scope
    var scope = undefined;
    scope = angular.element($("ww-widgets")).scope();

    widgetCtrl.addWidget(widget, scope, callback, gridstack, x, y, width, height, autoArrange)
  };
  
  service.removeWidget = function (widgetName) {
    if (widgetList.length == 0) return;

    // find widget
    var widget = undefined;
    widgetList.forEach(function (el) {
      if (el instanceof Array && el.length >= 3) {
        if (el[0] == widgetName) {
          widget = el;
        } else {
        }
      } else {
        throw ("Invalid widget: " + el);
      }
    });
    
    // find element
    var widgetElement = $(camelToDash(widget[widget.length-1])).closest(".grid-stack-item");
    gridstack.removeWidget(widgetElement, true);
  };
  
  service.saveWidgetLocations = function () {
    widgetCtrl.saveWidgetsToCookie(gridstack, "grid");
  };
  
  service.loadWidgetLocations = function () {
    widgetCtrl.instantiateWidgetsFromCookie(gridstack, "grid")
  };
  
  service.setWidgetsEnabled = function (enabled) {
    enabled ? gridstack.enable() : gridstack.disable();
  }
  
  return service;
}]);