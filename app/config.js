angular
  .module("warRoom")
  .constant("widgetList", [
    [ "StashWidget", 
      "widgets/stash-widget/stash-api.js", 
      "widgets/stash-widget/directive.js", 
      "widgets/stash-widget/controller.js", 
      "widgets/stash-widget/widget.css"
      "stashWidget" ]
  ]
]);