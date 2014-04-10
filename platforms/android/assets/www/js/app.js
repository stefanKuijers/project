angular.module(
   'project', 
   [
      'ionic',
      'project.router',
      'project.service.phonestorage'
   ]
).run( 
   function($rootScope, $ionicPlatform, Phonestorage) {
      $ionicPlatform.ready(function() {
         Phonestorage.init($rootScope);

         $rootScope.$on(
            Phonestorage.events.STORAGE_INITIALIZED, 
            function() {
               $rootScope.$broadcast(Phonestorage.events.STORAGE_READY, "broadcast from root");
            }
         );
      });
   })
;