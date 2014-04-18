angular.module('project.controller.overview', ['project.service.phonestorage'])
   .controller('OverviewCtrl', ['$scope', '$filter', 'Phonestorage', function($scope, $filter, Phonestorage) {
      if (Phonestorage.initialized) 
         get_meds();
      else
         $scope.$on(Phonestorage.events.STORAGE_READY, get_meds);

      function get_meds() {
         Phonestorage.get_med_overview($scope);
         $scope.med_overview = [];
         $scope.$on(Phonestorage.events.MED_OVERVIEW_RETRIEVED, function(e, result) {
            for (var i = 0; i < result.rows.length; i++){
               $scope.med_overview[i] = result.rows.item(i);
            }

            $scope.med_overview = $filter('orderBy')($scope.med_overview, 'trade_name', false);
            $scope.med_overview = $filter('orderBy')($scope.med_overview, 'time', false);

            var prevTime;
            for (i = 0; i < result.rows.length; i++){
               $scope.med_overview[i].time_header = $scope.med_overview[i].time !== prevTime;
               prevTime = $scope.med_overview[i].time;
            }

            $scope.$apply();
         });
      }     
   }])
;