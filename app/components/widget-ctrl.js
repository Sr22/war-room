function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return undefined;
}

function setCookie(cname, cvalue, exdays) {
    if (exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
    }
    var expires = exdays ? (" expires="+ d.toUTCString()) : ("");
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

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
    .factory('widgetCtrl', ['$compile', function($compile) {
      var service = {
        widgetList: [],
        executedJavaScript: []
      };
      
      service.addWidget = function(widget, scope, callback, grid, x, y, width, height, auto) {
        if ($.inArray(widget, service.widgetList) == -1) {
          service.widgetList.push(widget);
          // JavaScript scoping problems fixed by calling anonymous function
          return (function (widget, scope, callback, grid) {
            if (widget instanceof Array) {
              widgetDirective = camelToDash(dashToCamel(widget[widget.length-1]));
              widget.filter(function (elem) { return elem.endsWith(".css"); })
                  .forEach(function (elem) {
                    var link = document.createElement('link');
                    link.setAttribute('rel', 'stylesheet');
                    link.setAttribute('type', 'text/css');
                    link.setAttribute('href', elem);
                    document.getElementsByTagName('head')[0].appendChild(link);
                  });
              var jsFiles = widget.filter(function (elem) { return elem.endsWith(".js") && $.inArray(elem, service.executedJavaScript) == -1; });
              if (jsFiles.length > 0) {
                var len = jsFiles.length;
                jsFiles.forEach(function (elem) {
                      loadScriptCallback(elem, function() {
                        service.executedJavaScript.push(elem);
                        len -= 1;
                        if (len == 0) {
                          var body = '<div><div class="grid-stack-item-content"><'+widgetDirective+'></'+widgetDirective+'></div></div>';
                          elementToAdd = $compile(body)(scope);
                          grid.addWidget(elementToAdd, x || 0, y || 0, width || 2, height || 4, auto != undefined ? auto : true);
                          $(elementToAdd).data('widget', widget);
                          callback && callback();
                        }
                      });
                    });
              } else {
                var body = '<div><div class="grid-stack-item-content"><'+widgetDirective+'></'+widgetDirective+'></div></div>';
                elementToAdd = $compile(body)(scope);
                grid.addWidget(elementToAdd, x || 0, y || 0, width || 2, height || 4, auto != undefined ? auto : true);
                $(elementToAdd).data('widget', widget);
                callback && callback();
              }
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
