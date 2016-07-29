//DIRECTIVE THAT PUTS THE WIDGET ONTO THE PLATFORM

angular.module('warRoom')

    .directive('calendarWidget', function () {

        return {
            templateUrl: 'widgets/calendar-widget/calendar-widget.html',
            controller: 'calendarControl'
        }

    });