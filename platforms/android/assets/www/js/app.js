angular.module(
   'project', 
   [
      'ionic',
      'project.controller.settings',
      'project.router'
   ]
).run( 
   function($ionicPlatform) {
      $ionicPlatform.ready(function() {
         StatusBar.styleDefault();
      });
   })
;