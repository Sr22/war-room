angular.module('warRoom')
.directive('timeWidget', function () {
    return {
      templateUrl : 'widgets/time-widget/time-widg.html',
      controller: 'timeWidgetController',
        controllerAs: 'tw'
  };
})
