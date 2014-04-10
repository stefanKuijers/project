angular.module('project.controller.overview', ['project.service.user.medicins', 'project.service.phonestorage'])
   .controller('OverviewCtrl', function($ionicPlatform, $scope, Medicins, Phonestorage) {

      
      Medicins.parse();
      var i = 0;
      $scope.meds = Medicins.get();
      
      console.log($scope);
      // $scope.$on("MED_DATA_RETRIEVED", function(e, result) {
      //    console.log("Med data was retrieved", result);
      // });      
   })
;