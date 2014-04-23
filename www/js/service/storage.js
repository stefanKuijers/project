angular.module('project.service.persistencejs', [])
   .service('Persistencejs', [
      function() {
         var constant = {
            type: {
               BOOL: 'BOOL',
               INT:  'INT',
               NUM:  'NUM',
               TEXT: 'TEXT'
            },
            key: {
               vibration_notification: 'vibration_notification',
               shake_to_take:          'shake_to_take',
               visual_notification:    'visual_notification',
               vibration_input:        'vibration_input',
               sound_input:            'sound_input',
               sound_volume:           'sound_volume',
               screen_contrast:        'screen_contrast'
            }
         };
         var default_settings = [
            {key: constant.key.vibration_notification, value: 'false', type: constant.type.BOOL},
            {key: constant.key.shake_to_take, value: 'true', type: constant.type.BOOL},
            {key: constant.key.visual_notification, value: 'false', type: constant.type.BOOL},
            {key: constant.key.vibration_input, value: true, type: constant.type.BOOL},
            {key: constant.key.sound_input, value: false, type: constant.type.BOOL},
            {key: constant.key.sound_volume, value: 25, type: constant.type.INT},
            {key: constant.key.screen_contrast, value: 75, type: constant.type.INT}
         ];
         persistence.debug = false;
         persistence.store.websql.config(
            persistence,
            'Project_Database',         // DB name
            '0.0.1',                    // DB version
            'Database for med project', // DB display name and description
            5 * 1024 * 1024,            // DB size (5 MB)
            0                           // SQLitePlugin Background processing disabled
         );

         var Setting = persistence.define('SettingTable', {
            key:   "TEXT",
            value: "TEXT",
            type:  "TEXT"
         });

         persistence.schemaSync();

         //singleton containing all methods to be called
         return {
            events: {
               FETCHED_SETTINGS : "FETCHED_SETTINGS"
            },

            init: function() {
               var self = this;
               Setting.all().list(function(settings) {
                  if (settings.length < 1) 
                     self.set_default_settings();
               });
            },

            set_default_settings: function(scope) {
               for (setting in default_settings)
                  this.updateOrAdd( default_settings[setting] );
            },

            add: function(item) {
               var s = new Setting();
               s.key = item.key;
               s.value = item.value + '';
               s.type = item.type;
               persistence.add(s);
               persistence.flush();
            },

            updateOrAdd: function(setting_item) {
               var insert = function() {
                  self.add({
                     key: setting_item.key,
                     value: setting_item.value,
                     type: setting_item.type,
                  });
               },

               self = this;
               Setting.all().filter('key', '=', setting_item.key).one(function(item) {
                  if (!item && setting_item.type) {
                     insert();
                     return;
                  }

                  item.value = setting_item.value + '';
                  persistence.flush();
               });
            },

            update: function(key, value) {
               Setting.all().filter('key', '=', key).one(function(item) {
                  if (!item) return;

                  item.value = value + '';
                  persistence.flush();
               });
            },

            remove: function(key) {
               Setting.all().filter('key', '=', key).destroyAll();
            },

            clearAllItems: function() {
               Setting.all().destroyAll();
            },

            get_settings: function(scope) {
               var parsed_settings = {}, self = this;

               Setting.all().list(function(settings) {
                  var parsed_value;
                  settings.forEach(function(setting) {
                     switch (setting.type) {
                        case constant.type.BOOL: parsed_value = (setting.value == 'true'); break;
                        case constant.type.INT: parsed_value = setting.value; break;
                        default: parsed_value = setting.value;
                     }

                     parsed_settings[setting.key] = parsed_value;
                  });
                  scope.$emit(self.events.FETCHED_SETTINGS, parsed_settings);
               });
            }
         };
      }
   ])
;