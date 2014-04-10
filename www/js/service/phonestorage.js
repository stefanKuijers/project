angular.module('project.service.phonestorage', [])
   .service('Phonestorage', function($ionicPlatform) {
      return {
         event_aggregater: {},
         connection: {},
         settings: {
            DB_NAME: "Project_Database",
            MED_TABLE_NAME: "Medicin",
            SETTINGS_TABLE_NAME: "Setting"
         },
         default_values: {
            settings: {
               sound_level: "75",
               sound: "2",
               viration_notification: "true",
               shake_to_take: "false",
               visual_notification:"true",
               contrast_level: "25",
               vibration_input: "false",
               sound_input: "true"
            }
         },

         init: function(event_scope) {
            this.event_aggregater = event_scope;
            this.connection = this.connect();

            this.table_exists(this.settings.MED_TABLE_NAME);

            var scope = this;
            this.event_aggregater.$on("table_does_not_exist", function(e, result) {
               scope.setup_storage();
            });
         },

         /**
            PUBLIC FUNCTIONS
         */
         /* GET */
         get_medicins: function() {},
         get_settings: function() {
            var scope = this;
            this.connection.transaction(
               function(tx) {
                  scope.query("SELECT * FROM " + scope.settings.SETTINGS_TABLE_NAME, tx, "SETTINGS_RETRIEVED");
               }
            );
         },

         get_reminders: function() {},
         get_history: function() {},
         get_conditions: function() {},

         /* ADD */
         add_medicin: function(data) {},

         /* UPDATE */
         update_medicin: function(attribute, value) {},
         update_setting: function(attribute, value) {

         },


         /**
            PRIVATE FUNCTIONS
         */
         connect: function() {
            return window.openDatabase("Database", "1.0", this.settings.DB_NAME, 200000);
         },

         table_exists: function(table_name) {
            var scope = this;
            this.connection.transaction(
               function(tx) {
                  // checks only or the med table does not exists. If it doesnt we assume none of the oters exist or are corrupted
                  scope.query("SELECT 1 FROM " + scope.settings.MED_TABLE_NAME, tx, "STORAGE_READY");
               }
            );
         },

         query: function(query, tx, success_event) {
            var scope = this;
            tx.executeSql(
               query, 
               [], 
               function(transaction, result) { // a query succeeded
                  // console.log("a query succeeded. Event:", success_event, "transaction:", transaction, "result:", result);
                  if (success_event)
                     scope.event_aggregater.$emit(success_event, result);
               }, 
               function(tx, err) { // a query failed
                  if (err.code === 5) 
                     scope.event_aggregater.$emit("table_does_not_exist",err);
               }
            );
         },

         query_failed: function(e, ee) {
            console.log("query failed. Dead end", e, ee);
         },


         setup_storage: function() {
            console.log("table does not exists so lets set up storage");

            this.setup_med_table(this);
            this.setup_settings_table(this);
            this.setup_history_table(this);
            this.setup_reminder_table(this);
            this.setup_user_condition_table(this);
         },

         setup_med_table: function(scope) {
            this.connection.transaction(
               function(tx) {
                  tx.executeSql('DROP TABLE IF EXISTS ' + scope.settings.MED_TABLE_NAME);
                  tx.executeSql('CREATE TABLE IF NOT EXISTS ' + scope.settings.MED_TABLE_NAME + ' (id unique, data)');
                  tx.executeSql('INSERT INTO ' + scope.settings.MED_TABLE_NAME + ' (id, data) VALUES (1, "First row")');
                  tx.executeSql('INSERT INTO ' + scope.settings.MED_TABLE_NAME + ' (id, data) VALUES (2, "Second row")');
               }, 
               this.query_failed, 
               function() {
                  console.log("med table created");
               }
            );
         },

         setup_settings_table: function(scope) {
            this.connection.transaction(
               function(tx) {
                  tx.executeSql('DROP TABLE IF EXISTS ' + scope.settings.SETTINGS_TABLE_NAME);

                  // how to auto increment the id?
                  tx.executeSql('CREATE TABLE IF NOT EXISTS ' + scope.settings.SETTINGS_TABLE_NAME + ' (id INT IDENTITY(1,1) PRIMARY KEY, key VARCHAR(50), value VARCHAR(50))');
                  
                  var query_pre_fix = 'INSERT INTO ' + scope.settings.SETTINGS_TABLE_NAME + ' (key, value) VALUES ';
                  for (var key in scope.default_values.settings) {
                     tx.executeSql(query_pre_fix + '("' + key + '", "' + scope.default_values.settings[key] + '")');
                  }
               }, 
               this.query_failed, 
               function() {
                  console.log("setting table created");
               }
            );
         },

         setup_history_table: function(scope) {
            // setup table and inject default data
         },

         setup_reminder_table: function(scope) {
            // setup table and inject default data
         },

         setup_user_condition_table: function(scope) {
            // setup table and inject default data

            scope.event_aggregater.$emit("STORAGE_READY", "got initialized");
         }

         
      }
   })
;