# Creating a New Widget

There are three main components that go into a widget:
1. The AngularJS directive that generates the widget.
2. The AngularJS controller that controls the generated HTML.
3. The template that represents the structure and static content in the widget.

First, create a template in the `app/widgets/my-new-widget` folder. For this tutorial, we will call it `template.html`. Eventually, edit this file to contain the Angular template for your widget; for now, use: 
```
<html>
  <body ng-controller="myNewWidgetController">
    <p>{{ message }}</p>
  </body>
</html>
```
Second, make a directive and place it in the `app/widgets/my-new-widget` folder. We will call it `directive.js`. To learn more about how to use directives in AngularJS, see a tutorial; for now, use: 
```
angular.module('warRoom').directive("myNewWidgetDirective", function() {
  return {
    templateUrl: "widgets/my-new-widget/template.html"
  }
});
```

Finally, make a controller in `app/widgets/my-new-widget/controller.js`: 
```
angular.module('warRoom').controller("myNewWidgetController", ['$scope', function($scope) {
  $scope.message = "Hello world!";
}]);
```

In `app/config.js`, add `['widgets/my-new-widget/controller.js', 'widgets/my-new-widget/directive.js', 'myNewWidgetDirective']` to the `widgetList`. The first n-1 elements in the list are the JavaScript and CSS dependencies. While you can include scripts and CSS in your `template.html` file, to create Angular directives, controllers, etc. you MUST add them as a dependency (instead of including them inline.)

Now, run the server and visit the home page.