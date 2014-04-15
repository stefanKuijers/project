angular.module(
   'project', 
   [
      'ionic',
      'project.router',
      'project.service.phonestorage',
      'project.service.api'
   ]
).run( 
   function($rootScope, $ionicPlatform, Phonestorage, API) {
      $ionicPlatform.ready(function() {
         Phonestorage.init($rootScope);

         $rootScope.$on(
            Phonestorage.events.STORAGE_INITIALIZED, 
            function() {
               $rootScope.$broadcast(Phonestorage.events.STORAGE_READY, "broadcast from root");
            }
         );

         API.init($rootScope);
         $rootScope.$on(API.events.MED_INTERACTION, function(e, result) {
            alert("INTERACTION", result);
         });

         $rootScope.$on(API.events.CONNECTION_LOST, function(e, result) {
            alert("Connection lost", e, result);
         });
      });
   })
;