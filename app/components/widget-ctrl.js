
var loadScriptCallback = function(src, callback) {
  return (function (src, callback) {
    $.ajax({
      url : src,
      dataType: 'text',
      success : function (data) {
        (function (data) {
          eval.call(window, data);
          callback && callback();
        })(data);
      }
    });
  })(src, callback);
}

angular.module("warRoom")
    .service('widgetCtrl', ['$compile', function($compile) {
      var service = {
        widgetList: [],
        executedJavaScript: []
      };
      
      service.addWidget = function(widget, scope, callback, grid, x, y, width, height, auto) {
        if ($.inArray(widget, service.widgetList) == -1) {
          service.widgetList.push(widget);
          // JavaScript scoping problems fixed by calling anonymous function
          return (function (widget, scope, callback, grid) {
            widgetDirective = camelToDash(dashToCamel(widget.directive));
            widget.dependencies.filter(function (elem) { return elem.endsWith(".css"); })
              .forEach(function (elem) {
                var link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('type', 'text/css');
                link.setAttribute('href', elem);
                document.getElementsByTagName('head')[0].appendChild(link);
              });
            var jsFiles = widget.dependencies.filter(function (elem) { return elem.endsWith(".js") && $.inArray(elem, service.executedJavaScript) == -1; });
            if (jsFiles.length > 0) {
              var len = jsFiles.length;
              jsFiles.forEach(function (elem) {
                loadScriptCallback(elem, function(widgetDirective) {
                  return function() {
                    service.executedJavaScript.push(elem);
                    len -= 1;
                    if (len == 0) {
                      var body = '<div><div class="grid-stack-item-content"><'+widgetDirective+'></'+widgetDirective+'></div></div>';
                      elementToAdd = $compile(body)(scope);
                      grid.addWidget(elementToAdd, x || 0, y || 0, width || 2, height || 4, auto != undefined ? auto : true);
                      $(elementToAdd).data('widget', widget);
                      callback && callback();
                    }
                  };
                }(widgetDirective));
              });
            } else {
              var body = '<div><div class="grid-stack-item-content"><'+widgetDirective+'></'+widgetDirective+'></div></div>';
              elementToAdd = $compile(body)(scope);
              grid.addWidget(elementToAdd, x || 0, y || 0, width || 2, height || 4, auto != undefined ? auto : true);
              $(elementToAdd).data('widget', widget);
              callback && callback();
            }
          })(widget, scope, callback, grid);
        }
      };
      
      service.objectifyWidgets = function(grid) {
        var widgets = [];
        grid.container.children('.grid-stack-item').each(function (index, el) {
          el = $(el);
          widgets.push({
            content: el.data('widget'), 
            x: el.attr('data-gs-x'),
            y: el.attr('data-gs-y'),
            width: el.attr('data-gs-width'),
            height: el.attr('data-gs-height')
          });
        });
        return {"widgets": widgets};
      };
      
      service.instantiateObjectifiedWidgets = function(grid, widgetsObj) {
        widgetsObj.widgets.forEach(function(el) {
          service.addWidget(el.content, angular.element($('ww-widgets')).scope(), null, grid, el.x, el.y, el.width, el.height, false);
        });
      };
      
      service.saveWidgetsToCookie = function(grid, key) {
        setCookie(key, JSON.stringify(this.objectifyWidgets(grid)))
      };
      
      service.instantiateWidgetsFromCookie = function(grid, key) {
        if (getCookie(key)) {
          service.instantiateObjectifiedWidgets(grid, JSON.parse(getCookie(key)));
          return true;
        } else {
          return false;
        }
      };
      
      service.removeAllWidgets = function(grid) {
        grid.removeAll();
        this.widgetList = [];
      };
      
      return service;
    }]);
