angular.module('project.controller.overview', ['project.service.user.medicins'])
   .controller('OverviewCtrl', function($scope, Medicins) {
      Medicins.parse();
      var i = 0;
      $scope.meds = Medicins.get();
      console.log($scope.meds);

      $scope.log = i + ": " + Medicins.get_log();
      console.log(Medicins.get_log());

      setInterval(function() {
         $scope.log = i++ + ": " + Medicins.get_log();
         $scope.$apply();
      }, 1000);
      
   })
;