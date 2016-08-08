/**
 * Created by Hank on 7/11/2016.
 */
angular.module("warRoom")
    .controller('rssController', ['$scope', 'rssService', function($scope, rssService) {
        
    }]);

angular.module("warRoom")
    .directive("rssWidgetDir", function() {
       var directive = {
           templateUrl: "widgets/rssfeed/rssfeed.html",
           controller: "rssController"
       };
        return directive;
    });