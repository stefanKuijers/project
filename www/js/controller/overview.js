angular.module('project.controller.overview', ['project.service.user.medicins'])
   .controller('OverviewCtrl', function($scope, Medicins) {
      Medicins.parse();

      $scope.meds = Medicins.get();
      console.log($scope.meds);
   })
;