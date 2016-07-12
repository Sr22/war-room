angular
  .module('warRoom')
  .constant('widgetList', [
	{
	  name: 'reddit-widget',
	  dependencies: [
		  'widgets/reddit-widget/reddit-service.js',
	      'widgets/reddit-widget/reddit-controller.js',
		  'widgets/reddit-widget/reddit-directive.js'
	  ],
	  directive: 'redditWidget'
	}
  ]);
