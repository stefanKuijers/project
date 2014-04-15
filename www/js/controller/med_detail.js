angular.module('project.controller.med_info', ['project.service.phonestorage', 'project.directive.dose_item'])
   .controller('MedInfoCtrl', function($scope, $stateParams, $filter, Phonestorage) {
      $scope.times = false;

      if (Phonestorage.initialized) 
         get_med();
      else
         $scope.$on(Phonestorage.events.STORAGE_READY, get_med);

      function get_med() {
         Phonestorage.get_medicin_and_times($scope, $stateParams.id);

         $scope.$on(Phonestorage.events.MED_RETRIEVED, function(e, result) {
            $scope.med = result.rows.item(0);
            for (var i = 0; i < result.rows.length; i++)
               console.log("med retrieved @med_detail", result.rows.item(i));

            $scope.$apply();
         });

         $scope.$on(Phonestorage.events.MED_TIMES_RETRIEVED, function(e, result) {
            $scope.times = [];

            for (var i = 0; i < result.rows.length; i++) {
               $scope.times[i] = result.rows.item(i);
               $scope.times[i].editable = false;
            }

            $scope.order_times();
            $scope.$apply();
         });
      }

      $scope.order_times = function() {
         $scope.times = $filter('orderBy')($scope.times, 'time', false);
      }

      var editing_dose_id = null;
      $scope.get_editing_id = function () {return editing_dose_id}
      $scope.set_editing_id = function (value) {editing_dose_id = value}


      $scope.get_time = function(id) {
         for (var i = 0; i < $scope.times.length; i++) 
            if ($scope.times[i].id == id) return {index: i, time_object:$scope.times[i]}; 

         return false;
      }

      $scope.insert_dose_time = function(index, time, amount, reoccurence, reminder, interval_unit, med_id) {
         Phonestorage.insert_dose_time(time, amount, reoccurence, reminder, interval_unit, med_id, $scope);
         $scope.$on(Phonestorage.events.DOSE_INSERTED, function(e, result) {
            $scope.times.push({
               time: time,
               amount: amount,
               editable: false,
               id: result.insertId
            });

            $scope.times.splice(index, 1);
            $scope.$apply();
         });
      }

      $scope.update_dose_time = function(index, time, amount) {
         Phonestorage.update_dose_time($scope.times[index].id, time, amount);

         $scope.times.push({
            time: time,
            amount: amount,
            editable: $scope.times[index].editable,
            id: $scope.times[index].id
         });

         $scope.times.splice(index, 1);
      }

      $scope.delete_dose_time = function(id) {
         Phonestorage.delete_dose_time(id);
         $scope.times.splice($scope.get_time(id).index, 1);
      }

      console.log($scope.times);
   })
;