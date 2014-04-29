angular.module('project.directive.dose_item', [])
   .directive("pjDoseItem", [function() {
      return {
         // transclude: 'element',
         restrict: 'AE',
         link: function($scope, $element, $attrs) {

            $scope.edit_dose = function() {
               if ($attrs.id == $scope.get_editing_id()) return;
               
               if ($scope.get_editing_id() !== null) {
                  if (time = $scope.get_time($scope.get_editing_id()).time_object) 
                     time.editable = false;
               }

               if (time = $scope.get_time($attrs.id).time_object) 
                  time.editable = true,
                  $scope.set_editing_id($attrs.id);

               $scope.set_keyboard_focus('time');
            }

            $scope.new_dose_click = function() {
               if ($scope.get_editing_id() !== null) return;
               
               $scope.times.push({
                  id:-1,
                  amount:1,
                  time: "00:00",
                  editable: true
               });

               $scope.set_editing_id(-1);
            }

            $scope.save_dose = function() {
               if (time_object = $scope.get_time($attrs.id).time_object) 
                  time_object.editable = false,
                  $scope.set_editing_id(null);

               if ($attrs.id == -1)
                  $scope.insert_dose_time( $scope.get_time($attrs.id).index, $scope.med.id );
               else
                  $scope.update_dose_time( $scope.get_time($attrs.id).index );
            }

            $scope.delete_dose = function() {
               $scope.delete_dose_time($attrs.id);
               $scope.set_editing_id(null);                  
            }

            $scope.set_keyboard_focus = function(type) {
               if (type === 'time') {
                  setTimeout(set_focus, 150);
               } else {
                  set_focus();
               }

               function set_focus() {
                  var el_input = $element.find('input[type="' + type + '"]');
                  el_input.focus();
                  el_input.trigger('click');
                  // el_input.on('blur', $scope.on_keyboard_blur);
               }
            }

            $scope.on_keyboard_blur = function(e,ee) {
               alert('blurred input el',e,ee);

            }
         } 
      }
   }])
;