var app = angular.module('warRoom', []);

// http://www.bennadel.com/blog/2553-loading-angularjs-components-after-your-application-has-been-bootstrapped.htm
app.config(['$controllerProvider', '$provide', '$compileProvider', function($controllerProvider, $provide, $compileProvider) {
  app._controller = app.controller;
  app._service = app.service;
  app._factory = app.factory;
  app._value = app.value;
  app._directive = app.directive;
  
  // Provider-based controller.
  app.controller = function( name, constructor ) {
      $controllerProvider.register( name, constructor );
      return this;
  };
  // Provider-based service.
  app.service = function( name, constructor ) {
      $provide.service( name, constructor );
      return this;
  };
  // Provider-based factory.
  app.factory = function( name, factory ) {
      $provide.factory( name, factory );
      return this;
  };
  // Provider-based value.
  app.value = function( name, value ) {
      $provide.value( name, value );
      return this;
  }; 
  // Provider-based directive.
  app.directive = function( name, factory ) {
      $compileProvider.directive( name, factory );
      return this;
  };
}]);