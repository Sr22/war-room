
angular.module('warRoom').service('widgetService', ['widgetCtrl', 'widgetList', function (widgetCtrl, widgetList) {
  var service = {
    executedFiles : []
  };
  
  service.addWidget = function (widget, callback) {    
    // find scope
    var scope = angular.element($("ww-widgets")).scope();
    var loadScriptCallback = function(src, cb) {
      return (function (src, cb) {
        $.ajax({
          url : src,
          dataType: 'text',
          success : function (data) {
            (function (data) {
              eval.call(window, data);
              cb && cb();
            })(data);
          }
        });
      })(src, cb);
    };
    widget.content.dependencies.filter(function (elem) { return elem.endsWith(".css") && !service.executedFiles.contains(elem); })
      .forEach(function (elem) {
        service.executedFiles.push(elem);
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', elem);
        document.getElementsByTagName('head')[0].appendChild(link);
      });
    var jsFiles = widget.content.dependencies.filter(function (elem) { return elem.endsWith(".js") && !service.executedFiles.contains(elem); });
    if (jsFiles.length > 0) {
      var len = jsFiles.length;
      jsFiles.forEach(function (elem) {
        loadScriptCallback(elem, (function(w) {
          service.executedFiles.push(elem);
          return function() {
            len -= 1;
            if (len == 0) {
              scope.widgets.push(w);
              callback && callback();
            }
          };
        })(widget));
      });
    } else {
      scope.widgets.push(widget);
    }
  };
  
  service.removeWidget = function (id) {
    if (widgetList.length == 0) return;

    // find widget
    var widget = undefined;
    widgetList.forEach(function (el) {
      if (el.name) {
        if (el.name == widgetName) {
          widget = el;
        } else {
        }
      } else {
        throw ("Invalid widget: " + el);
      }
    });
    
    // find element
    service.scope().widgets = service.scope().widgets.filter(function (el) {
      return el.id === id;
    });
  };
  
  service.commit = function () {
    service.scope().updateWidgets();
  };
  
  service.scope = function () {
    return angular.element($("ww-widgets")).scope();
  };
  
  service.saveWidgets = function () {
    service.gridster().container.children('.grid-stack-item').each(function (index, el) {
        el = $(el);
        
        var saveObject = undefined;
        var serialize = el.attr('widget').serialize.split('.');
        if (serialize) angular.injector().invoke([serialize[0], function (s) {
          saveObject = s[serialize[1]](angular.element(el).scope());
        }]);
        
        widgets.push({
          content: el.data('widget'), 
          x: el.attr('data-gs-x'),
          y: el.attr('data-gs-y'),
          width: el.attr('data-gs-width'),
          height: el.attr('data-gs-height'),
          save: saveObject
        });
      });
    var toSave = {"widgets": widgets};
    setCookie("grid", toSave);
  };
  
  service.loadWidgets = function () {
    var cookie = getCookie('key');
    if (cookie) {
      object = JSON.parse(cookie);
      object.forEach(function (el) {
        service.addWidget(el);
      });
    }
  };
  
  service.setWidgetsEnabled = function (enabled) {
    enabled ? service.scope().gridstack.enable() : service.scope().gridstack.disable();
  };
  
  service.saveValue = function (widgetName, key, value) {
    var currentValue = getCookie("widget_"+widgetName);
    if (!currentValue) currentValue = "{}";
    var currentObject = JSON.parse(currentValue);
    currentObject.key = value;
    setCookie("widget_"+widgetName, JSON.stringify(currentObject));
  };
  
  service.loadValue = function (widgetName, key) {
    var currentValue = getCookie("widget_"+widgetName);
    if (!currentValue) currentValue = "{}";
    var currentObject = JSON.parse(currentValue);
    return currentObject.key;
  };
  
  service.gridstack = function () {
    return service.scope().gridstack;
  }
  
  return service;
}]);