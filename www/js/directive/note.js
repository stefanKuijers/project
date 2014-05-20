angular.module('project.directive.note', ['project.service.phonestorage', 'project.service.util'])
   .directive("pjNote", ['Phonestorage', 'Util', function(Phonestorage, Util) {
      return {
         template: '<textarea id="med_note_input" ng-model="data.note" />',
         link: function($scope, $elem, $attrs) {
            var save_timeout = false;
            var med = $scope.$parent.med;

            $scope.data = {
               note: $scope.$parent.med.note
            }

            $scope.$watch('data.note', function() {
               $scope.$parent.med.note = $scope.data.note = Util.sanitize_string($scope.data.note);

               if (save_timeout) clearTimeout(save_timeout);
               save_timeout = setTimeout(function() {
                  save_timeout = false;
                  Phonestorage.save_med_note(med.id, Util.sanitize_string(med.note));
               }, 1200);
            });

            
            setTimeout(function() {
               var el_input = $elem.find('#med_note_input');
               var value = el_input.val();
               el_input.val('');
               el_input.focus();
               el_input.trigger('click');

               if (typeof cordova !== 'undefined') {
                  $elem.parent().parent().css('top', '110px');
                  cordova.plugins.SoftKeyboard.show();
               }
               el_input.val(value);
            }, 200);
         } 
      }
   }])
;