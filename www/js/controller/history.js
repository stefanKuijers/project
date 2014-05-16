angular.module('project.controller.history', ['project.service.phonestorage', 'project.directive.history_med'])
   .controller('HistoryCtrl', ['$scope', 'Phonestorage', function($scope, Phonestorage) {
      $scope.med_history = {};

      var history_overview_listener = $scope.$on(Phonestorage.events.MED_HISTORY_OVERVIEW_RETRIEVED, function(e, result) {
         var history_day = function(med_event) {
            return {
               date: med_event.date,
               meds : [parse_med(med_event)]
            }
         }

         for (var i=0; i < result.rows.length; i++) {
            if ($scope.med_history[result.rows.item(i).date])
               $scope.med_history[result.rows.item(i).date].meds.push(parse_med(result.rows.item(i)));
            else
               $scope.med_history[result.rows.item(i).date] = new history_day(result.rows.item(i));

         }
         $scope.$apply();
         console.log($scope.med_history);

      });
      Phonestorage.get_history_overview($scope);

      function parse_med(med_event) {
         var med = angular.copy(med_event);

         if (med.status === -1)
            med.status_class = "not";
         else if (med.status === 1)
            med.status_class = "to-late";
         else
            med.status_class = "on-time";

         // get a human readable date

         return med;
      }
   }])
;