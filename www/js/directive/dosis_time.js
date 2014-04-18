angular.module('project.directive.dose_item', [])
   .directive("pjDoseItem", [function() {
      return {
         link: function(scope, elem, attrs) {

            scope.edit_dose = function() {
               if (attrs.id == scope.get_editing_id()) return;
               
               if (scope.get_editing_id() !== null) {
                  if (time = scope.get_time(scope.get_editing_id()).time_object) 
                     time.editable = false;
               }

               if (time = scope.get_time(attrs.id).time_object) 
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
               if (time_object = scope.get_time(attrs.id).time_object) 
                  time_object.editable = false,
                  scope.set_editing_id(null);

               if (attrs.id == -1)
                  scope.insert_dose_time(
                     scope.get_time(attrs.id).index,
                     elem.find('input[type=\'time\']').val(), 
                     elem.find('input[type=\'number\']').val(), 
                     1, 
                     true, 
                     0, 
                     scope.med.id
                  );
               else
                  scope.update_dose_time(
                     scope.get_time(attrs.id).index, 
                     elem.find('input[type=\'time\']').val(), 
                     elem.find('input[type=\'number\']').val()
                  );
            }

            scope.delete_dose = function() {
               scope.delete_dose_time(attrs.id);
               scope.set_editing_id(null);                  
            }
         } 
      }
   }])
;