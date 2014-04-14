angular.module('project.controller.settings', ['project.service.phonestorage'])
   .controller('Settings', function($scope, $ionicSideMenuDelegate, Phonestorage) {
      
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
               return value === "true" ? true : false;
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
   })
;