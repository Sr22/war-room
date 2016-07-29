angular.module('warRoom')

.directive('notesWidget', function () {
  return {
    templateUrl: 'widgets/notes-widget/notes-widget.html',
    controller: 'notesWidgetController'
  }
});