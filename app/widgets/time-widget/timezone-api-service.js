angular.module('warRoom')

    .service('timezoneApiService',['$resource', function($resource){
        return {
            getTime: function(latitude, longitude, callback){
                $resource('http://api.timezonedb.com/v2/get-time-zone?key=WKXE0BXV0YGO&format=json&by=position&lat=:latitude&lng=:longitude').get({
                        latitude: latitude,
                        longitude: longitude
                    }, function(response){
                        time = response['timestamp'];
                        if(callback){
                            callback(time);
                        }
                    }
                );
            }
        };
    }]);