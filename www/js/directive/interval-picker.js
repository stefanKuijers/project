angular.module('project.directive.interval_picker', [])
   .directive("pjIntervalPicker", [function() {
      return {
         template:
            '<div class="row">' +
               '<div class="col"> ' +
                  '<ion-radio ng-repeat="item in intervalList" ' +
                     'ng-value="item.value" ' +
                     'ng-model="data.interval"> ' +
                     '{{ item.text }} ' +
                  '</ion-radio>' +
               '</div>' + 
            '</div>'
         ,
         link: function($scope, $elem, $attrs) {
            var old_value = $scope.$parent.dose.interval;

            $scope.intervalList = [
               { text: "Eenmalig gebruik", value: "geen" },
               { text: "Dagelijks",        value: "dagelijks" },
               { text: "Weekelijks",       value: "weekelijks" }
            ];

            $scope.data = {
               interval: old_value
            };

            $scope.$watch('data.interval', function() {
               $scope.$parent.set_new_value($scope.$parent.dose_keys.interval, $scope.data.interval);
            });

            $scope.$parent.set_new_value($scope.$parent.dose_keys.interval, old_value);
         } 
      }
   }])
;