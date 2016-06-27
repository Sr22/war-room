

angular
  .module("warRoom")
  .constant("widgetList", [
    "widgets/example-widget.html",
    "widgets/example2-widget.html",
    ["widgets/my-widget.html", "widgets/my-widget.js"]
  ]);