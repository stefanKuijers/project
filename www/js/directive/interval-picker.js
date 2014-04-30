angular.module('project.directive.interval_picker', [])
   .directive("pjIntervalPicker", [function() {
      return {
         template: 
            '<div class="row">' +
               '<div class="col"> ' +
                  '<ion-radio ng-click="set_value(\'maandelijks\')">Maandelijks</ion-radio>' +
                  '<ion-radio ng-click="set_value(\'weekelijks\')">Weekelijks</ion-radio>' +
                  '<ion-radio ng-click="set_value(\'dagelijks\')">Dagelijks</ion-radio>' +
               '</div>' + 
            '</div>'
         ,
         link: function($scope, $elem, $attrs) {
            var old_value = $scope.$parent.dose.interval;

            $scope.set_value = function(new_value) {
               console.log(new_value);
               $scope.$parent.set_new_value($scope.$parent.dose_keys.interval, new_value);
            }

            $scope.$parent.set_new_value($scope.$parent.dose_keys.interval, old_value);
         } 
      }
   }])
;