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
      });

      // $scope.update_dosis = function(id, property, new_value) {
      //    console.log(id, property, new_value);
      //    var dosis = $scope.get_time(id);

      //    dosis.time_object[property] = new_value;
      // }

      // var editing_dose_id = null;
      // $scope.get_editing_id = function () {return editing_dose_id}
      // $scope.set_editing_id = function (value) {editing_dose_id = value}


      // $scope.get_time = function(id) {
      //    for (var i = 0; i < $scope.times.length; i++) 
      //       if ($scope.times[i].id == id) return {index: i, time_object:$scope.times[i]}; 

      //    return false;
      // }

      // $scope.insert_dose_time = function(index, med_id) {
      //    var listenForInsert = $scope.$on(Phonestorage.events.DOSE_INSERTED, function(e, result) {
      //       listenForInsert(); // unbind listener

      //       $scope.times[index].id = result.insertId;
            
      //       $scope.order_times();
      //       $scope.$apply();
      //    });

      //    Phonestorage.insert_dose_time(fake_add_properties($scope.times[index]), med_id, $scope);
      // }

      // $scope.update_dose_time = function(index) {
      //    var update_dose_listener = $scope.$on(Phonestorage.events.DOSE_UPDATED, function(e, result) {
      //       update_dose_listener();

      //       Notification.add($scope.times[index].time);
      //    });
      //    Phonestorage.update_dose_time(fake_add_properties($scope.times[index]), $scope);
         
      //    $scope.order_times();
      // }

      // function fake_add_properties(dose_time) {
      //    var fake_dose_time = angular.copy(dose_time);
      //    fake_dose_time.reoccurence = 1; 
      //    fake_dose_time.reminder_task_id = 1;
      //    fake_dose_time.interval_unit = 1;

      //    return fake_dose_time
      // }

      // $scope.delete_dose_time = function(id) {
      //    Phonestorage.delete_dose_time(id);
      //    $scope.times.splice($scope.get_time(id).index, 1);
      // }
   }])
;