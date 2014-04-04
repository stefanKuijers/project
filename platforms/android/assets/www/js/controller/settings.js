angular.module('project.controller.settings', [])
   .controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
      $scope.showSettings = function() {
         $ionicSideMenuDelegate.toggleRight();
      };
   })
;