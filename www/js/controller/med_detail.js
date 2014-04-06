angular.module('project.controller.med_info', ['project.service.user.medicins'])
   .controller('MedInfoCtrl', function($scope, $stateParams, Medicins) {
      Medicins.parse();
      $scope.med = Medicins.get($stateParams.id);
   })
;