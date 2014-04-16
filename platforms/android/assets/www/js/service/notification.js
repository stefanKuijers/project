angular.module('project.service.notification', ['project.service.phonestorage'])
   .service('Notification', function($ionicPopup, Phonestorage) {
      // documentation on window.plugin.notification.local
      // https://github.com/katzer/cordova-plugin-local-notifications

      // documentation on local android notifications
      // http://developer.android.com/guide/topics/ui/notifiers/notifications.html

      return {
         initialized: false,
         root_scope: null,
         events: {
            INITIALIZED: "INITIALIZED"
         },
         state: {
            background: 'background',
            foreground: 'foreground'
         },
         user_response: {
            take_med: 'take_med',
            postpone: 'postpone',
            dont_take_med: 'dont_take_med'
         },
         config: {
            default_notification_settings: {
               title:      "Medicijnen innemen",  // The title of the message
               repeat:     "daily",               // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
               sound:      String,                // A sound to be played
               json:       String,                // Data to be passed through the notification
               autoCancel: false,                 // Setting this flag and the notification is automatically canceled when the user clicks it
               ongoing:    false                  // Prevent clearing of notification (Android only)
            }
         },


         /**
            Public Functions
         */
         init: function(root_scope) {
            this.initialized = true;
            this.root_scope = root_scope;

            var scope = this;
            if (window.plugin) {  
               window.plugin.notification.local.ontrigger = function (id, state, json) {
                  scope.handle_notification_trigger(id, state, json);
               };

               window.plugin.notification.local.onclick = function (id, state, json) {
                  scope.handle_notification_click(id, state, json);
               };
            }

            root_scope.$emit(this.events.INITIALIZED);
         },

         add: function(time, caller_scope) {
            var scope = this;
            alert("not.add");
            var event_scope = caller_scope ? caller_scope : this.root_scope;
            var added_listener = event_scope.$on(Phonestorage.events.DOSIS_BY_TIME_RETRIEVED, function(e, result) {
               added_listener(); // remove listener
               alert("got dose by time");

               var meds_string = "";
               var task_id = result.rows.item(0).task_id;
               for (var i = 0; i < result.rows.length; i++){
                  meds_string += result.rows.item(i).trade_name + " ";
               }
               alert("meds_string");

                  var date_time = new Date(),
                     parts = time.split(":"),
                     hours = parseInt(parts[0], 10),
                     minutes = parseInt(parts[1], 10);
               alert("setup date");

                  date_time.setHours(hours);
                  date_time.setMinutes(minutes);
                  date_time.setSeconds(0);
               alert("specified date ready to add");

               // alert("pre check " + (window.plugin === 'undefined'));
               if (window.plugin !== 'undefined') {
                  alert("passed check");
                  //alert("task_id: " + task_id + " date_time: " + date_time + " meds_string: " + meds_string + " title: " + scope.config.default_notification_settings.title);
                  window.plugin.notification.local.add({
                     id:         "" + task_id,                                       // STRING. Id from the dosis table.
                     date:       date_time,                                          // From the dosis table
                     message:    meds_string,                                        // Names of the medicin that need to be taken at this time
                     title:      scope.config.default_notification_settings.title,   // The title of the message
                     repeat:     scope.config.default_notification_settings.repeat,  // Get the interval from the dosis table
                     badge:      result.rows.length,                                 // Amount of meds to be taken at this reminder. Get from dosis table
                     autoCancel: scope.config.default_notification_settings.ongoing, // Setting this flag and the notification is automatically canceled when the user clicks it
                     ongoing:    scope.config.default_notification_settings.ongoing  // Prevent clearing of notification (Android only)
                  });
                  alert("added Notification");

                  window.plugin.notification.local.isScheduled(task_id, function (isScheduled) {
                     alert('Notification with ID ' + task_id + ' is scheduled: ' + isScheduled);
                  }, scope);
               }
               alert("setting date: " + date_time.toString());
               alert("Options " + task_id + " " + meds_string);
            });
            Phonestorage.get_dosis_by_time(time, event_scope);



         },

         cancel: function(id) {
            window.plugin.notification.local.cancel(id, function () {
                // The notification has been canceled
            }, scope);
         },

         cancel_all: function() {
            window.plugin.notification.local.cancelAll(function () {
                // All notifications have been canceled
            }, scope);
         },

         /**
            Private Functions
         */
         handle_notification_trigger: function(id, state, json) {
            if (state === this.state.foreground)
               this.show_notification({id: id, state: state, json: json});
         },

         handle_notification_click: function(id, state, json) {
            this.show_notification({id: id, state: state, json: json});
         },

         show_notification: function(notification_object) {
            var scope = this;
            $ionicPopup.show({
               templateUrl: 'view/dialog/med_reminder.html',
               title: "Medicijn Innamemoment",
               subTitle: 'sub title',
               buttons: [
                  { 
                     text: 'Neem niet in', 
                     onTap: function(e) { 
                        return {
                           action: scope.user_response.dont_take_med,
                           notification: notification_object
                        }
                     }
                  },
                  {
                     text: 'Neem later in',
                     onTap: function(e) { 
                        return {
                           action: scope.user_response.postpone,
                           notification: notification_object
                        }
                     }
                  },
                  {
                     text: 'Neem nu in',
                     type: 'button-positive',
                     onTap: function(e) { 
                        return {
                           action: scope.user_response.take_med,
                           notification: notification_object
                        }
                     }
                  }
               ]
               }).then(function(response) {
                  scope.handle_user_response(response);
               }
            );
         },

         handle_user_response: function(response) {
            // remove notification from notification center

            switch(response.action) {
               case this.user_response.dont_take_med :
                  // Phonestorage.set_dose_history_state(Phonestorage.history_state.not_taken)
               break;

               case this.user_response.postpone :
                  // add extra notification with an interval of 5 minutes or something (get interval from settings)
                  // Phonestorage.set_dose_history_state(Phonestorage.history_state.postponed)
               break;

               case this.user_response.take_med :
                  // Phonestorage.set_dose_history_state(Phonestorage.history_state.taken)
               break;
            }
         }


      }
   })
;