angular
  .module("warRoom")
  .directive("includeExecutableFile", includeExecutableFile);

function includeExecutableFile() {
  var directive = {
    transclude: true,
    restrict: 'EA',
    scope: {
      src: '@src',
    },
    link: function($scope, elem, attrs) {
      $(elem).find('script').each(function(index, value) {
        var srcToInclude = $(value).attr('src');
        alert(srcToInclude);
        if (srcToInclude) {
          (function (srcToInclude) {
            $.ajax({
              url : srcToInclude,
              dataType : 'text',
              success : function (data) {
                (function (data) {
                  eval.call(window, data);
                })(data);
              }
            });
          })(srcToInclude);
        }
        eval($(value).text());
      });
    },
    templateUrl: function(elem, attr) {
      return attr.src;
    }
  }
  return directive;
}