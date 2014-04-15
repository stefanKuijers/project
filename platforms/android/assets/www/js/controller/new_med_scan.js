angular.module('project.controller.new_med_scan', ['project.service.api', 'project.service.phonestorage'])
   .controller('NewMedScanCtrl', function($scope, API, Phonestorage) {
      
      // fake data that could be extracted from a scan
      $scope.current_scan = {
         code: 12345678902
      }

      $scope.choose_scan = function() {
         var med_prescribed = window.localStorage.getItem("new_med_prescribed") == 'true'; // retrieve and typecast to boolean
         $scope.$on(API.events.SAFE_MED_RETRIEVED, function(e, medicin) {
            
            alert("medicin retrieved " + medicin.trade_name);
            $scope.$on(Phonestorage.events.MED_ADDED, function(e, result) {
               alert("medicin saved " + result.insertId);
               window.location = "#/medicijn-detail/" + result.insertId;
            });
            Phonestorage.add_medicin(medicin, $scope);
         });
         
         API.get_med_by(API.config.get_med_by.code, $scope.current_scan.code, med_prescribed, $scope);
      }
   })
;