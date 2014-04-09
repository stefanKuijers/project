angular.module('project.controller.overview', ['project.service.user.medicins'])
   .controller('OverviewCtrl', function($scope, Medicins) {
      Medicins.Phonestorage.init($scope);

      Medicins.parse();
      var i = 0;
      $scope.meds = Medicins.get();
      
      $scope.$on("MED_DATA_RETRIEVED", function(e, result) {
         console.log("Med data was retrieved", result);
      });      
   })
;