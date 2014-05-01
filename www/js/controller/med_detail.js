angular.module(
   'project.controller.med_info', [

      'project.service.phonestorage', 
      'project.directive.dose_item', 
      'project.directive.time_picker',
      'project.directive.number_picker',
      'project.directive.interval_picker',
      'project.directive.day_selector',
      'project.service.notification'
   ])
   .controller('MedInfoCtrl', ['$scope', '$stateParams', '$filter', 'Phonestorage', 'Notification', function($scope, $stateParams, $filter, Phonestorage, Notification) {
      $scope.events = {
         DOSE_CHANGED: 'DOSE_CHANGED'
      }
      $scope.times = false;

      if (Phonestorage.initialized) 
         get_med();
      else
         $scope.$on(Phonestorage.events.STORAGE_READY, get_med);

      function get_med() {
         var get_med_listener = $scope.$on(Phonestorage.events.MED_RETRIEVED, function(e, result) {
            get_med_listener();

            $scope.med = result.rows.item(0);
            $scope.$apply();
         });

         var get_dosis_listener = $scope.$on(Phonestorage.events.MED_TIMES_RETRIEVED, function(e, result) {
            get_dosis_listener();

            $scope.times = [];
            for (var i = 0; i < result.rows.length; i++) {
               $scope.times[i] = angular.copy(result.rows.item(i));
               $scope.times[i].reminder = typeof $scope.times[i].reminder_task_id === 'number';

               if (typeof $scope.times[i].special_interval === 'string')
                  $scope.times[i].days = JSON.parse($scope.times[i].special_interval);
               else
                  $scope.times[i].days = false; 
            }

            $scope.order_times();
            $scope.$apply();
         });
         Phonestorage.get_medicin_and_times($scope, $stateParams.id);
      }

      $scope.order_times = function() {
         $scope.times = $filter('orderBy')($scope.times, 'time', false);
      }

      $scope.$on($scope.events.DOSE_CHANGED, function(e, updated_dose) {
         console.log("dose_changed", updated_dose);

         var update_dose_listener = $scope.$on(Phonestorage.events.DOSE_UPDATED, function(e, result) {
             update_dose_listener();
             console.log("dose saved to storage", result);
            //Notification.add($scope.times[index].time);
         });
         Phonestorage.update_dose_time(updated_dose.dose, $scope);
         
         $scope.order_times();
      });

      // $scope.insert_dose_time = function(index, med_id) {
      //    var listenForInsert = $scope.$on(Phonestorage.events.DOSE_INSERTED, function(e, result) {
      //       listenForInsert(); // unbind listener

      //       $scope.times[index].id = result.insertId;
            
      //       $scope.order_times();
      //       $scope.$apply();
      //    });

      //    Phonestorage.insert_dose_time(fake_add_properties($scope.times[index]), med_id, $scope);
      // }

      // $scope.delete_dose_time = function(id) {
      //    Phonestorage.delete_dose_time(id);
      //    $scope.times.splice($scope.get_time(id).index, 1);
      // }
   }])
;