angular.module('warRoom')

.service('notesWidgetService', function () {
  return {
    initialize : function ($scope, obj) {
      if (obj) {
        console.log(obj.rendering)
        $scope.content = obj.notesContent || '';
        $scope.render(obj.rendering || false);
      }
    },
    serialize : function ($scope) {
      return {
        notesContent : $scope.content,
        rendering : $scope.rendering
      };
    }
  }
});