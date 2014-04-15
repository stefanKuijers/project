angular.module('project.controller.new_med_type', ['project.service.api', 'project.directive.search'])
   .controller('NewMedTypeCtrl', function($scope, API) {
      console.log("new med type ctrl");

      $scope.$on(API.events.AUTO_COMPLETE_LIST_RETRIEVED, function(e, result) {
         $scope.auto_list = result;
      });
      API.get_auto_complete_list($scope);
   })
;