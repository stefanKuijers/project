angular.module('project.directive.dosis_time', [])
   .directive("myCostumer", function() {
      console.log("directive called");
      return {
         link: function(scope, elem, attrs) {
            var duration = parseInt(attrs.mmBox);
            scope.doBoxClick = function(value) {
               console.log("called", scope, elem, attrs);
            }
         }
      }
   })
;