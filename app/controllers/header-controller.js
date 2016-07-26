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
        $scope.bookmarks = [];
        /*if ($scope.bookmarks.length == 0) {
            $scope.bookmarks.push({name: 'Confluence', url: 'http://confluence.cdk.com'});
            $scope.bookmarks.push({name: 'Jira', url: 'http://jira.cdk.com'});
            $scope.bookmarks.push({name: 'Stash', url: 'http://stash.cdk.com'});
        }*/
        //console.log($scope.bookmarks);
        $scope.bookmarkUrl = '';
        $scope.bookmarkName = '';
        $scope.displayLinkForm = false;
        $scope.addBookmark = function() {
            $scope.displayLinkForm = !$scope.displayLinkForm;
        };
        $scope.finishForm = function() {
            var tempLinkUrl = $scope.bookmarkUrl;
            var tempLinkName = $scope.bookmarkName;
            if(true == true) {
                $scope.bookmarks.push({
                    name: tempLinkName,
                    url: tempLinkUrl
                });
                //widgetService.saveValue('headerbar', 'bookmarks', $scope.bookmarks);
            }
            else {
                alert("Invalid Url");
            }
        };
        $scope.removeBookmark = function(name) {
            for (var i = $scope.bookmarks.length - 1; i >= 0; i--) {
                if (name == $scope.bookmarks[i].name) {
                    $scope.bookmarks.splice(i, 1);
                }
            }
            widgetService.saveValue('headerbar', 'bookmarks', $scope.bookmarks);
        }
    }]);

    /*function ValidURL($http, $q, str) {
        var defer = $q.defer();
        return $http.get(str).then(function onTrue() {
            var tVar = true;
            defer.resolve(tVar);
            return defer.promise;
        }, function onFalse() {
            var fVar = false;
            defer.resolve(fVar);
            return defer.promise;
        });
    }*/
