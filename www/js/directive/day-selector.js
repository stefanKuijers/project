angular.module('project.directive.day_selector', [])
   .directive("pjDaySelector", [function() {
      return {
         template: 
            '<div class="row">' +
               '<div class="col"> ' +
                  '<button class="button button-dark button-block" data-action="add">+</button>' + 
                  '<div class="button button-stable button-block number_holder">{{new_value}}</div>' + 
                  '<button class="button button-dark button-block" data-action="substract">-</button>' +
               '</div>' + 
            '</div>'
         ,
         link: function($scope, $elem, $attrs) {
            var max_value = 999;
            var min_value = 0;
            var step_size = 1;
            $scope.action_interval = false;
            $scope.action_timeout = false;
            $scope.new_value = $scope.$parent.dose.amount;

            $elem.find('button').on('mousedown touchstart', function() {
               var node = this;
               $scope.update_value(node);

               $scope.clear_interval_and_timeout();
               $scope.action_timeout = setTimeout(
                  function(){
                     $scope.action_interval = setInterval(
                        function() {
                           $scope.update_value(node);
                        }, 
                        100
                     );
                  }, 
                  100
               );
               
            });

            $elem.find('button').on('mouseup touchend touchmove', function() {
               $scope.clear_interval_and_timeout();
            });

            $scope.clear_interval_and_timeout = function() {
               if ($scope.action_interval) 
                  clearInterval($scope.action_interval),
                  $scope.action_interval = false;

               if ($scope.action_timeout) 
                  clearInterval($scope.action_timeout),
                  $scope.action_timeout = false;
            }

            $scope.update_value = function(node) {
               var el = jQuery(node);
               var action = el.data('action');

               if (action === 'add' && $scope.new_value === max_value)
                  return;
               else if (action === 'substract' && $scope.new_value === 0)
                  return;
               else 
                  $scope.new_value += (action === 'add') ? step_size : -step_size;
               

               $scope.$parent.set_new_value($scope.$parent.dose_keys.amount, $scope.new_value);
               $scope.$apply();
            }

            $scope.$parent.set_new_value($scope.$parent.dose_keys.amount, $scope.new_value);
         } 
      }
   }])
;