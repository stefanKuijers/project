angular.module(
   'project', 
   [
      'ionic',
      'project.router'
   ]
).run( 
   function($ionicPlatform) {
      $ionicPlatform.ready(function() {
         StatusBar.styleDefault();
      });
   })
;