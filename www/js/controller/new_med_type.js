angular.module('project.controller.new_med_type', ['project.service.api', 'project.directive.search'])
   .controller('NewMedTypeCtrl', function($scope, API) {
      console.log("new med type ctrl");

      $scope.$on(API.events.AUTO_COMPLETE_LIST_RETRIEVED, function(e, result) {
         $scope.auto_list = result;
      });
      API.get_auto_complete_list($scope);

      $scope.choose_result = function(med_name) {
         console.log("result chosen", med_name);

         var med_prescribed = window.localStorage.getItem("new_med_prescribed") == 'true'; // retrieve and typecast to boolean
         $scope.$on(API.events.SAFE_MED_RETRIEVED, function(e, result) {
            console.log("got med back from API", result);
            // window.location = "#/";
         });
         
         API.get_medicin_by_name(med_name, med_prescribed, $scope);
      }
   })
;