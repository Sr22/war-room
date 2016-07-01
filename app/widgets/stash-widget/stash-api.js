angular.module('warRoom')
,
.service('stashApiService', ['$resource', '', function ($resource) {
  return {
    setCredentials : function (username, password) {
      if (!username && !password) {
        this.clearCredentials();
      } else {
        
      }
    },
    
    clearCredentials : function () {
      
    },
    
    getPullRequests : function ()
  }
}]);
