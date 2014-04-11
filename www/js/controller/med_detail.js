angular.module('project.controller.med_info', ['project.service.phonestorage'])
   .controller('MedInfoCtrl', function($scope, $stateParams, $filter, Phonestorage) {
      if (Phonestorage.initialized) 
         get_med();
      else
         $scope.$on(Phonestorage.events.STORAGE_READY, get_med);

      function get_med() {
         Phonestorage.get_medicin_and_times($scope, $stateParams.id);

         $scope.$on(Phonestorage.events.MED_RETRIEVED, function(e, result) {
            $scope.med = result.rows.item(0);
            for (var i = 0; i < result.rows.length; i++)
               console.log(result.rows.item(i));

            $scope.$apply();
         });

         $scope.$on(Phonestorage.events.MED_TIMES_RETRIEVED, function(e, result) {
            $scope.times = [];

            for (var i = 0; i < result.rows.length; i++)
               $scope.times[i] = result.rows.item(i);

            $scope.times = $filter('orderBy')($scope.times, 'time', false);
            $scope.$apply();
         });
      }
   })
;