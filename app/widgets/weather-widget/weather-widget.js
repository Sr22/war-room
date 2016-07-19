
angular
			.module('warRoom')
			.directive('weatherWidget', weatherWidget);

		function weatherWidget() {
			var directive = {
				restrict: 'EA',
				templateUrl: 'widgets/weather-widget/weather-widget.html',
				scope: {
				   
				},
				controller:weatherWidgetController,
				controllerAs: 'vm',
				bindToController: true
			};

			return directive;
		}


		function weatherWidgetController() {
				var key = '554c13e36146f43e';
			
				var zip =" "
				var vm = this;
			
				vm.keypressDown = function (){
					alert ("working!")
					if(event.which==13)
					{
						vm.find(); //fix
					}
				}
				vm.find = function(){
			zip = $("#weather-search").val();
						   console.log(zip)  
							var weather = 'https://api.wunderground.com/api/554c13e36146f43e/forecast/geolookup/conditions/q/'+zip+'.json'                 
							$.ajax({
							async: true,
							url: weather,
		success : function(data) {
		 //console.log(JSON.stringify(data));
				var loc = data['location']['city'];
				var temp = data['current_observation']['temp_f'];
				var img = data['current_observation']['icon_url'];
				var desc = data['current_observation']['weather'];
				var wind = data['current_observation']['wind_string'];
		console.log("wind=" + wind, "desc=", desc, "loc=", loc)
				$('#loc').html(loc);
				$('#temp').html(temp);
				$('#desc').html(desc);
				$('#wind').html(wind);
			}
		})
	};
}


	
//});  
//FIGURE OUT ANGULAR DOC
//FIGURE OUT 
//console.log(JSON.stringify(loc))
