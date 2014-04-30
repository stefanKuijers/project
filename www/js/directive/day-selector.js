angular.module('project.directive.day_selector', [])
   .directive("pjDaySelector", [function() {
      return {
         template:
            '<div class="row">' +
               '<div class="col"> ' +
                  '<ion-checkbox ng-model="days.monday">Maandag</ion-checkbox>' +
                  '<ion-checkbox ng-model="days.tuesday">Dinsdag</ion-checkbox>' +
                  '<ion-checkbox ng-model="days.wednesday">Woensdag</ion-checkbox>' +
                  '<ion-checkbox ng-model="days.thursday">Donderdag</ion-checkbox>' +
                  '<ion-checkbox ng-model="days.friday">Vrijdag</ion-checkbox>' +
                  '<ion-checkbox ng-model="days.saturday">Zaterdag</ion-checkbox>' +
                  '<ion-checkbox ng-model="days.sunday">Zondag</ion-checkbox>' +
               '</div>' + 
            '</div>'
         ,
         link: function($scope, $elem, $attrs) {
            var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            var populate_choises = typeof $scope.$parent.dose.days !== 'object';
            $scope.days = $scope.$parent.dose.days || {};
            

            for (var i = 0; i < days.length; i++) {
               if (populate_choises)
                  $scope.days[days[i]] = false;

               $scope.$watch('days.' + days[i], function(e,ee) {
                  $scope.$parent.set_new_value($scope.$parent.dose_keys.days, $scope.days);
               });
            }


            $scope.$parent.set_new_value($scope.$parent.dose_keys.days, $scope.days);
         } 
      }
   }])
;