angular.module('warRoom')
    .controller('headerController', ['$scope', '$q','$http', 'widgetList', 'widgetService', function($scope, $q, $http, widgetList, widgetService) {
        $scope.$root.toggleEnableRemove = false;
        $scope.saveWidgets = function() {
            widgetService.saveWidgets();
        };

        $scope.loadWidgets = function() {
            widgetService.removeAllWidgets();
            widgetService.loadWidgets();
            widgetService.commit();
        };

        $scope.gridstackEnabled = false;
        $scope.toggleEnable = function() {
            $scope.gridstackEnabled = !$scope.gridstackEnabled;
            $scope.$root.toggleEnableRemove = !$scope.$root.toggleEnableRemove;
            widgetService.setWidgetsEnabled($scope.gridstackEnabled);
        };

        $scope.addWidget = function(widget, callback) {
            for (var i = 0; i < widgetList.length; i++) {
                if (widgetList[i].name === widget) {
                    widgetService.addWidget({
                        content: widgetList[i]
                    }, callback);
                    widgetService.commit();
                }
            }
        };

        $scope.widgetList = widgetList;
        $scope.bookmarks = widgetService.loadValue('header-bar', 'bookmarks', $scope.bookmarks) || [
                {name: 'Confluence', url: 'http://confluence.cdk.com'}, 
                {name: 'Jira', url: 'http://jira.cdk.com'}, 
                {name: 'Stash', url: 'http://stash.cdk.com'}];
        widgetService.saveValue('header-bar', 'bookmarks', $scope.bookmarks);
        $scope.bookmarkUrl = '';
        $scope.bookmarkName = '';
        $scope.displayLinkForm = false;
        $scope.addBookmark = function() {
            $scope.displayLinkForm = !$scope.displayLinkForm;
        };
        $scope.finishForm = function() {
            if($scope.bookmarks.length < 7) {
                var newBookmark = { name: $scope.bookmarkName, url: $scope.bookmarkUrl};
                $scope.bookmarks.push(newBookmark);
                widgetService.saveValue('header-bar', 'bookmarks', $scope.bookmarks);
                $scope.bookmarkName = '';
                $scope.bookmarkUrl = '';
            }
            else {
                max_error_alert();
                $scope.bookmarkName = '';
                $scope.bookmarkUrl = '';
            }
        };
        $scope.removeBookmark = function(name) {
            for (var i = $scope.bookmarks.length - 1; i >= 0; i--) {
                if (name == $scope.bookmarks[i].name) {
                    $scope.bookmarks.splice(i, 1);
                }
            }
            widgetService.saveValue('header-bar', 'bookmarks', $scope.bookmarks);
        }
    }]);

max_error_alert = function() {
    $('#maxBookmarksError').html('<div class="alert alert-danger fade in"><a class="close" data-dismiss="alert"></a><span><strong>Error!</strong> You have reached the maximum amount of bookmarks</span></div>');
    $('#maxBookmarksError').fadeTo(2000, 500).slideUp(500, function() {
        $('#maxBookmarksError').alert('close');
    });
};