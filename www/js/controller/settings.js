angular.module('project.controller.settings', ['project.service.phonestorage', 'project.service.notification', 'project.service.persistencejs'])
   .controller('Settings', ['$scope', '$ionicSideMenuDelegate', 'Phonestorage', 'Persistencejs', 'Notification', function($scope, $ionicSideMenuDelegate, Phonestorage, Persistencejs, Notification) {

        Persistencejs.fetchAll($scope, true);

        $scope.toggle_setting = function(setting_key) {
            $scope[setting_key] = (!$scope[setting_key] && $scope[setting_key] !== false) ? true : !$scope[setting_key];
            Persistencejs.updateOrAdd(setting_key, $scope[setting_key], 'bool');
        }

      $scope.reset_device_storage = function() {
         Phonestorage.setup_storage();
         $ionicSideMenuDelegate.toggleRight();
      }

      $scope.cancel_all_notifications = function() {
         Notification.cancel_all();
         $ionicSideMenuDelegate.toggleRight();
      }
   }])
;