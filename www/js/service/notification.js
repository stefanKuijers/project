angular.module('project.service.notification', ['project.service.phonestorage'])
   .service('Notification', function() {
      // documentation
      // https://github.com/katzer/cordova-plugin-local-notifications

      return {
         initialized: false,
         root_scope: null,
         events: {
            INITIALIZED: "INITIALIZED"
         },

         init: function(root_scope) {
            this.initialized = true;
            this.root_scope = root_scope;

            root_scope.$emit(this.events.INITIALIZED);
         },

         add: function() {
            console.log(navigator);
            alert(navigator.notification);
            // var now                  = new Date().getTime(),
            //     _10_seconds_from_now = new Date(now + 10*1000);

            // window.plugin.notification.local.add({
            //     id:      1,
            //     title:   'Reminder',
            //     message: 'Dont forget to buy some flowers.',
            //     repeat:  'daily',
            //     date:    _10_seconds_from_now
            // });

            function alertDismissed() {
                // do something
            }

            setTimeout( 
               function() {
                  navigator.notification.alert(
                     'You are the winner!',  // message
                     alertDismissed,         // callback
                     'Game Over',            // title
                     'Done'                  // buttonName
                  )
                  showConfirm();
               },
               50
            );

            function onConfirm(button) {
                alert('You selected button ' + button);
            }

            // Show a custom confirmation dialog
            //
            function showConfirm() {
                navigator.notification.confirm(
                    'You are the winner!',  // message
                    onConfirm,              // callback to invoke with index of button pressed
                    'Game Over',            // title
                    'Restart,Exit'          // buttonLabels
                );
            }
         },

         cancel: function(id) {
            window.plugin.notification.local.cancel(ID, function () {
                // The notification has been canceled
            }, scope);
         },

         cancel_all: function() {
            window.plugin.notification.local.cancelAll(function () {
                // All notifications have been canceled
            }, scope);
         }
      }
   })
;