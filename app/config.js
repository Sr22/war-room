angular
  .module('warRoom')
  .constant('widgetList', [
    {
      name: 'StashWidget',
      dependencies: [
        'widgets/stash-widget/stash-api.js', 
        'widgets/stash-widget/stash-widget-controller.js', 
        'widgets/stash-widget/stash-widget-directive.js', 
        'widgets/stash-widget/stash-widget.css'
      ],
      directive: 'stashWidget'
    },
    {
      name: 'RedditWidget',
      dependencies: [
        'widgets/reddit-widget/reddit-service.js',
        'widgets/reddit-widget/reddit-controller.js',
        'widgets/reddit-widget/reddit-directive.js',
        'widgets/reddit-widget/reddit-style.css'
      ],
      directive: 'redditWidget'
    },
    {
      name: 'TimeWidget',
      dependencies: [
        'widgets/time-widget/googlemaps-api-service.js',
        'widgets/time-widget/timezone-api-service.js',
        'widgets/time-widget/time-widg-controller.js',
        'widgets/time-widget/time-widg-directive.js',
        'widgets/time-widget/time-style.css'
      ],
      directive: 'timeWidget'
    },
	{
		name: 'WeatherWidget',
		dependencies: [
		'widgets/weather-widget/weather-api-service.js',
		'widgets/weather-widget/weather-widget-controller.js',
		'widgets/weather-widget/weather-widget-directive.js',
		'widgets/weather-widget/weather-widget.html',
		'widgets/weather-widget/weather-widget.css'
		
		
	
		],
		directive: 'weatherWidget'
	}
  ]);

angular.module('warRoom')
    .constant('googlemapsApiKey', 'AIzaSyBErhwJQ6hNNAm2i_VOc2PXPPCgpF9jhd4');
