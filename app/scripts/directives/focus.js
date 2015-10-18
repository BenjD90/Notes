/**
 * Created by Benjamin on 14/10/2015.
 */
angular
  .module('Notes').directive('focusMe', function ($timeout) {
    return {
      scope: {trigger: '@focusMe'},
      link: function (scope, element) {
        scope.$watch('trigger', function (value) {
          if (value === "true") {
            $timeout(function () {
              element[0].focus();
            }, 600);
          }
        });
      }
    };
  });
