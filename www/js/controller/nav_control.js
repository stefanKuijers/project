angular.module('project.controller.nav_control', [])
   .controller('NavCtrl', ['$scope', '$ionicSideMenuDelegate', function($scope, $ionicSideMenuDelegate) {
      $scope.showSettings = function() {
         $ionicSideMenuDelegate.toggleRight();
      };
   }])
;