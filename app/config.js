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
<<<<<<< HEAD
	{
	  name: 'reddit-widget',
	  dependencies: [
		  'widgets/reddit-widget/reddit-service.js',
	      'widgets/reddit-widget/reddit-controller.js',
		  'widgets/reddit-widget/reddit-directive.js',
		  'widgets/reddit-widget/reddit-style.css'
	  ],
	  directive: 'redditWidget'
	}
=======
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
    }
>>>>>>> 15ca9eec9e89f7a36e1fb4445d2ccfba6ec3ba57
  ]);

angular.module('warRoom')
    .constant('googlemapsApiKey', 'AIzaSyBErhwJQ6hNNAm2i_VOc2PXPPCgpF9jhd4');
