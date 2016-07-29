angular.module('warRoom')
     
    .service('weatherApiService', ['$resource',function ($resource) {
        return {
            getWeather: function (zipCode, callback, errCallback) {
                $resource('https://api.wunderground.com/api/776855d02b129960/forecast/geolookup/conditions/q/:zip.json').get({
                        zip: zipCode

                    },

                   function (response) {
                       console.info(response);

                            place = response.location.city;
                            temperature = response.current_observation.temp_f;
                            description = response.current_observation.weather;
                            windspeed = response.current_observation.wind_string;

                            if (callback) {
                                callback(place, temperature, description, windspeed);
                            }


                    }
                )
            }
        }

    }])


/*
 array
 string
 object
 number
 boolean
 function
 */