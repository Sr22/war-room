angular.module('warRoom')

.service(function () {
  return {
    initialize : function ($scope, obj) {
      console.log('Loaded stash-widget.');
    },
    
    serialize : function ($scope) {
      console.log('Saved stash-widget.');
      return {};
    }
  }
});