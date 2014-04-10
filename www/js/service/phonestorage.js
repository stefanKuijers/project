angular.module('project.service.phonestorage', [])
   .service('Phonestorage', function($ionicPlatform) {
      // var connection, event_aggregater;
      // var log = "Log Start <:|:> ";

      // var DB_NAME = "Project_Database";
      // var MED_TABLE_NAME = "Medicins";

      

      // function initialize_database() {
      //    write_log("initialize_database");
      //    connection = window.openDatabase("Database", "1.0", DB_NAME, 200000);
         
      //    function queryDB(tx) {
      //       write_log("query the db for table ' + MED_TABLE_NAME + '");
      //       tx.executeSql('SELECT * FROM ' + MED_TABLE_NAME + '', [], querySuccess, errorCB);
      //    }

      //    function querySuccess(tx, results) {
      //       write_log("query was success");
      //       var result_rows = [];
      //       for (var i=0; i < results.rows.length; i++) {
      //          write_log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
      //          result_rows.push(results.rows.item(i));
      //       }
      //       event_aggregater.$emit("MED_DATA_RETRIEVED", result_rows);
      //    }

      //    function errorCB(tx, err) {
      //       if (err.code !== 5) {
      //          write_log("Error processing SQL: " + err.code);
      //       }

      //       write_log("No table found in database. Let's create one");
      //       // err.code === 5 this means the table does noet excist in the database
      //       connection.transaction(populateDB, error_CB, successCB);
      //    }

      //    write_log("start query transaction");
      //    connection.transaction(queryDB, errorCB);

      //    // Populate the database 
      //    //
      //    function populateDB(tx) {
      //       write_log("populateDB");
      //       tx.executeSql('DROP TABLE IF EXISTS ' + MED_TABLE_NAME);
      //       tx.executeSql('CREATE TABLE IF NOT EXISTS ' + MED_TABLE_NAME + ' (id unique, data)');
      //       tx.executeSql('INSERT INTO ' + MED_TABLE_NAME + ' (id, data) VALUES (1, "First row")');
      //       tx.executeSql('INSERT INTO ' + MED_TABLE_NAME + ' (id, data) VALUES (2, "Second row")');
      //    }

      //    // Transaction error callback
      //    //
      //    function error_CB(tx, err) {
      //       write_log("Error while creating table in database:" + err);
      //    }
         
      //    // Transaction success callback
      //    //
      //    function successCB() {
      //       write_log("Table created in database");
      //       // table created in database. Now execute a select query.
      //       connection.transaction(queryDB, errorCB);
      //    }
      // }

      // function write_log(message) {
      //    var log_message = String(message);
      //    log += log_message + " <:|:> ";
      // }

      return {
         event_aggregater: {},
         connection: {},
         settings: {
            DB_NAME: "Project_Database",
            MED_TABLE_NAME: "Medicin",
            SETTINGS_TABLE_NAME: "Setting"
         },

         init: function(event_scope) {
            this.event_aggregater = event_scope;

            var scope = this;
            $ionicPlatform.ready(function() {
               console.log("device ready for phonestorage");
               scope.connection = scope.connect();

               scope.table_exists(scope.settings.MED_TABLE_NAME);
               scope.event_aggregater.$on("table_does_not_exist", function(e, result) {
                  scope.setup_storage();
               });

            });
         },

         connect: function() {
            return window.openDatabase("Database", "1.0", this.settings.DB_NAME, 200000);
         },

         table_exists: function(table_name) {
            var scope = this;
            this.connection.transaction(
               function(tx) {
                  scope.query("SELECT 1 FROM " + scope.settings.MED_TABLE_NAME, tx);
               }
            );
         },

         query: function(query, tx, success_event) {
            var scope = this;
            tx.executeSql(
               query, 
               [], 
               function(result) { // a query succeeded
                  console.log("a query succeeded");
                  scope.event_aggregater.$emit(success_event ,result);
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
                  console.log("med table created")
               }
            );
         },

         setup_settings_table: function(scope) {
            this.connection.transaction(
               function(tx) {
                  tx.executeSql('DROP TABLE IF EXISTS ' + scope.settings.SETTINGS_TABLE_NAME);
                  tx.executeSql('CREATE TABLE IF NOT EXISTS ' + scope.settings.SETTINGS_TABLE_NAME + ' (id unique, data)');
                  tx.executeSql('INSERT INTO ' + scope.settings.SETTINGS_TABLE_NAME + ' (id, data) VALUES (1, "First row")');
                  tx.executeSql('INSERT INTO ' + scope.settings.SETTINGS_TABLE_NAME + ' (id, data) VALUES (2, "Second row")');
               }, 
               this.query_failed, 
               function() {
                  console.log("setting table created")
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
         }

         
      }
   })
;