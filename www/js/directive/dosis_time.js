angular.module('project.directive.dose_item', [])
   .directive("pjDoseItem", ['$ionicPopup', function($ionicPopup) {
      var _id = -1;
      return {
         link: function($scope, $element, $attrs) {
            $scope.$watch('dose.reminder', function(new_value, old_value) {
               console.log('dose.reminder changed', new_value, old_value);

               if (new_value !== old_value)
                  $scope.update_reminder();
            });

            $scope.adjust_time = function() {
               $scope.popup_popup('<div pj-time-picker></div>', 'Tijd instellen');
            }

            $scope.adjust_amount = function() {
               
            }

            $scope.adjust_interval = function() {
               
            }

            $scope.update_reminder = function() {
               
            }

            $scope.delete = function() {
               
            }

            $scope.popup_popup = function(template, title) {
               $ionicPopup.show({
                  content: template,
                  title: title,
                  scope: $scope,
                  buttons: [
                    { 
                       text: 'annuleer', 
                       type: 'button-stable',
                       onTap: function(e) { return 'cancelled'; } 
                    },
                    {
                      text: 'stel in',
                      type: 'button-positive',
                      onTap: function(e) { return 'saved'; }
                    },
                  ]
               }).then(function(res) {
                 console.log(res);
               });
            }

         } 
      }
   }])
;