angular.module('project.controller.new_med_type', ['project.service.api', 'project.service.phonestorage', 'project.directive.search'])
   .controller('NewMedTypeCtrl', function($scope, API, Phonestorage) {
      $scope.$on(API.events.AUTO_COMPLETE_LIST_RETRIEVED, function(e, result) {
         $scope.auto_list = result;
      });
      API.get_auto_complete_list($scope);

      $scope.choose_result = function(med_name) {

         var med_prescribed = window.localStorage.getItem("new_med_prescribed") == 'true'; // retrieve and typecast to boolean
         $scope.$on(API.events.SAFE_MED_RETRIEVED, function(e, medicin) {
            
            $scope.$on(Phonestorage.events.MED_ADDED, function(e, result) {
               window.location = "#/medicijn-detail/" + result.insertId;
            });
            Phonestorage.add_medicin(medicin, $scope);
         });
         
         API.get_medicin_by_name(med_name, med_prescribed, $scope);
      }
   })
;