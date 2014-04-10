angular.module('project.controller.overview', ['project.service.user.medicins', 'project.service.phonestorage'])
   .controller('OverviewCtrl', function($ionicPlatform, $scope, Medicins, Phonestorage) {
      $ionicPlatform.ready(function() {
         Phonestorage.init($scope);
      });

      $scope.$on("STORAGE_READY", function() {
         Phonestorage.get_settings($scope);
         $scope.$on("SETTINGS_RETRIEVED", function(e, result) {
            console.log("settings from database", result);
         });
      });

      


      // Medicins.parse();
      // var i = 0;
      // $scope.meds = Medicins.get();
      
      // $scope.$on("MED_DATA_RETRIEVED", function(e, result) {
      //    console.log("Med data was retrieved", result);
      // });      
   })
;