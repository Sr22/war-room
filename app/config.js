

angular
  .module("warRoom")
  .value("widgetList", [
    "widgets/example-widget.html",
    "widgets/example2-widget.html",
    ["widgets/my-widget.html", "widgets/my-widget.js"],
  ]);