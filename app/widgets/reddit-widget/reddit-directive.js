angular.module("warRoom")
    .directive("redditWidget", function () {
        var directive = {
            templateUrl: "widgets/reddit-widget/reddit-design.html",
            controller: "redditController"
        };
        return directive;
    });
