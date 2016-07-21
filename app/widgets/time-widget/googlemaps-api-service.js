angular.module('warRoom')

    .service('googlemapsApiService',['$resource','googlemapsApiKey', function($resource, googlemapsApiKey){
        return {
            getCoordinates : function(placeId, callback){
                $resource('https://maps.googleapis.com/maps/api/geocode/json?place_id=:placeId&key=:googlemapsApiKey').get({
                    placeId: placeId,
                    googlemapsApiKey: googlemapsApiKey
                }, function(response) {
                    latitude = response.results[0].geometry.location.lat;
                    longitude = response.results[0].geometry.location.lng;
                    if (callback) {
                        callback(latitude,longitude);
                    }
                });
            },

            autoComplete : function(city, callback){
                $resource('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=:city&types=(cities)&language=en&key=:googlemapsApiKey').get({
                    city: city,
                    googlemapsApiKey: googlemapsApiKey
                }, function(response){
                    cityList = response.predictions;
                    if(callback){
                        callback(cityList);
                    }
                });
            }

        };
    }])