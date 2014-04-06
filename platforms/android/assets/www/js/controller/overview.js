angular.module('project.controller.overview', ['project.service.user.medicins'])
   .controller('OverviewCtrl', function($scope, Medicins) {
      $scope.meds = Medicins.get();
   })
;