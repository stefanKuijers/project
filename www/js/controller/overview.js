angular.module('project.controller.overview', ['project.service.phonestorage'])
   .controller('OverviewCtrl', ['$scope', '$filter', 'Phonestorage', function($scope, $filter, Phonestorage) {
      if (Phonestorage.initialized) 
         get_meds();
      else
         $scope.$on(Phonestorage.events.STORAGE_READY, get_meds);

      function get_meds() {
         $scope.med_overview = [];
         var get_overview_listener = $scope.$on(Phonestorage.events.MED_OVERVIEW_RETRIEVED, function(e, result) {
            get_overview_listener();
            
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
         Phonestorage.get_med_overview($scope);
      }     
   }])
;