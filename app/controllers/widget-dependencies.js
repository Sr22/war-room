

angular
    .module("warRoom")
    .controller("widgetDependencies", ['$scope', 'widgetList', function ($scope, widgetList) {
      var deps = flatten(widgetList);
      deps.filter(function (elem) { return elem.endsWith(".js"); })
          .forEach(function (elem) {
            loadScript(elem, "text/javascript", "UTF-8");
          });
      deps.filter(function (elem) { return elem.endsWith(".css"); })
          .forEach(function (elem) {
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', elem);
            document.getElementsByTagName('head')[0].appendChild(link);
          });
    }]);

function loadScript(url, type, charset) {
  if (type===undefined) type = 'text/javascript';
  if (url) {
    var script = document.querySelector("script[src*='"+url+"']");
    if (!script) {
      var heads = document.getElementsByTagName("head");
      if (heads && heads.length) {
        var head = heads[0];
        if (head) {
            script = document.createElement('script');
            script.setAttribute('src', url);
            script.setAttribute('type', type);
            if (charset) script.setAttribute('charset', charset);
            head.appendChild(script);
          }
        }
      }
    return script;
  }
}

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}