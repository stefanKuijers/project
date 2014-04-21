angular.module(
   'project', 
   [
      'ionic',
      'project.router',
      'project.service.phonestorage',
      'project.service.notification',
      'project.service.api',
   ]
).run( 
   function($rootScope, $ionicPlatform, Phonestorage, Notification, API) {
      $ionicPlatform.ready(function() {
         Phonestorage.init($rootScope);

         $rootScope.$on(
            Phonestorage.events.STORAGE_INITIALIZED, 
            function() {
               $rootScope.$broadcast(Phonestorage.events.STORAGE_READY, "broadcast from root");
            }
         );

         Notification.init($rootScope);

         API.init($rootScope);
         $rootScope.$on(API.events.CONNECTION_LOST, function(e, result) {
            alert("Connection lost", e, result);
         });
      });
   })
;