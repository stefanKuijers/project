angular.module('project.directive.radio', [])
   .directive("pjTimePicker", [function() {

      return {
         template: 
            '<div class="row">' +
               '<div class="col col-hour"> ' +
                  '<button class="button button-dark button-block" id="add_hour_button">+</button>' + 
                  '<div class="button button-stable button-block hour_holder">{{new_time.hour}}</div>' + 
                  '<button class="button button-dark button-block" id="substract_hour_button">-</button>' +
               '</div>' + 
               '<div class="col col-minute">' + 
                  '<button class="button button-dark button-block" id="add_minute_button">+</button>' + 
                  '<div class="button button-stable button-block minute_holder">{{new_time.minute}}</div>' + 
                  '<button class="button button-dark button-block" id="substract_minute_button">-</button>' +
               '</div>' + 
            '</div>'
         ,
         link: function($scope, $elem, $attrs) {
            $scope.new_time = {
               hour: 10,
               minute: 10
            }

            var add_hour_button         = $elem.find('#add_hour_button');
            var substract_hour_button   = $elem.find('#substract_hour_button');
            var add_minute_button       = $elem.find('#add_minute_button');
            var substract_minute_button = $elem.find('#substract_minute_button');

            add_hour_button.on('mousedown touchstart', function() {
               // fix something that if within 150 no new touchStart 
                  // set interval (clear on touch end or mouse up)

               $scope.new_time.hour++;
               //$scope.update_new_time('hour', +1);
            });

            // $scope.update_new_time = function(unit, alternation) {
            //    $scope.new_time[unit] += alternation;
            // }

            $scope.add_hour = function() { $scope.new_time.hour++; }
            $scope.substract_hour = function() { $scope.new_time.hour--; }
            $scope.add_minute = function() { $scope.new_time.minute++; }
            $scope.substract_minute = function() { $scope.new_time.minute--; }
         } 
      }
   }])
;