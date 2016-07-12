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
    }
  ]);