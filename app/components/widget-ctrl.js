

var loadScriptCallback = function(src, callback) {
  return (function (src, callback) {
    $.ajax({
      url : src,
      success : function (data) {
        (function (data) {
          eval.call(window, data);
          callback();
        })(data);
      }
    });
  })(src, callback);
}

angular.module("warRoom")
    .factory('widgetCtrl', ['$compile', function($compile) {
      var service = {};
      
      service.addWidget = function(widget, scope, callback, grid) {
        return (function (widget, scope, callback, grid) {
          if (widget instanceof Array) {
            var body = '<div><div class="grid-stack-item-content"><include-executable-file src="' + widget[0] + '"></include-executable-file></div></div>';
            widget.filter(function (elem) { return elem.endsWith(".css"); })
                .forEach(function (elem) {
                  var link = document.createElement('link');
                  link.setAttribute('rel', 'stylesheet');
                  link.setAttribute('type', 'text/css');
                  link.setAttribute('href', elem);
                  document.getElementsByTagName('head')[0].appendChild(link);
                });
            var jsFiles = widget.filter(function (elem) { return elem.endsWith(".js"); });
            jsFiles.forEach(function (elem) {
                  loadScriptCallback(elem, function() {
                    var el = angular.element(body);
                    var compiled = $compile(el);
                    grid.addWidget(el, 0, 0, 2, 4);
                    compiled(scope);
                    callback();
                  });
                });
            if (jsFiles.length == 0) {
              var el = angular.element(body);
              var compiled = $compile(el);
              grid.addWidget(el, 0, 0, 2, 4);
              compiled(scope);
              callback();
            }
          } else {
            var body = '<div><div class="grid-stack-item-content"><include-executable-file src="' + widget + '"></include-executable-file></div></div>';
            var el = angular.element(body);
            var compiled = $compile(el);
            grid.addWidget(el, 0, 0, 2, 4, true);
            compiled(scope);
            callback();
          }
        })(widget, scope, callback, grid);
      }
      
      return service;
    }]);