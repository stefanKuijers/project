angular.module('project.service.phonestorage', [])
   .factory('Phonestorage', function($ionicPlatform) {
      var connection;
      var log = "Log Start <:|:> ";

      $ionicPlatform.ready(function() {
         write_log("device ready by $ionicPlatform");

         initialize_database();
      });

      function initialize_database() {
         write_log("initialize_database");
         connection = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
         
         function queryDB(tx) {
            write_log("query the db for table DEMO");
            tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
         }

         function querySuccess(tx, results) {
            write_log("query was success");
            for (var i=0; i < results.rows.length; i++){
               write_log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
            }
         }

         function errorCB(tx, err) {
            if (err.code !== 5) {
               write_log("Error processing SQL: " + err.code);
            }

            write_log("No table found in database. Let's create one");
            // err.code === 5 this means the table does noet excist in the database
            connection.transaction(populateDB, error_CB, successCB);
         }

         write_log("start query transaction");
         connection.transaction(queryDB, errorCB);

         // Populate the database 
         //
         function populateDB(tx) {
            write_log("populateDB");
            tx.executeSql('DROP TABLE IF EXISTS DEMO');
            tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
            tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
            tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
         }

         // Transaction error callback
         //
         function error_CB(tx, err) {
            write_log("Error while creating table in database:" + err);
         }
         
         // Transaction success callback
         //
         function successCB() {
            write_log("Table created in database");
            // table created in database. Now execute a select query.
            connection.transaction(queryDB, errorCB);
         }
      }

      function write_log(message) {
         var log_message = String(message);
         log += log_message + " <:|:> ";
      }

      return {
         connection: connection,
         get_log: function() {
            return log;
         }
      }
   })
;