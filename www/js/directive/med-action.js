angular.module('project.directive.med_action', ['project.service.phonestorage', 'project.service.notification', 'project.service.util'])
   .directive("pjMedAction", ['Phonestorage', 'Notification', 'Util', function(Phonestorage, Notification, Util) {
      var CONST = {
         actions: {
            dont_take: -1,
            later: 0,
            now: 1
         },
         status: {
            not_taken: -2,
            early: -1,
            on_time: 0,
            late: 1
         },
         time_span_on_time: { // for it to count as 'on time' it has to be in the same hour but 5 minutes before or after the set time
            hours: 0,
            minutes: 10
         },
         slumber_minutes: 1
      }

      return {
         link: function($scope, $elem, $attrs) {
            $scope.med_index = 0;
            $scope.med_list_length = $scope.badge_value = $scope.$parent.med_list.length;
            $scope.current_med = $scope.$parent.med_list[$scope.med_index];
            console.log($scope.current_med);

            $scope.actions = [
               {text: "niet", value: CONST.actions.dont_take},
               {text: "niet nu", value: CONST.actions.later},
               {text: "nu", value: CONST.actions.now}
            ];
            
            $scope.set_action = function(action) {
               $elem.hide();

               var status;
               var now = Date.today().setTimeToNow();
               if (action === CONST.actions.now) {
                  var scheduled_time_split = $scope.current_med.time.split(":");
                  var diff = {
                     hours: parseInt(now.toString('HH'), 10) - parseInt(scheduled_time_split[0], 10),
                     minutes: parseInt(now.toString('mm'), 10) - parseInt(scheduled_time_split[1], 10)
                  }

                  if (diff.hours === 0 && (diff.minutes <= (CONST.time_span_on_time.minutes / 2) && diff.minutes >= -(CONST.time_span_on_time.minutes / 2)))
                     status = CONST.status.on_time;
                  else if (diff.hours > 0 || (diff.minutes > (CONST.time_span_on_time.minutes / 2)))
                     status = CONST.status.late;
                  else
                     status = CONST.status.not_taken;

               } else {
                  status = CONST.status.not_taken;

                  if (action === CONST.actions.later) {
                     Notification.set_slumber_notification({
                        task_id: (Util.hashString(now.toString()) + ""),
                        date: now.addMinutes(CONST.slumber_minutes),
                        message: "U heeft uw dosis " + $scope.current_med.trade_name + " van " + $scope.current_med.time + " nog niet ingenomen. Wilt u het nu innemen?",
                        json: JSON.stringify({med: $scope.current_med, date: now.toString('yyyy-MM-d')})
                     });
                  }
               }

               var get_history_listener = $scope.$on(Phonestorage.events.SINGLE_MED_HISTORY_EVENT_RETRIEVED, function (e, result) {
                  get_history_listener();
                  
                  var med_history = (result.rows.length > 0) ? angular.copy(result.rows.item(0)) : false;
                  if (med_history)
                     Phonestorage.update_archive_user_action(med_history.id, $scope.current_med, status, now);
                  else
                     Phonestorage.archive_user_action($scope.current_med, status, now);

               });
               Phonestorage.get_single_med_history($scope.current_med, now, $scope);

               $scope.next();
            }

            $scope.next = function() {
               if ($scope.badge_value > 0) $scope.badge_value--; 
               $scope.med_index++; 
               if ($scope.med_index >= $scope.med_list_length)
                  $scope.$parent.popper.close(),
                  $scope.med_index = 0;

               $scope.current_med = $scope.$parent.med_list[$scope.med_index];
               $elem.fadeIn();
            }

            $scope.prev = function() { 
               $scope.med_index--; 
               if ($scope.med_index < 0)
                  $scope.med_index = $scope.med_list_length-1;

               $scope.current_med = $scope.$parent.med_list[$scope.med_index];
            }
         } 
      }
   }])
;