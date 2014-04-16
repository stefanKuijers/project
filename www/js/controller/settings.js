angular.module('project.controller.settings', ['project.service.phonestorage', 'project.service.notification'])
   .controller('Settings', function($scope, $ionicSideMenuDelegate, Phonestorage, Notification) {
      
      if (Phonestorage.initialized) 
         get_settings();
      else
         $scope.$on(Phonestorage.events.STORAGE_READY, get_settings);

      function get_settings() {
         Phonestorage.get_settings($scope);
         $scope.$on(Phonestorage.events.SETTINGS_RETRIEVED, function(e, result) {
            for (var i = 0; i < result.rows.length; i++){
               $scope[result.rows.item(i).key] = type_cast(result.rows.item(i).type, result.rows.item(i).value);
            }
         });
      }

      // some wacky hacky stuff
      function type_cast(type, value) {
         switch(type) {
            case "string":
               return value;
            break;

            case "bool":
               return value == 'true';
            break;

            case "num": 
            case "int":
               return new Number(value);
            break;

            default: return value;
         }
      }

      $scope.toggle_setting = function(setting_key) {
         $scope[setting_key] = !$scope[setting_key];

         Phonestorage.update_setting(setting_key, $scope[setting_key]);
      }

      $scope.reset_device_storage = function() {
         Phonestorage.setup_storage();
         $ionicSideMenuDelegate.toggleRight();
      }

      $scope.cancel_all_notifications = function() {
         Notification.cancel_all();
         $ionicSideMenuDelegate.toggleRight();
      }
   })
;