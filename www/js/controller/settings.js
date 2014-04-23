angular.module('project.controller.settings', ['project.service.phonestorage', 'project.service.notification', 'project.service.persistencejs'])
   .controller('Settings', ['$scope', '$ionicSideMenuDelegate', 'Phonestorage', 'Persistencejs', 'Notification',
      function($scope, $ionicSideMenuDelegate, Phonestorage, Persistencejs, Notification) {
         var update_timeout, setting_key_exp;
         
         var fetched_settings_listener = $scope.$on(Persistencejs.events.FETCHED_SETTINGS, function(e, settings) {
            fetched_settings_listener();

            $scope.settings = settings;
            for (setting_key in settings) {
               $scope.$watch('settings.' + setting_key, function(new_value) {
                  setting_key_exp = this.exp.split('.')[1];
                  
                  if (setting_key === 'screen_contrast' || setting_key === 'sound_volume') {
                     if (update_timeout) clearTimeout(update_timeout); // these four lines are to prevent a constant flow of database updates while sliders are slid
                     update_timeout = setTimeout(function() {
                        Persistencejs.update(setting_key_exp, new_value);
                     }, 200);
                  } else {
                     Persistencejs.update(setting_key_exp, new_value);
                  }
               });
            }
         });
         Persistencejs.get_settings($scope);

         $scope.reset_device_storage = function() {
            Phonestorage.setup_storage();
            $ionicSideMenuDelegate.toggleRight();
         }

         $scope.cancel_all_notifications = function() {
            Notification.cancel_all();
            $ionicSideMenuDelegate.toggleRight();
         }

         $scope.reset_default_settings = function() {
            Persistencejs.clearAllItems();
            Persistencejs.set_default_settings($scope);
            $ionicSideMenuDelegate.toggleRight();
         }
      }
   ])
;