angular.module('project.directive.time_picker', [])
   .directive("pjTimePicker", [function() {
      return {
         template: 
            '<div class="row">' +
               '<div class="col col-hour"> ' +
                  '<button class="button button-dark button-block" data-unit="hour" data-action="add">+</button>' + 
                  '<div class="button button-stable button-block hour_holder"><span ng-if="new_time.hour < 10">0</span>{{new_time.hour}}</div>' + 
                  '<button class="button button-dark button-block" data-unit="hour" data-action="substract">-</button>' +
               '</div>' + 
               // '<div class="col col-seperator">:</div>' + 
               '<div class="col col-minute">' + 
                  '<button class="button button-dark button-block" data-unit="minute" data-action="add">+</button>' + 
                  '<div class="button button-stable button-block minute_holder"><span ng-if="new_time.minute < 10">0</span>{{new_time.minute}}</div>' + 
                  '<button class="button button-dark button-block" data-unit="minute" data-action="substract">-</button>' +
               '</div>' + 
            '</div>'
         ,
         link: function($scope, $elem, $attrs) {
            var hour, minute;
            $scope.action_interval = false;
            $scope.action_timeout = false;
            $scope.new_time = {
               hour: Number($scope.$parent.dose.time.split(":")[0]),
               minute: Number($scope.$parent.dose.time.split(":")[1])
            }  

            $elem.find('button').on('mousedown touchstart', function() {
               var node = this;

               $scope.update_time(node);

               $scope.clear_interval_and_timeout();
               $scope.action_timeout = setTimeout(
                  function(){
                     $scope.action_interval = setInterval(
                        function() {
                           $scope.update_time(node);
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

            $scope.update_time = function(node) {
               var el = jQuery(node);
               var unit = el.data('unit');
               var action = el.data('action');

               if (unit === 'hour') 
                  if (action === 'add' && $scope.new_time[unit] === 23)
                     $scope.new_time[unit] = 0;
                  else if (action === 'substract' && $scope.new_time[unit] === 0)
                     $scope.new_time[unit] = 23;
                  else 
                     $scope.new_time[unit] += (action === 'add') ? 1 : -1;
               else 
                  if (action === 'add' && $scope.new_time[unit] === 59)
                     $scope.new_time[unit] = 0;
                  else if (action === 'substract' && $scope.new_time[unit] === 0)
                     $scope.new_time[unit] = 59;
                  else 
                     $scope.new_time[unit] += (action === 'add') ? 1 : -1;
               ;

               $scope.$parent.set_new_value($scope.$parent.dose_keys.time, $scope.parse_time());
               $scope.$apply();
            }

            $scope.parse_time = function() {
               hour = $scope.new_time.hour < 10 ? "0" + $scope.new_time.hour : $scope.new_time.hour;
               minute = $scope.new_time.minute < 10 ? "0" + $scope.new_time.minute : $scope.new_time.minute;

               return hour + ":" + minute;
            }

            $scope.$parent.set_new_value($scope.$parent.dose_keys.time, $scope.parse_time());
         } 
      }
   }])
;