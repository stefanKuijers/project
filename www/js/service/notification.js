angular.module('project.service.notification', ['project.service.phonestorage', 'project.service.util'])
   .service('Notification', ['$ionicPopup', 'Phonestorage', 'Util', function($ionicPopup, Phonestorage, Util) {
      // documentation on window.plugin.notification.local
      // https://github.com/katzer/cordova-plugin-local-notifications

      // documentation on local android notifications
      // http://developer.android.com/guide/topics/ui/notifiers/notifications.html

      return {
         initialized: false,
         available: false,
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
            this.root_scope  = root_scope;
            this.available   = Util.on_mobile_device;

            if (!Util.on_mobile_device) { Util.log("Not on mobile device"); return; }
            var scope = this;
            window.plugin.notification.local.ontrigger = function (id, state, json) {
               scope.handle_notification_trigger(id, state, json);
            };

            window.plugin.notification.local.onclick = function (id, state, json) {
               scope.handle_notification_click(id, state, json);
            };

            root_scope.$emit(this.events.INITIALIZED);
         },

         // possible optimalization
         // 1: now all doses are parsed to reminder objects and after that filtered. Shoud first filter and than parse.
         // 2: Check documentation of the notification plugin. Probably I don't have to check or the ID is already set. It will probably overwrite the notification
         add: function(dose, caller_scope) {
            parse_date = function(time, day) {
               var parts = time.split(":");
               var hours = parseInt(parts[0], 10);
               var minutes = parseInt(parts[1], 10);

               var date = Date.today().set({hour: hours, minute: minutes});

               if (day) {
                  switch (day) {
                     case "monday"   : if (!date.is().monday())    date.next().monday(); break;
                     case "tuesday"  : if (!date.is().monday())    date.next().tuesday(); break;
                     case "wednesday": if (!date.is().wednesday()) date.next().wednesday(); break;
                     case "thursday" : if (!date.is().thursday())  date.next().thursday(); break;
                     case "friday"   : if (!date.is().friday())    date.next().friday(); break;
                     case "saturday" : if (!date.is().saturday())  date.next().saturday(); break;
                     case "sunday"   : if (!date.is().sunday())    date.next().sunday(); break;
                  }
               }

               return date;
            }

            reminder = function(task_id, date, interval) {
               return {
                  task_id: task_id,
                  date: date,
                  interval: interval,
                  message: ""
               }
            }

            var i = 0, reminders = [];
            if (dose.days) {
               for (day in dose.days) {
                  if (dose.days[day])
                     reminders.push( reminder(dose.reminder_task_id[i++], parse_date(dose.time, day), 'weekly') );
               }
            } else {
               reminders.push( reminder(dose.reminder_task_id[0], parse_date(dose.time), 'daily') );
            }

            for (reminder_index in reminders) {
               if (dose.reminder) 
                  this.schedule(reminders[reminder_index]);
               else
                  this.cancel(reminders[reminder_index].task_id); 
            }
         },

         schedule: function(reminder) {
            if (!Util.on_mobile_device) { Util.log("Not on mobile device. Could not add notification."); return; }
            Util.log("Set notification", JSON.stringify(reminder));

            var self = this;
            window.plugin.notification.local.add({
               id:         reminder.task_id,                                     // STRING. Id from the dosis table.
               date:       reminder.date,                                        // From the dosis table
               message:    reminder.message + reminder.task_id,                  // Names of the medicin that need to be taken at this time
               title:      self.config.default_notification_settings.title,      // The title of the message
               repeat:     reminder.interval,                                    // Get the interval from the dosis table
               badge:      reminder.med_count,                                   // Amount of meds to be taken at this reminder. Get from dosis table
               autoCancel: self.config.default_notification_settings.autoCancel, // Setting this flag and the notification is automatically canceled when the user clicks it
               ongoing:    self.config.default_notification_settings.ongoing     // Prevent clearing of notification (Android only)
            });
         },



         // add: function(time, caller_scope) {
         //    var scope = this;
         //    var event_scope = caller_scope ? caller_scope : this.root_scope;

         //    var added_listener = event_scope.$on(Phonestorage.events.DOSIS_BY_TIME_RETRIEVED, function(e, result) {
         //       added_listener(); // remove listener
               
         //       var meds_string = "";
         //       var task_id = result.rows.item(0).task_id;
         //       for (var i = 0; i < result.rows.length; i++){
         //          meds_string += result.rows.item(i).trade_name + " ";
         //       }
               
         //       var date_time = new Date(),
         //          parts = time.split(":"),
         //          hours = parseInt(parts[0], 10),
         //          minutes = parseInt(parts[1], 10);

         //       date_time.setHours(hours);
         //       date_time.setMinutes(minutes);
         //       date_time.setSeconds(0);
               
         //       if (window.plugin !== undefined) {
         //          // alert("passed check");
         //          // alert("task_id: " + task_id + " date_time: " + date_time + " meds_string: " + meds_string + " title: " + scope.config.default_notification_settings.title);
         //          window.plugin.notification.local.add({
         //             id:         "" + task_id,                                       // STRING. Id from the dosis table.
         //             date:       date_time,                                          // From the dosis table
         //             message:    meds_string,                                        // Names of the medicin that need to be taken at this time
         //             title:      scope.config.default_notification_settings.title,   // The title of the message
         //             repeat:     scope.config.default_notification_settings.repeat,  // Get the interval from the dosis table
         //             badge:      result.rows.length,                                 // Amount of meds to be taken at this reminder. Get from dosis table
         //             autoCancel: scope.config.default_notification_settings.ongoing, // Setting this flag and the notification is automatically canceled when the user clicks it
         //             ongoing:    scope.config.default_notification_settings.ongoing  // Prevent clearing of notification (Android only)
         //          });
         //          // alert("added Notification");

         //       } else {
         //          alert("Notification plugin not available. Probably the app is not running on a mobile device");
         //       }
         //       // alert("setting date: " + date_time.toString());
         //       // alert("Options " + task_id + " " + meds_string);
         //    });
         //    Phonestorage.get_dosis_by_time(time, event_scope);
         // },

         cancel: function(id) {
            Util.log("Cancel Notification", id);
            if (!Util.on_mobile_device) { Util.log("Not on mobile device. Could not cancel notification: " + id); return; }
            if (id == undefined) {Util.log("Could not cancel notification. Id invalid: ", id); return;}

            window.plugin.notification.local.cancel(id, function () {
                Util.log("Notification:", id, "canceled");
            });
         },

         cancel_all: function() {
            if (!Util.on_mobile_device) { Util.log("Not on mobile device. Could not cancel all"); return; }

            window.plugin.notification.local.cancelAll(function () {
                Util.log("All Notifications: canceled");
            });
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
   }])
;