angular.module('project.directive.med_action', [])
   .directive("pjMedAction", [function() {
      var actions = {
         dont_take: -1,
         not_now: 0,
         now: 1
      }

      return {
         link: function($scope, $elem, $attrs) {
            $scope.actions = [
               {text: "niet", value: actions.dont_take},
               {text: "niet nu", value: actions.not_now},
               {text: "nu", value: actions.now}
            ];
            
            $scope.med_action = {
               med_id: $attrs.id,
               task_id: $attrs.task,
               action: actions.not_now
            };

            $scope.$parent.$parent.taken_actions[$attrs.id + $attrs.task + ""] = $scope.med_action;
         } 
      }
   }])
;