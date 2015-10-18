'use strict';

/**
 * @ngdoc function
 * @name notesApp.controller:MenucontrollerCtrl
 * @description
 * # MenucontrollerCtrl
 * Controller of the notesApp
 */
angular.module('Notes')
  .controller('MenuController', function ($rootScope, $scope, $mdSidenav) {
    $rootScope.filter = 'TODO';

    $scope.changeFilter = function(newFilter) {
      $rootScope.filter = newFilter;
    }
  });
