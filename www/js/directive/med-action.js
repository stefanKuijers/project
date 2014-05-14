angular.module('project.directive.med_action', ['project.service.phonestorage'])
   .directive("pjMedAction", ['Phonestorage', function(Phonestorage) {
      var actions = {
         dont_take: -1,
         not_now: 0,
         now: 1
      }

      return {
         link: function($scope, $elem, $attrs) {
            $scope.med_index = 0;
            console.log($scope.$parent);
            $scope.med_list_length = $scope.$parent.med_list.length;
            $scope.current_med = $scope.$parent.med_list[$scope.med_index];

            $scope.actions = [
               {text: "niet", value: actions.dont_take},
               {text: "niet nu", value: actions.not_now},
               {text: "nu", value: actions.now}
            ];
            
            $scope.set_action = function(action) {
               $elem.hide();
               // $scope.$parent.taken_actions[$scope.med_index] = {
               //    med_id: $scope.current_med.id,
               //    task_id: $scope.current_med.task,
               //    action: action
               // }


               console.log($scope.current_med);
               var scheduled_time_split = $scope.current_med.time.split(":");
               
               
               var now = Date.today().setTimeToNow();
               var diff = {
                  hours: parseInt(now.toString('HH'), 10) - parseInt(scheduled_time_split[0], 10),
                  minutes: parseInt(now.toString('mm'), 10) - parseInt(scheduled_time_split[1], 10)
               }

               // determine status based on time diff
               // safe time_diff to data_base

               //Phonestorage.archive_user_action($scope.current_med, status, date);


               $scope.next();
            }

            $scope.next = function() {
               $scope.med_list_length--; 
               $scope.med_index++; 
               if ($scope.med_index >= $scope.med_list_length)
                  console.log("SET all meds"),
                  $scope.med_index = 0,
                  $scope.med_list_length = $scope.med_list_length;


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