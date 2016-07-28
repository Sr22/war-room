angular.module('warRoom')

.controller('notesWidgetController', ['$scope', '$sce', function ($scope, $sce) {
  var converter = new showdown.Converter();
  $scope.rendering = $scope.rendering || false;
  $scope.markdown = '';
  
  $scope.render = function (shouldRender) {
    if (shouldRender) {
      $scope.markdown = $sce.trustAsHtml(converter.makeHtml($scope.content));
      $(".notes-edit-icon").hover(function(){
        $(this).css('color', '#AAFFAA');
      }, function(){
        $(this).css('color', 'white');
      });
      $(".notes-edit-icon").css('color', 'white');
      $scope.rendering = true;
    } else {
      $(".notes-edit-icon").hover(function(){
        $(this).css('color', 'white');
      }, function(){
        $(this).css('color', '#AAFFAA');
      });
      $(".notes-edit-icon").css('color', '#AAFFAA');
      $scope.rendering = false;
    }
  };
  
  $scope.render($scope.rendering);
  
}]);