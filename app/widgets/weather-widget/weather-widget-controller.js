angular.module('warRoom')
		.controller('weatherWidgetController', ['$scope', 'weatherApiService','widgetService', function($scope, weatherApiService, widgetService) {
			
				$scope.zip;
				$scope.temperature;
				$scope.place;
				$scope.windspeed;
				$scope.description;
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


						function error(errorMessage) {
							$('#alert').html('<div class="alert alert-danger fade in"><a class="close" data-dismiss="alert"></a><span>Please enter correct zipcode or city!.</span></div>');

							$('#alert').fadeTo(2000, 500).slideUp(500, function () {
								$('#alert').alert('close');
							});
						}
					});
				}
			}])