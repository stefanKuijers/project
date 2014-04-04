angular.module('project.controller.settings', ['project.service.user.settings'])
   .controller('NavCtrl', function($scope, $ionicSideMenuDelegate, Settings) {
      // Here I can load the settings

      $scope.showSettings = function() {
         $ionicSideMenuDelegate.toggleRight();
      };
   })
;