angular
  .module('warRoom')
  .constant('widgetList', [
	{
	  name: 'RedditWidget',
	  dependencies: [
	    'widgets/redditwidget/redditcontroller.js',
		'widgets/redditwidget/redditgetservice.js'
	  ],
	  directive: 'redditWidget'
	}
  ]);
