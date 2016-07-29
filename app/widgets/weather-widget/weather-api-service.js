angular.module('warRoom')
    .service('weatherApiService', ['$resource',function ($resource) {
        return {
            getWeather: function (zipCode, callback, errCallback) {
                $resource('https://api.wunderground.com/api/554c13e36146f43e/forecast/geolookup/conditions/q/:zip.json').get({
                        zip: zipCode

                    },
                    function (response) {
                        try {
                            place = response.location.city;
                            temperature = response.current_observation.temp_f;
                            description = response.current_observation.weather;
                            windspeed = response.current_observation.wind_string;

                            if (callback) {
                                callback(place, temperature, description, windspeed);
                            }
                        } catch (err) {
                            console.log('ERROR' + err)
                            // Send back 'err'
                            errCallback(err)
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