angular
  .module("warRoom")
  .directive("includeExecutableFile", includeExecutableFile);

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

function includeExecutableFile() {
  var directive = {
    transclude: true,
    restrict: 'EA',
    scope: {
      src: '@src',
      exe: '@exe'
    },
    link: function($scope, elem, attrs) {
      $(elem).find('script').each(function(index, value) {
        eval($(value).text());
      });
    },
    templateUrl: function(elem, attr) {
      return attr.src;
    }
  }
  return directive;
}