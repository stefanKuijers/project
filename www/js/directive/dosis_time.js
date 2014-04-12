angular.module('project.directive.dose_item', [])
   .directive("pjDoseItem", function() {
      return {
         link: function(scope, elem, attrs) {

            scope.edit_dose = function() {
               if (attrs.id == scope.get_editing_id()) return;

               if (scope.get_editing_id() !== null) {
                  if (time = scope.get_time(scope.get_editing_id())) 
                     time.editable = false;
               }

               if (time = scope.get_time(attrs.id)) 
                  time.editable = true,
                  scope.set_editing_id(attrs.id);
            }

            scope.new_dose_click = function() {
               if (scope.get_editing_id() !== null) return;

               scope.times.push({
                  id:-1,
                  amount:1,
                  time: "00:00",
                  editable: true
               });

               scope.set_editing_id(-1);
            }

            scope.save_dose = function() {
               // update the times on the screen
               if (time = scope.get_time(scope.get_editing_id())) 
                  time.editable = false,
                  scope.set_editing_id(null);

               scope.order_times();

               scope.update_dose_time(attrs.id);
            }

            scope.delete_dose = function() {
               // splice it out of scope.times

               scope.delete_dose_time(attrs.id);
            }

         } 
      }
   })
;