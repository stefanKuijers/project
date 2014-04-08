angular.module(
   'project', 
   [
      'ionic',
      'project.router'
   ]
).run( 
   function($ionicPlatform) {
      $ionicPlatform.ready(function() {
         console.log("device ready by $ionicPlatform");
         //StatusBar.styleDefault();

         // var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
         // db.transaction(populateDB, errorCB, successCB);

         // // Populate the database 
         // //
         // function populateDB(tx) {
         //    tx.executeSql('DROP TABLE IF EXISTS DEMO');
         //    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
         //    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
         //    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
         // }

         // // Transaction error callback
         // //
         // function errorCB(tx, err) {
         //    alert("Error processing SQL: "+err);
         // }
         
         // // Transaction success callback
         // //
         // function successCB() {
         //    alert("success!");
         //    console.log();
         // }
      });
   })
;