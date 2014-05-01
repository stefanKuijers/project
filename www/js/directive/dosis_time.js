angular.module('project.directive.dose_item', [])
   .directive("pjDoseItem", ['$ionicPopup', function($ionicPopup) {
      return {
         link: function($scope, $element, $attrs) {
            // alert($scope.dose.interval);
            var actions = {
               cancelled : 1,
               saved     : 2
            }
            $scope.dose_keys = {
               time             : 'time'    ,
               amount           : 'amount'  ,
               interval         : 'interval',
               reminder         : 'reminder',
               days             : 'days',
               special_interval : 'special_interval'
            }
            $scope.new_values = {};

            $scope.$watch('dose.reminder', function(new_value, old_value) {
               if (new_value !== old_value)
                  $scope.emit_dose_changed($scope.dose_keys.reminder);
            });

            $scope.adjust_time = function() {
               $scope.popup_popup('<div pj-time-picker></div>', 'Tijd instellen', $scope.dose_keys.time);
            }

            $scope.adjust_amount = function() {
               $scope.popup_popup('<div pj-number-picker></div>', 'Hoeveelheid instellen', $scope.dose_keys.amount);
            }

            $scope.adjust_interval = function() {
               $scope.popup_popup('<div pj-interval-picker></div>', 'Herhaling instellen', $scope.dose_keys.interval);
            }

            $scope.delete = function() {
               
            }

            $scope.popup_popup = function(template, title, property) {
               $ionicPopup.show({
                  content: template,
                  title: title,
                  scope: $scope,
                  buttons: [
                    { 
                       text: 'annuleer', 
                       type: 'button-stable',
                       onTap: function(e) { return actions.cancelled; } 
                    },
                    {
                      text: 'stel in',
                      type: 'button-positive',
                      onTap: function(e) { return actions.saved; }
                    },
                  ]
               }).then(function(res) {
                  if (res === actions.saved) {
                     if (property === $scope.dose_keys.interval &&
                         $scope.new_values[property] === 'weekelijks'
                     ) {
                        console.log($scope.new_values[property]);
                        $scope.popup_popup('<div pj-day-selector></div>', 'Selecteer de dagen waarop u het medicijn gaat innemen', $scope.dose_keys.days);
                     }

                     $scope.update_dosis(property);
                  }
               });
            }

            $scope.set_new_value = function(property, new_value) {
               $scope.new_values[property] = new_value;
            }

            $scope.update_dosis = function(property) {
               if (property === $scope.dose_keys.days)
                  $scope.dose[$scope.dose_keys.special_interval] = JSON.stringify($scope.new_values[property]);
               else
                  $scope.dose[property] = $scope.new_values[property];

               $scope.emit_dose_changed(property);
            }

            $scope.emit_dose_changed = function(property) {
               $scope.$emit($scope.events.DOSE_CHANGED, {
                  dose : $scope.dose,
                  property: property,
                  id : $attrs.id
               });
            }

         } 
      }
   }])
;