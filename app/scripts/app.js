'use strict';

/**
 * @ngdoc overview
 * @name notesApp
 * @description
 * # notesApp
 *
 * Main module of the application.
 */
angular
  .module('Notes', ['ngRoute', 'ngSanitize', 'ngMaterial', 'ng-mfb', 'ngStorage', 'gridster'])
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'NotesController'
      });

    $mdIconProvider
      .defaultIconSet("./styles/svg/avatars.svg", 128)
      .icon("menu", "./styles/svg/menu.svg", 24);

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
  });
