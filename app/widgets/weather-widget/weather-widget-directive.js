angular.module('warRoom')
    .directive('weatherWidget', function weatherWidget() {
        return {
            templateUrl: 'widgets/weather-widget/weather-widget.html',
            controller: 'weatherWidgetController',
            bindToController: true
        }
    })
		