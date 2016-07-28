angular.module('warRoom')

    .controller('timeWidgetController',['$scope','$interval','$timeout', 'googlemapsApiService', 'timezoneApiService', 'widgetService', function($scope, $interval, $timeout, googlemapsApiService, timezoneApiService, widgetService) {
        var vm = this;
        vm.time='';//the city's time in the array that is eventually pushed to the time array
        vm.cityInput='';//the value of what the user types
        $scope.lat='';//self-explanatory
        $scope.longit='';//see above
        $scope.numInList=0; //autocomplete list length
        $scope.onlyCity=''; //the only city name in the autocomplete list when enter button is pressed
        $scope.tf1 = true; //whether the tab is hidden or not
        $scope.tf2 = true;
        $scope.tf3 = true;
        $scope.tf4 = true;
        $scope.tf5 = true;
        $scope.placeInTab=1;
        $scope.officialName = '';
        $scope.tabNames = [];
        $scope.timeArr = [];
        $scope.cityArr = [];
        $scope.deltaTime = []; // difference between local time and given city's time
        var date;
        var secsUntil; //seconds until next change in minute
        var firstOne;
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
            date= new Date(timeInMillis);
            var hours= date.getHours()-5;
            var min= date.getMinutes();
            var am = false;
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
        };



        $scope.deleteTab= function(cityName) {
            if($scope.placeInTab>1){
                $scope.placeInTab--;
            }

            var index= $scope.tabNames.indexOf(cityName);
            var tempCity=[];
            var tempTime=[];
            var tempDelta=[];
            for (var j=0; j<index; j++) {
                tempDelta[j]=$scope.deltaTime[j];
                tempCity[j]=$scope.tabNames[j];
                tempTime[j]=$scope.timeArr[j];
            }

            for(var i=index; i<$scope.tabNames.length-1;i++) {
                tempDelta[i]=$scope.deltaTime[i+1];
                tempCity[i]= $scope.tabNames[i+1];
                tempTime[i]=$scope.timeArr[i+1];
            }
            $scope.deltaTime=tempDelta;
            $scope.tabNames=tempCity;
            $scope.timeArr=tempTime;

            if ($scope.tabNames.length==0) {
                $scope.tf1=true;
            }
            else if ($scope.tabNames.length==1) {
                $scope.tf2=true;
            }
            else if ($scope.tabNames.length==2) {
                $scope.tf3=true;
            }
            else if ($scope.tabNames.length==3) {
                $scope.tf4=true;
            }
            else {
                $scope.tf5=true;
            }
        };

        $scope.nextTab = function() {
            if($scope.tf1 == false) {
                if($scope.tf2 == true) {
                    $scope.tf2 = false;
                    $scope.placeInTab=2;
                } else {
                    if($scope.tf3 == true) {
                        $scope.tf3 = false;
                        $scope.placeInTab=3;
                    } else {
                        if($scope.tf4 == true) {
                            $scope.tf4 = false;
                            $scope.placeInTab=4;
                        } else {
                            if($scope.tf5 == true) {
                                $scope.tf5 = false;
                                $scope.placeInTab=5;

                            } else {
                                $('#alert').html('<div class="alert alert-danger fade in"><a class="close" data-dismiss="alert"></a><span>You have reached the tab limit.</span></div>');

                                $('#alert').fadeTo(2000, 500).slideUp(500, function() {
                                    $('#alert').alert('close');
                                });
                            }
                        }
                    }
                }
            } else{
                $scope.tf1 = false;
            };
            $scope.tabName();
        };

        $scope.tabName = function () {
            if ($scope.tabNames.length < 5) {
                $scope.tabNames.push($scope.officialName);
            }
        };

        $scope.pushTimeArr = function() {

            if ($scope.tabNames.length <= 5) {
                $scope.timeArr.push($scope.time);
            }
        };

        $scope.pressEnter= function() {
            if(typeof(cityList[0]) == 'undefined') {
                $('#alert').html('<div class="alert alert-danger fade in"><a class="close" data-dismiss="alert"></a><span>Please enter something.</span></div>');

                $('#alert').fadeTo(2000, 500).slideUp(500, function() {
                    $('#alert').alert('close');
                });
            } else if(($scope.tabNames.indexOf(cityList[0].description))!=-1) {
                $('#alert').html('<div class="alert alert-warning fade in"><a class="close" data-dismiss="alert"></a><span>This city already exists in your tabs. Try another one!</span></div>');

                $('#alert').fadeTo(2000, 500).slideUp(500, function() {
                    $('#alert').alert('close');
                });
            } else {
                if($scope.numInList === 1) {
                    $scope.officialName = cityList[0].description;
                    $scope.onlyCity = cityList[0].place_id;
                    $scope.nextTab();
                    $scope.cityArr.length=0;
                    vm.cityInput = '';
                    googlemapsApiService.getCoordinates($scope.onlyCity, function(latitude, longitude) {
                        lat = latitude;
                        longit = longitude;
                        timezoneApiService.getTime(lat, longit, function (timestamp) {
                            $scope.deltaTime[$scope.placeInTab-1] = (timestamp * 1000) - Date.now();
                            $scope.indexInTab = $scope.tabNames.indexOf(name);
                            $scope.pushTimeArr();
                            date = new Date();
                            secsUntil = 60-date.getSeconds();
                            updateTimeArray();


                            if($scope.tabNames.length==1) {
                                $timeout(startInterval, (secsUntil * 1000), 1);
                            }

                        });
                    });


                    //if there's only one city and the person presses enter, then we can get the (only) placeId in the list
                    //and call the api to get longlat and then eventually the time
                } else {
                    $('#alert').html('<div class="alert alert-danger fade in"><a class="close" data-dismiss="alert"></a><span>Please enter more characters; there are multiple cities shown.</span></div>');

                    $('#alert').fadeTo(2000, 500).slideUp(500, function() {
                        $('#alert').alert('close');
                    });

                }
            }
        };

        $scope.placeClick= function(name, placeId) {
            $scope.officialName = name;
            if (($scope.tabNames.indexOf(name)) != -1) {

                $('#alert').html('<div class="alert alert-warning fade in"><a class="close" data-dismiss="alert"></a><span>This city already exists in your tabs. Try another one!</span></div>');

                $('#alert').fadeTo(2000, 500).slideUp(500, function() {
                    $('#alert').alert('close');
                });
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
                        $scope.pushTimeArr();
                        date = new Date();
                        secsUntil = 60-date.getSeconds();
                        updateTimeArray();


                        if($scope.tabNames.length==1) {
                            $timeout(startInterval, (secsUntil * 1000), 1);
                        }

                    });
                });
            }
        };
        var startInterval= function() {
            updateTimeArray();
            $interval(updateTimeArray,60*1000);
        };


        var updateTimeArray = function() {
            for(var j=0;j<$scope.timeArr.length; j++) {
                var currentTime = $scope.deltaTime[j] + Date.now();
                $scope.timeArr[j] = timeToString(currentTime+2000);
                date= new Date();
            }
        }
    }]);