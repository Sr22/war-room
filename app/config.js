angular
  .module('warRoom')
  .constant('widgetList', [
    /*{
      name: 'StashWidget',
      dependencies: [
        'widgets/stash-widget/stash-api.js', 
        'widgets/stash-widget/controller.js', 
        'widgets/stash-widget/directive.js', 
        'widgets/stash-widget/widget.css'
      ],
      directive: 'stashWidget'
    },*/
	{
	  name: 'RedditWidget',
	  dependencies: [
	    'widgets/redditwidget/redditcontroller.js',
		'widgets/redditwidget/redditgetservice.js'
	  ],
	  directive: 'redditWidget'
	}
  ]);
