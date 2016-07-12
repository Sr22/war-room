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
        'widgets/reddit-widget/reddit-directive.js'
      ],
      directive: 'redditWidget'
    }
  ]);
