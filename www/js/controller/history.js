angular.module('project.controller.history', ['project.service.phonestorage','project.service.util', 'project.directive.history_med'])
   .controller('HistoryCtrl', ['$scope', '$filter', 'Phonestorage','Util', function($scope, $filter, Phonestorage, Util) {
      $scope.med_history = {};

      var history_overview_listener = $scope.$on(Phonestorage.events.MED_HISTORY_OVERVIEW_RETRIEVED, function(e, result) {
         history_overview_listener();
         var history_day = function(med_event, i) {
            return {
               index_date: index_date(med_event.date),
               date: parse_date(med_event.date, 'dd-MMM-yyyy'),
               meds : [parse_med(med_event)]
            }
         }
         var i;
         for (i=0; i < result.rows.length; i++) { // forming the over view object bases on key dates
            if ($scope.med_history[result.rows.item(i).date])
               $scope.med_history[result.rows.item(i).date].meds.push(parse_med(result.rows.item(i)));
            else
               $scope.med_history[result.rows.item(i).date] = new history_day(result.rows.item(i), i);
         }

         $scope.med_history_array = [];
         for (med in $scope.med_history) { // parsing to array so its sortable
            $scope.med_history_array.push($scope.med_history[med]);
         }
         $scope.med_history_array = $filter('orderBy')($scope.med_history_array, '-index_date', false);
         $scope.$apply();
            
      });
      Phonestorage.get_history_overview($scope); // triggers all above by getting all the meds from the history

      function parse_med(med_event) {
         var med = angular.copy(med_event);

         if (med.status === -1 || med.status === -2)
            med.status_class = "not";
         else if (med.status === 1)
            med.status_class = "to-late";
         else
            med.status_class = "on-time";

         med.date = parse_date(med.date, 'dd-MMMM-yyyy');
         med.interactions = (med.interactions == null || med.interactions.match(/null/i) || med.interactions == 'undefined') ? false : JSON.parse(med.interactions);

         return med;
      }

      function parse_date(date, format) {
         var date_to_string = Date.parse(date).toString(format).toLowerCase();
         
         return date_to_string
            .replace('mar', 'maa')
            .replace('may', 'mei')
            .replace('ch', 'rt')
            .replace('oct', 'okt')
            .replace('july', 'juli')
            .replace('june', 'juni')
            .replace('y', 'ie')
            .replace('august', 'augustus')
            .replace('-', ' ')
            .replace('-', ' ');
      }

      function index_date(date) {
        return Date.parse(date).toString('yyyy-MM-dd').replace('-', '').replace('-', '');
      }
   }])
;