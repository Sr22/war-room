

var loadScriptCallback = function(src, callback) {
  var script = document.createElement('script');
  var loaded = false;
  script.setAttribute('src', src);
  if (callback) {
    script.onreadystatechange = script.onload = function() {
      if (!loaded) {
        callback();
      }
      loaded = true;
    };
  }
  document.getElementsByTagName('head')[0].appendChild(script);
}

angular.module("warRoom")
    .factory('addWidget', ['$compile', function($compile) {
      var service = {};
      service.addWidget = function(widget, scope, callback) {
        return function (widget, scope, callback) {
          if (widget instanceof Array) {
            var body = '<ww-widget data-row=1 data-col=1 data-sizex=1 data-sizey=2><include-executable-file src="' + widget[0] + '"></include-executable-file></ww-widget><span class="gs-remove-handle gs-remove-handle-all"></span>';
            widget.filter(function (elem) { return elem.endsWith(".css"); })
                .forEach(function (elem) {
                  var link = document.createElement('link');
                  link.setAttribute('rel', 'stylesheet');
                  link.setAttribute('type', 'text/css');
                  link.setAttribute('href', elem);
                  document.getElementsByTagName('head')[0].appendChild(link);
                });
            widget.filter(function (elem) { return elem.endsWith(".js"); })
                .forEach(function (elem) {
                  loadScriptCallback(elem, function() {
                    var el = angular.element(body);
                    var compiled = $compile(el);
                    $('.ww-widgets-ul').append(el);
                    compiled(scope);
                    callback();
                  });
                });
          } else {
            var body = '<ww-widget data-row=1 data-col=1 data-sizex=1 data-sizey=2><include-executable-file src="' + widget + '"></include-executable-file></ww-widget><span class="gs-remove-handle gs-remove-handle-all"></span>';
            var el = angular.element(body);
            var compiled = $compile(el);
            $('.ww-widgets-ul').append(el);
            compiled(scope);
            callback();
          }
        }(widget, scope, callback);
      }
      
      return service;
    }]);