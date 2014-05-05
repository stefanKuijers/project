angular.module(
   'project.controller.med_info', [

      'project.service.phonestorage', 
      'project.directive.dose_item', 
      'project.directive.time_picker',
      'project.directive.number_picker',
      'project.directive.interval_picker',
      'project.directive.day_selector',
      'project.service.notification',
      'project.service.util'
   ])
   .controller('MedInfoCtrl', ['$scope', '$stateParams', '$filter', 'Phonestorage', 'Notification', 'Util', 'API', function($scope, $stateParams, $filter, Phonestorage, Notification, Util, API) {
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

            var med_interaction_listener = $scope.$on(API.events.MED_INTERACTION, function(e, result) {
               med_interaction_listener();
               console.log("interaction detected", result);
               $scope.interactions = result.med_interactions;
               // $scope.int_desc = result.med_interactions[0].description;
               // $scope.med_a = result.med_interactions[0].primary_med_name;
               // $scope.med_b = result.med_interactions[0].secondary_med_name;
               $scope.$apply();
            });
            API.get_med_interactions($scope.med, $scope);

         });

         var get_dosis_listener = $scope.$on(Phonestorage.events.MED_TIMES_RETRIEVED, function(e, result) {
            get_dosis_listener();

            $scope.times = [];
            for (var i = 0; i < result.rows.length; i++) {
               $scope.times[i] = angular.copy(result.rows.item(i));
               $scope.times[i].reminder = $scope.times[i].reminder_task_id != 'null';
               $scope.times[i].reminder_task_id = JSON.parse($scope.times[i].reminder_task_id);
               
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

      $scope.$on($scope.events.DOSE_CHANGED, function(e, update) {
         var prepared_dose = prepare_dose(update.dose);

         var update_dose_listener = $scope.$on(Phonestorage.events.DOSE_UPDATED, function(e, result) {
             update_dose_listener();
             
            Notification.add(prepared_dose);
         });
// now everytime the whole dose is update in the database. We could only update the property that was updated
         Phonestorage.update_dose_time(prepared_dose, $scope);
         
         $scope.order_times();
      });

      function prepare_dose(dose) {
         
         if (dose.reminder) { // If reminder is set to true // create task_ids
            dose.reminder_task_id = [];
            switch (dose.interval) {
               case "dagelijks":
                  if (dose.days)
                     dose.days = false, dose.special_interval = 'null';

                  dose.reminder_task_id.push(Util.hashString(dose.time + dose.interval + "") + "");
               break;

               case "weekelijks":
                  if (!dose.days)
                     dose.days = JSON.parse(dose.special_interval);

                  for (day in dose.days)
                     if (dose.days[day])
                        dose.reminder_task_id.push(Util.hashString(dose.time + day + dose.interval + "") + "");
               break;

               default:
                  dose.reminder_task_id = false;
               break;
            }
         }

         return dose;
      }

      $scope.new_dose_click = function() {
         var new_dose = {
            amount: 1,
            days: false,
            interval: "dagelijks",
            reminder: false,
            reminder_task_id: null,
            reoccurence: 1,
            special_interval: null,
            time: Date.today().setTimeToNow().toString('HH:mm')
         };
         $scope.times.push(new_dose);
            

         var listenForInsert = $scope.$on(Phonestorage.events.DOSE_INSERTED, function(e, result) {
            listenForInsert(); // unbind listener

            new_dose.id = result.insertId;
            $scope.order_times();
            $scope.$apply();
         });

         Phonestorage.insert_dose_time(new_dose, $scope.med.id, $scope);
      }

      $scope.delete_dose = function(dose) {
         Phonestorage.delete_dose_time(dose.id);
         $scope.times.splice($scope.times.indexOf(dose), 1);
      }
   }])
;