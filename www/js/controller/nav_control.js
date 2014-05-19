angular.module('project.controller.nav_control', [])
   .controller('NavCtrl', ['$scope', '$ionicSideMenuDelegate', '$state', '$urlRouter', function($scope, $ionicSideMenuDelegate, $state, $urlRouter) {
      $ionicSideMenuDelegate.canDragContent(false);

      $scope.showSettings = function() {
         $ionicSideMenuDelegate.toggleRight();
      };

      // showing the home-button in stead of back when on med detail
      $scope.data = { show_home_button: false };
      $scope.location_listener = $scope.$on('$locationChangeSuccess', function(evt, e) {
         $urlRouter.sync();
         setTimeout(function(){
            $scope.data.show_home_button = $state.is('med-info'); 
            if ($state.current.name) $state.reload();
         }, 400);
      });

      $scope.go_home = function() {
         window.location.hash = "";
      }

      $scope.$on('$destroy', function() {
         $scope.location_listener();
      });
   }])
;