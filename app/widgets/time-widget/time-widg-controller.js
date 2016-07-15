angular.module('warRoom')

    .controller('timeWidgetController',['$scope', 'googlemapsApiService', 'timezoneApiService', 'widgetService', function($scope, googlemapsApiService, timezoneApiService, widgetService) {
        var vm = this;
        vm.time='';
        vm.cityInput='';
        $scope.lat='';
        $scope.longit='';
        $scope.numInList=0;
        $scope.onlyCity='';
        $scope.tf1 = true;
        $scope.tf2 = true;
        $scope.tf3 = true;
        $scope.tf4 = true;
        $scope.tf5 = true;
        $scope.placeInTab=1;
        $scope.officialName = '';
        $scope.tabNames = [];
        $scope.timeArr = [];
        $scope.cityArr = [];
        $scope.indexInTab=0;
        $scope.deltaTime = [];
        var date;
        var secsUntil;

        $scope.$watch('tw.cityInput', function(newVal, oldVal) {
            googlemapsApiService.autoComplete(newVal, function (cityList) {
                $scope.cityArr.length = 0;
                $scope.numInList = 0;
                if(!(newVal === oldVal)) {
                    for (var i = 0; i < cityList.length; i++) {
                        $scope.cityArr.push(cityList[i]);
                        $scope.numInList++;
                    }
                }
            })

        });

        // timestamp in milliseconds since 1970 -> string like 4:30 pm
        var timeToString = function (timeInMillis) {
            var date= new Date(timeInMillis);
            var hours= date.getHours()-5;
            var min= date.getMinutes();
            var am=false;
            if (hours == 0) {
                hours += 12;
            } else if (hours < 0) {
                am = true;
                hours += 12;
            } else if (hours < 12) {
                am = false;
            } else if (hours == 12) {
                am = true;
            } else if (hours > 12) {
                am = true;
                hours -= 12;
            }

            if (min < 10) {
                min = '0' + min;
            }

            var timeDisplay;
            if (am == true) {
                timeDisplay = hours + ':' + min + ' am';
            } else {
                timeDisplay = hours + ':' + min + ' pm';
            }
            return timeDisplay;
        }

        $scope.nextTab = function(){
            if($scope.tf1 == false){
                if($scope.tf2 == true){
                    $scope.tf2 = false;
                    $scope.placeInTab=2
                } else{
                    if($scope.tf3 == true){
                        $scope.tf3 = false;
                        $scope.placeInTab=3
                    } else{
                        if($scope.tf4 == true){
                            $scope.tf4 = false;
                            $scope.placeInTab=4
                        } else{
                            if($scope.tf5 == true) {
                                $scope.tf5 = false;
                                $scope.placeInTab=5

                            } else{
                                alert("You've reached the tab limit")
                            }
                        }
                    }
                }
            } else{
                $scope.tf1 = false;
            };
            $scope.tabName()
        }

        $scope.tabName = function (){
            $scope.tabNames.push($scope.officialName);
        }

        $scope.pushTimeArr = function(){
            $scope.timeArr.push($scope.time)
        }

        $scope.pressEnter= function() {
            if(typeof(cityList[0]) == 'undefined') {
                alert("Please enter something");
            } else if(($scope.tabNames.indexOf(cityList[0].description))!=-1) {
                alert("This city already exists in your tabs. Try another city!")
            } else{
                if($scope.numInList === 1) {
                    $scope.officialName = cityList[0].description;
                    $scope.onlyCity = cityList[0].place_id;
                    $scope.nextTab();
                    $scope.cityArr.length=0;
                    vm.cityInput = '';
                    googlemapsApiService.getCoordinates($scope.onlyCity, function(latitude, longitude) {
                        lat = latitude;
                        longit = longitude;
                        timezoneApiService.getTime(lat, longit , function(timestamp) {
                            $scope.deltaTime = (timestamp * 1000) - Date.now();
                            $scope.indexInTab= $scope.tabNames.indexOf($scope.officialName);
                            updateTime();
                            $scope.pushTimeArr();
                            refreshArray();
                        });
                    });

                    //if there's only one city and the person presses enter, then we can get the (only) placeId in the list
                    //and call the api to get longlat and then eventually the time
                } else {
                    alert("Please enter more characters; there are multiple cities shown")
                }
            }
        }

        $scope.placeClick= function(name, placeId) {
            $scope.officialName = name;
            if (($scope.tabNames.indexOf(name)) != -1) {
                alert("This city already exists in your tabs. Try another city!")
            } else {
                $scope.nextTab();
                $scope.cityArr.length=0;
                vm.cityInput = '';
                googlemapsApiService.getCoordinates(placeId, function (latitude, longitude) {
                    lat = latitude;
                    longit = longitude;
                    timezoneApiService.getTime(lat, longit, function (timestamp) {
                        $scope.deltaTime[$scope.placeInTab-1] = (timestamp * 1000) - Date.now();
                        $scope.indexInTab = $scope.tabNames.indexOf(name);
                        updateTime();
                        $scope.pushTimeArr();
                        refreshArray();
                    });
                });
            }
        }

        var setTime = function(){

        }

        var updateTime = function() {
            date=new Date();
            secsUntil = 60-date.getSeconds();
            setTimeout(function() {$scope.$apply(function(){refreshArray()})}, (secsUntil*1000+1000));
            var currentTime = $scope.deltaTime[$scope.placeInTab-1] + Date.now();
            $scope.time = timeToString(currentTime);
        }

        var refreshArray = function(){
            for(var j=0;j<$scope.timeArr.length; j++){
                updateTimeArray(j);
            }
        }

        var updateTimeArray = function(j){
            date = new Date();
            secsUntil = 60-date.getSeconds();
            var currentTime = $scope.deltaTime[j] + Date.now();
            $scope.timeArr[j] = timeToString(currentTime);
            setTimeout(function() {$scope.$apply(function(){refreshArray()})}, (secsUntil*1000+1000));
        }

    }]);