angular.module('warRoom')
    .controller('headerController', ['$scope', '$q','$http', 'widgetList', 'widgetService', function($scope, $q, $http, widgetList, widgetService) {
        $scope.toggleEnableAdd = false;
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
            $scope.toggleEnableAdd = !$scope.toggleEnableAdd;
            $scope.gridstackEnabled = !$scope.gridstackEnabled;
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
        $scope.bookmarks = [{
            url: 'http://stash.cdk.com',
            name: 'Stash'
        }, {
            url: 'http://jira.cdk.com',
            name: 'Jira'
        }, {
            url: 'http://confluence.cdk.com',
            name: 'Confluence'
        }];
        $scope.bookmarkUrl = '';
        $scope.bookmarkName = '';
        $scope.displayLinkForm = false;
        $scope.addBookmark = function() {
            $scope.displayLinkForm = !$scope.displayLinkForm;
        };
        $scope.finishForm = function() {
            var tempLinkUrl = $scope.bookmarkUrl;
            var tempLinkName = $scope.bookmarkName;
            if(ValidURL($http, $q, tempLinkUrl) == true) {
                $scope.bookmarks.push({
                    url: tempLinkUrl,
                    name: tempLinkName
                })
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
        }
    }]);

    function ValidURL($http, $q, str) {
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
    }
