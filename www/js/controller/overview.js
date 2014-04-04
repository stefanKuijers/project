angular.module('project.controller.overview', ['project.service.medicins'])
   .controller('OverviewCtrl', function($scope, Medicins) {
      $scope.meds = Medicins.get();
   })
;