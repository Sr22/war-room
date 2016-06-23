angular
  .module("warRoom")
  .directive("wwEmbedPage",wwEmbedPage);
  
function wwEmbedPage() {
  var directive = {
    scope: {
      src='@'
    },
    templateUrl: ,
  };
  return directive;
}