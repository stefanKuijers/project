angular.module(
   'project', 
   [
      'ionic',
      'project.router',
      'project.service.phonestorage',
      'project.service.notification',
      'project.service.api',
      'project.service.persistencejs'
   ]
).run(['$rootScope', '$ionicPlatform', 'Phonestorage', 'Notification', 'API', 'Persistencejs',
      function($rootScope, $ionicPlatform, Phonestorage, Notification, API, Persistencejs) {
         $ionicPlatform.ready(function() {

            $rootScope.$on(API.events.CONNECTION_LOST, function(e, result) {
               alert("Connection lost", e, result);
            });
            
            var storage_ready_listener = $rootScope.$on(
               Phonestorage.events.STORAGE_INITIALIZED, 
               function() {
                  storage_ready_listener();
                  $rootScope.$broadcast(Phonestorage.events.STORAGE_READY, "broadcast from root");
                  
                  Notification.init($rootScope);
                  API.init($rootScope);
                  Persistencejs.init();

                  if (navigator.splashscreen) navigator.splashscreen.hide();
               }
            );
            Phonestorage.init($rootScope);

         });
      }
   ])
;