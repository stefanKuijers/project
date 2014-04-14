angular.module('project.controller.new_med_type', ['project.service.phonestorage'])
   .controller('NewMedTypeCtrl', function($scope, Phonestorage) {
      if (Phonestorage.initialized) 
         get_auto_complete_list();
      else
         $scope.$on(Phonestorage.events.STORAGE_READY, get_auto_complete_list);

      function get_auto_complete_list() {
         Phonestorage.get_auto_complete_list($scope);

         $scope.$on(Phonestorage.events.COMPLETE_LIST_RETRIEVED, function(e, result) {
            $scope.auto_complete_list = [];
            for (var i = 0; i < result.rows.length; i++)
               $scope.auto_complete_list[i] = result.rows.item(i);

            // $scope.$apply();
         });
      }
   })
;