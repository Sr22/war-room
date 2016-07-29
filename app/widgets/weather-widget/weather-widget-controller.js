angular.module('warRoom')
		.controller('weatherWidgetController', ['$scope', 'weatherApiService','widgetService', function($scope, weatherApiService, widgetService) {
			
				$scope.zip = null;
				$scope.temperature = null;
				$scope.place = null;
				$scope.windspeed = null;
				$scope.description = null;
			    $scope.hide = true;
				
				
			
				$scope.keypressDown = function (){
					if(event.which==13)
					{
						$scope.find();  
					}

				}

				$scope.find = function () {
					console.log($scope)
					console.log('ZIP', $scope.zip)
					weatherApiService.getWeather($scope.zip, function success(place, temperature, description, windspeed) {
						$scope.temperature = temperature;
						$scope.place = place;
						$scope.windspeed = windspeed;
						$scope.description = description;
						$scope.hide = false;
						$scope.colorOutput = '';

						if ($scope.temperature < 40.0) {
							$scope.colorOutput = "#B0C4DE"; //blue
						}
						else if ($scope.temperature >= 40 && $scope.temperature <= 50) {
							$scope.colorOutput = "	#FFD700"; //gold
						}

						else if ($scope.temperature >= 50 && $scope.temperature <= 70) {
							$scope.colorOutput = "	#FF8C00"; //orange
						}
						else {
							$scope.colorOutput = "#FF6347"; //red
						
						}
				
						$('#forecast').css('background', $scope.colorOutput);
						
					});
				}
			}])