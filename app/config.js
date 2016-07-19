angular
  .module('warRoom')
  .constant('widgetList', [
    {
      name: 'StashWidget',
      dependencies: [
        'widgets/stash-widget/stash-api.js',
        'widgets/stash-widget/stash-widget-service.js',
        'widgets/stash-widget/stash-widget-controller.js',
        'widgets/stash-widget/stash-widget-directive.js',
        'widgets/stash-widget/stash-widget.css'
      ],
      directive: 'stashWidget',
      initialize: 'stashWidgetService.initialize',
      serialize: 'stashWidgetService.serialize'
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
    }
  ]);
