angular.module('warRoom')
		.controller('weatherWidgetController', ['$scope', 'weatherApiService','widgetService', function($scope, weatherApiService, widgetService) {
			
				$scope.zip;
				$scope.temperature;
				$scope.place;
				$scope.windspeed;
				$scope.description;
				
				
			
				$scope.keypressDown = function (){
					alert ("working!")
					if(event.which==13)
					{
						$scope.find(); 
					}
				}

				$scope.find = function (){
					console.log($scope)
					console.log('ZIP',$scope.zip)
					weatherApiService.getWeather($scope.zip, function success(place, temperature, description, windspeed){
						$scope.temperature = temperature;
						$scope.place = place;
						$scope.windspeed = windspeed;
						$scope.description = description;
					} //function error(errorMessage) {

					//}
						)
				}


			}])