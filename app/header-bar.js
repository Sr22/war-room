/**
 * Created by davisjac on 7/20/2016.
 */
angular.module("warRoom")
    .controller('headerBarController', ['$scope', '$http', function($scope, $http) {
        $scope.bookmarks = [{
                name: 'Stash',
                url: 'http://www.stash.cdk.com'
            },
            {
                name: 'Jira',
                url: 'http://www.jira.cdk.com'
            },
            {
                name: 'Confluence',
                url: 'http://www.confluence.cdk.com'
            }
        ];
        $scope.addBookmark = function() {
            
        }
    }]);