angular.module('project.controller.overview', ['project.service.user.medicins', 'project.service.phonestorage'])
   .controller('OverviewCtrl', function($ionicPlatform, $scope, Medicins, Phonestorage) {
      if (Phonestorage.initialized) 
         get_meds();
      else
         $scope.$on(Phonestorage.events.STORAGE_READY, get_meds);

      function get_meds() {
         Phonestorage.get_medicins($scope);
         $scope.$on(Phonestorage.events.MEDS_RETRIEVED, function(e, result) {
            console.log("med looks like:", result.rows.item(0));
            // for (var i = 0; i < result.rows.length; i++){
            //    $scope[result.rows.item(i).key] = type_cast(result.rows.item(i).type, result.rows.item(i).value);
            // }
         });
      }
      
      Medicins.parse();
      var i = 0;
      $scope.meds = Medicins.get();
      
      console.log($scope);
      // $scope.$on("MED_DATA_RETRIEVED", function(e, result) {
      //    console.log("Med data was retrieved", result);
      // });      
   })
;