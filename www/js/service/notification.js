angular.module('project.service.notification', ['project.service.phonestorage', 'project.service.util', 'project.directive.med_action'])
   .service('Notification', ['$ionicPopup', 'Phonestorage', 'API', 'Util', function($ionicPopup, Phonestorage, API, Util) {
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
               slumber_title: "Niet Vergeten",           // The title of the message
               title:         "Medicijnen innemen",      // The title of the message
               repeat:        "daily",                   // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
               sound:         String,                    // A sound to be played
               json:          String,                    // Data to be passed through the notification
               autoCancel:    false,                     // Setting this flag and the notification is automatically canceled when the user clicks it
               ongoing:       false,                     // Prevent clearing of notification (Android only)
               icon:          "file://img/noti_icon.png" // set the icon to the app icon
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
            var self = this;
            window.plugin.notification.local.ontrigger = function (id, state, json) {
               self.handle_notification_trigger(id, state, json);
            };

            window.plugin.notification.local.onclick = function (id, state, json) {
               self.handle_notification_click(id, state, json);
            };

            //window.plugin.notification.local.add({ icon: 'ic_launcher' }); // set app icon as notification
            //window.plugin.notification.local.add({ icon: 'file://img/logo.png' });
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
                  message: "Het is tijd om uw medicijnen in te nemen"
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
               message:    reminder.message,                                     // Names of the medicin that need to be taken at this time
               title:      self.config.default_notification_settings.title,      // The title of the message
               repeat:     reminder.interval,                                    // Get the interval from the dosis table
               badge:      reminder.med_count,                                   // Amount of meds to be taken at this reminder. Get from dosis table
               autoCancel: self.config.default_notification_settings.autoCancel, // Setting this flag and the notification is automatically canceled when the user clicks it
               ongoing:    self.config.default_notification_settings.ongoing,    // Prevent clearing of notification (Android only)
               icon:       self.config.default_notification_settings.icon        // icon
            });
         },

         set_slumber_notification: function(reminder) {
            if (!Util.on_mobile_device) { Util.log("Not on mobile device. Could not add notification."); return; }
            
            var self = this;
            window.plugin.notification.local.add({
               id:         reminder.task_id,                                        // STRING. Id from the dosis table.
               date:       reminder.date,                                           // From the dosis table
               title:      self.config.default_notification_settings.slumber_title, // The title of the message
               message:    reminder.message,                                        // Names of the medicin that need to be taken at this time
               json:       reminder.json, 
               autoCancel: self.config.default_notification_settings.autoCancel,    // Setting this flag and the notification is automatically canceled when the user clicks it
               ongoing:    self.config.default_notification_settings.ongoing,       // Prevent clearing of notification (Android only)
               icon:       self.config.default_notification_settings.icon           // icon
            });
         },

         cancel: function(id) {
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
            var self = this;

            self.root_scope.taken_actions = {};
            if (typeof notification_object.json != 'undefined' && notification_object.json.length > 0) { 
               var json = JSON.parse(notification_object.json);

               self.root_scope.med_list = [json.med];
               self.popup_popup("U heeft uw dosis " + json.med.trade_name + "  van " + json.med.time + " nog niet ingenomen. Wanneer wilt u het innemen?");
            } else {
               var get_set_dosis_listener = this.root_scope.$on(Phonestorage.events.DOSIS_BY_TASK_ID_RETRIEVED, function(e, result) {
                  get_set_dosis_listener();

                  self.populate_med_list(notification_object, result);
                  self.popup_popup("Het is tijd om de onderstaande medicijnen in te nemen. Geef aan wanneer u deze medicijnen in gaat nemen");
               });
               Phonestorage.get_dosis_by_task_id(notification_object.id, this.root_scope);
            }
         },

         populate_med_list: function(notification_object, result) {
            this.root_scope.med_list = [];
            var self = this;
            for (var i = 0; i < result.rows.length; i++) {
               this.root_scope.med_list[i]      = angular.copy( result.rows.item(i) );
               this.root_scope.med_list[i].task = notification_object.id;
               this.root_scope.med_list[i].tasks = JSON.parse(this.root_scope.med_list[i].tasks);

               API.get_med_interactions(this.root_scope.med_list[i].id, this.root_scope);
            }

            var med_interaction_listener = self.root_scope.$on(API.events.MED_INTERACTION, function(e, result) {
               var med = Util.search_object_array_by(self.root_scope.med_list, {find_one: true, filters: {id: result.med.id}});
               if (med)
                  self.root_scope.med_list[self.root_scope.med_list.indexOf(med)].interactions = result.med_interactions;
            });
         },

         popup_popup: function(message) {
            var self = this;
            self.root_scope.message = message;
            self.root_scope.popper = $ionicPopup.show({
               templateUrl: 'view/dialog/med_reminder.html',
               title: "<span class='pop-title'>Medicijn Innamemoment</span><span class='pop-time'>" + self.root_scope.med_list[0].time + "</span>",
               scope: self.root_scope
            });
         }
      }
   }])
;