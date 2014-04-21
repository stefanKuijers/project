angular.module('project.controller.nav_control', [])
   .controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
      $scope.showSettings = function() {
         $ionicSideMenuDelegate.toggleRight();
      };
   })
;