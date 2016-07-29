angular.module('warRoom')
    .service('timeWidgetService', function() {
        return  {
                initialize: function ($scope, obj) {
                    if(obj) {
                        $scope.loadTabs(obj)


                    }
                },

                serialize: function($scope) {
                    return {

                        tabNames: $scope.tabNames,
                        deltaTime: $scope.deltaTime,
                        tf:$scope.tf

                    }
                }
            }

        }
    );
/*
save the tab names and their times in a corresponding order and fetch them and display the tabs again

tab names to create tabs, delta time, 
set tf to visable for the tabs
set tab names
create time array
display time array
ned to make timeout run once
 */