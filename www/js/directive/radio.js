angular.module('project.directive.radio', [])
   .directive("pjRadio", [function() {
      return {
         link: function(scope, elem, attrs) {
            scope.toggle_radio = function(value) {
               scope.set_answer(value);
            }
         } 
      }
   }])
;