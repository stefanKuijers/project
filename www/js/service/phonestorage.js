angular.module('project.service.phonestorage', [])
   .service('Phonestorage', [function() {
      return {
         default_values: {
            settings: {
               sound_level:            { type: "int",  value: "75"},
               sound:                  { type: "int",  value: "2"},
               vibration_notification: { type: "bool", value: "true"},
               shake_to_take:          { type: "bool", value: "false"},
               visual_notification:    { type: "bool", value: "true"},
               contrast_level:         { type: "int",  value: "25"},
               vibration_input:        { type: "bool", value: "false"},
               sound_input:            { type: "bool", value: "true"}
            },
            user_data: {
               show_scan_explanation: 'true'
            },
            meds: {
               0: { 
                  id: 0, 
                  prescribed: true,
                  description: "Dit medicijn behoort tot de medicijngroep van vochtafdrijvende middelen.",
                  trade_name: "Hydrochloorthiazide",
                  note: "Een notule bij dit medicijn",
                  Icon_id: 3,
                  Unit_id: 3,
                  dosis_amount: 25,
                  when_to_use: "Dit medicijn werkt vochtafdrijvend. Te gebruiken bij: hartfalen, leverziekte, nierziekte, longoedeem, hoge bloeddruk of voorkoming van nierstenen. Dit medicijn zorgt ervoor dat u extra vochtafdrijft.",
                  when_not_to_use: "U word afgeraden dit medicijn te gebruiken wanneer u diabetes of vast gestelde nierproblemen heeft. ",
                  how_to_use: "Bij het ontbijt innemen met water. Blijf gedurende de dag een gewone hoeveelheid drinken.",
                  active_ingredient: 4
               },
               1: { 
                  id: 1, 
                  prescribed: false,
                  description: "Dit medicijn behoort tot de medicijngroep van pijnstillende middelen. Dit middel wordt dan ook vaak voorgescheven tegen de pijn.",
                  trade_name: "Paracetamol Trekpleister",
                  note: "Een notule bij dit medicijn",
                  Icon_id: 0,
                  Unit_id: 3,
                  dosis_amount: 200,
                  when_to_use: "Dit medicijn werkt pijnstillend. Te gebruiken bij: hoofdpijn, kiespijn, ongesteldheidspijn.",
                  when_not_to_use: "U word afgeraden dit medicijn te gebruiken wanneer u diabetes of vast gestelde nierproblemen heeft. ",
                  how_to_use: "Bij het ontbijt innemen met water. Blijf gedurende de dag een gewone hoeveelheid drinken.",
                  active_ingredient: 0
               },
               2: { 
                  id: 2, 
                  prescribed: true,
                  description: "Dit medicijn behoort tot de medicijngroep van pijnstillende middelen. Dit middel wordt dan ook vaak voorgescheven tegen de pijn.",
                  trade_name: "Miconazolnitraat",
                  note: "Een notule bij dit medicijn",
                  Icon_id: 2,
                  Unit_id: 3,
                  dosis_amount: 100,
                  when_to_use: "Dit medicijn werkt vochtafdrijvend. Te gebruiken bij: hartfalen, leverziekte, nierziekte, longoedeem, hoge bloeddruk of voorkoming van nierstenen. Dit medicijn zorgt ervoor dat u extra vochtafdrijft.",
                  when_not_to_use: "U word afgeraden dit medicijn te gebruiken wanneer u diabetes of vast gestelde nierproblemen heeft. ",
                  how_to_use: "Bij het ontbijt innemen met water. Blijf gedurende de dag een gewone hoeveelheid drinken.",
                  active_ingredient: 3
               }, 
               3: { 
                  id: 3, 
                  prescribed: true,
                  description: "Dit medicijn behoort tot de medicijngroep van pijnstillende middelen. Dit middel wordt dan ook vaak voorgescheven tegen de pijn.",
                  trade_name: "Nurofee",
                  note: "Een notule bij dit medicijn",
                  Icon_id: 3,
                  Unit_id: 0,
                  dosis_amount: 50,
                  when_to_use: "Dit medicijn werkt vochtafdrijvend. Te gebruiken bij: hartfalen, leverziekte, nierziekte, longoedeem, hoge bloeddruk of voorkoming van nierstenen. Dit medicijn zorgt ervoor dat u extra vochtafdrijft.",
                  when_not_to_use: "U word afgeraden dit medicijn te gebruiken wanneer u diabetes of vast gestelde nierproblemen heeft. ",
                  how_to_use: "Bij het ontbijt innemen met water. Blijf gedurende de dag een gewone hoeveelheid drinken.",
                  active_ingredient: 2
               }   
            },
            active_ingredients : ["Paracetamol", "Hydrotalciet", "Nurofeen", "Dextromethorfan", "Hydrochloorthiazide"]
         },
         event_aggregater: {},
         initialized: false,
         connection: {},
         settings: {
            DB_NAME:                       "Project_Database",
            MED_TABLE_NAME:                "Medicin",
            SETTINGS_TABLE_NAME:           "Setting",
            ICON_TABLE_NAME:               "Icon",
            UNIT_TABLE_NAME:               "Unit",
            INTERACTION_TABLE_NAME:        "Interaction",
            ACTIVE_INGREDIENT_TABLE_NAME:  "Active_Ingredient",
            INTERACTION_STATUS_TABLE_NAME: "Interaction_Status",
            DOSIS_TABLE_NAME:              "Dosis",
            INTERVAL_UNIT_TABLE_NAME:      "Interval_Unit", 
            USER_DATA_TABLE_NAME:          "User_Data", 
            HISTORY_TABLE_NAME:            "History",
            accepted_units:                ["ml", "cl", "dl", "mg", "g", "pch", "sachet"],
            accepted_interval_units:       ["dagelijks", "weekelijks", "geen"],
            accepted_icons:                ["tablet_1", "tablet_2", "tablet_3", "liquid", "powder", "injection"],
            interaction_statusses:         ["Ongevaarlijk", "Enigzins gevaarlijk", "gevaarlijk", "extreem gevaarlijk"]
         },
         events: {
            STORAGE_READY:                      "STORAGE_READY",
            STORAGE_INITIALIZED:                "STORAGE_INITIALIZED",
            TABLE_DOES_NOT_EXIST:               "TABLE_DOES_NOT_EXIST",
            SETTINGS_RETRIEVED:                 "SETTINGS_RETRIEVED",
            MED_OVERVIEW_RETRIEVED:             "MEDS_RETRIEVED",
            MED_RETRIEVED:                      "MED_RETRIEVED",
            MED_TIMES_RETRIEVED:                "MED_TIMES_RETRIEVED",
            SETTING_STORED:                     "SETTING_STORED",
            DOSE_INSERTED:                      "DOSE_INSERTED",
            INTERACTION_LIST_RETRIEVED:         "INTERACTION_LIST_RETRIEVED",
            MED_NAMES_RETRIEVED:                "MED_NAMES_RETRIEVED",
            MED_ADDED:                          "MED_ADDED",
            DOSIS_BY_TIME_RETRIEVED:            "DOSIS_BY_TIME_RETRIEVED",
            DOSE_UPDATED:                       "DOSE_UPDATED",
            USER_DATA_RETRIEVED:                "USER_DATA_RETRIEVED",
            DOSIS_BY_TASK_ID_RETRIEVED:         "DOSIS_BY_TASK_ID_RETRIEVED",
            SINGLE_MED_HISTORY_EVENT_RETRIEVED: "SINGLE_MED_HISTORY_EVENT_RETRIEVED",
            MED_HISTORY_OVERVIEW_RETRIEVED:     "MED_HISTORY_OVERVIEW_RETRIEVED",
            INTERACTION_RETRTIEVED:             "INTERACTION_RETRTIEVED"
         },

         init: function(event_scope, populate_storage) {
            this.event_aggregater = event_scope;
            this.populate_storage = populate_storage;
            this.connection = this.connect();

            this.table_exists(this.settings.MED_TABLE_NAME);

            var self = this;
            if ( !this.event_aggregater.listen_for_rebuild) {
               this.event_aggregater.listen_for_rebuild = this.event_aggregater.$on(this.events.TABLE_DOES_NOT_EXIST , function(e, result) {
                  
                  // self.setup_storage();
               });
            }
         },

         /**
            PUBLIC FUNCTIONS
         */
         /* GET */
         get_med_overview: function(caller_scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "SELECT " + 
                        "Medicin.id, " +
                        "Medicin.prescribed, " +
                        "Medicin.trade_name, " +
                        "Medicin.dosis_amount, " +
                        "Unit.unit, " +
                        "Icon.name as icon, " +
                        "Dosis.time, " +
                        "Dosis.amount " +
                     "FROM Dosis " +
                        "INNER JOIN Medicin on Dosis.Med_id = Medicin.id " +
                        "INNER JOIN Unit on Medicin.Unit_id = Unit.id " +
                        "INNER JOIN Icon on Medicin.Icon_id = Icon.id" +
                     ";" , 
                     tx, 
                     self.events.MED_OVERVIEW_RETRIEVED, 
                     caller_scope
                  );
               }
            );
         }, 

         get_medicin_and_times: function(caller_scope, med_id) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "SELECT " + 
                        "Medicin.id, " +
                        "Medicin.prescribed, " +
                        "Medicin.trade_name, " +
                        "Medicin.note, " +
                        "Medicin.dosis_amount, " +
                        "Medicin.when_to_use, " +
                        "Medicin.when_not_to_use, " +
                        "Medicin.how_to_use, " +
                        "Active_Ingredient.name as active_ingredient, " +
                        "Unit.unit, " +
                        "Icon.name as icon " +
                     "FROM Medicin " +
                        "JOIN Active_Ingredient on Medicin.Active_Ingredient_id = Active_Ingredient.id " +
                        "JOIN Unit on Medicin.Unit_id = Unit.id " +
                        "JOIN Icon on Medicin.Icon_id = Icon.id " +
                     "WHERE "+ 
                        "Medicin.id=" + med_id + " " +
                     ";" , 
                     tx, 
                     self.events.MED_RETRIEVED, 
                     caller_scope
                  );
                  self.query(
                     "SELECT " + 
                        "Dosis.id, " +
                        "Dosis.time, " +
                        "Dosis.amount, " +
                        "Dosis.reminder_task_id, " +
                        "Dosis.reoccurence, " +
                        "Dosis.special_interval, " +
                        "Interval_Unit.name as interval " +
                     "FROM Dosis " +
                        "JOIN Interval_Unit on Dosis.Interval_Unit_id = Interval_Unit.id " +
                     "WHERE "+ 
                        "Dosis.Med_id=" + med_id + " " +
                     ";" , 
                     tx, 
                     self.events.MED_TIMES_RETRIEVED, 
                     caller_scope
                  );
               }
            );
         },
         get_settings: function(caller_scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query("SELECT * FROM " + self.settings.SETTINGS_TABLE_NAME, tx, self.events.SETTINGS_RETRIEVED, caller_scope);
               }
            );
         },
         get_med_names: function(caller_scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "SELECT id, trade_name, prescribed FROM Medicin;" , 
                     tx, 
                     self.events.MED_NAMES_RETRIEVED, 
                     caller_scope
                  );
               }
            );
         },
         get_dosis_by_time: function(time, caller_scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "SELECT " +
                        "Dosis.reminder_task_id, " +
                        "Medicin.trade_name " +
                     "FROM " +
                        "Dosis " +
                     "JOIN Medicin ON Dosis.med_id = Medicin.id " +
                     "WHERE " +
                        "Dosis.time = '"+ time +"'" +
                     ";" , 
                     tx, 
                     self.events.DOSIS_BY_TIME_RETRIEVED, 
                     caller_scope
                  );
               }
            );
         },
         get_user_data: function(event_scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query("SELECT * FROM " + self.settings.USER_DATA_TABLE_NAME, tx, self.events.USER_DATA_RETRIEVED, event_scope);
               }
            );
         },
         get_dosis_by_task_id: function(id, event_scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "SELECT " +
                        "Dosis.reminder_task_id AS tasks, " +
                        "Dosis.time, " +
                        "Dosis.amount, " +
                        "Dosis.med_id as id, " +
                        "Icon.id as icon, " +
                        "Medicin.dosis_amount, " +
                        "Medicin.trade_name, " +
                        "Unit.unit " +
                     "FROM " +
                        "Dosis " +
                     "JOIN Medicin ON Dosis.med_id = Medicin.id " +
                     "JOIN Icon ON Medicin.Icon_id = Icon.id " +
                     "JOIN Unit ON Medicin.Unit_id = Unit.id " +
                     "WHERE " +
                        "Dosis.reminder_task_id LIKE '%" + id + "%'" +
                     ";" , 
                     tx, 
                     self.events.DOSIS_BY_TASK_ID_RETRIEVED, 
                     event_scope
                  );
               }
            );
         },
         get_history_overview: function(event_scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "SELECT * FROM History;" , 
                     tx, 
                     self.events.MED_HISTORY_OVERVIEW_RETRIEVED, 
                     event_scope
                  );
               }
            );
         },
         get_single_med_history: function(history_obj, now, event_scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "SELECT * " +
                     "FROM " +
                        "History " +
                     "WHERE " +
                        "History.med_name = '" + history_obj.trade_name + "' AND " +
                        "History.time_scheduled = '" + history_obj.time + "' AND " +
                        "History.date = DATE('" + now.toString('yyyy-MM-d') + "') " +
                     ";" , 
                     tx, 
                     self.events.SINGLE_MED_HISTORY_EVENT_RETRIEVED, 
                     event_scope
                  );
               }
            );
         },
         get_interactions_by_med: function(med_name, event_scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     'SELECT ' +
                        'Interaction.id, ' +
                        'Interaction.description, ' +
                        'Med1.trade_name AS first_med_name, ' +
                        'Med2.trade_name AS second_med_name, ' +
                        'Interaction_Status.status ' +
                     'FROM Interaction ' + 
                     'JOIN Medicin AS Med1 ON Interaction.Primary_med_id = Med1.id ' +
                     'JOIN Medicin AS Med2 ON Interaction.Secondary_med_id = Med2.id ' +
                     'JOIN Interaction_Status  ON Interaction.Interaction_Status_id = Interaction_Status.id ' +
                     'WHERE Med1.trade_name="' + med_name + '" OR Med2.trade_name="' + med_name + '";', 
                     tx, 
                     self.events.INTERACTION_RETRTIEVED, 
                     event_scope
                  );
               }
            );
         },

         get_conditions: function() {}, // not implemented

         /* ADD */
         add_medicin: function(med, event_scope) {
            var self = this;
            console.log("insert medicin at storage", med);
            this.connection.transaction(
               function(tx) {
                  self.query(
                     'INSERT INTO ' + self.settings.MED_TABLE_NAME + ' ' + 
                        '( prescribed, ' +
                           'description, ' +
                           'trade_name, ' +
                           'note, ' +
                           'dosis_amount, ' +
                           'when_to_use, ' +
                           'when_not_to_use, ' +
                           'how_to_use, ' +
                           'Icon_id, ' +
                           'Unit_id, ' +
                           'Active_Ingredient_id' +
                           ') ' +
                     'VALUES ' +
                        '( "' + med.prescribed + '", ' +
                           '"' + med.description + '", ' +
                           '"' + med.trade_name + '", ' +
                           '"' + med.note + '", ' +
                           + med.dosis_amount + ', ' +
                           '"' + med.when_to_use + '", ' +
                           '"' + med.when_not_to_use + '", ' +
                           '"' + med.how_to_use + '", ' +
                           + med.Icon_id + ', ' +
                           + med.Unit_id + ', ' +
                           '"' + med.active_ingredient + '"' +
                     ');',
                     tx,
                     self.events.MED_ADDED,
                     event_scope
                  );
               }
            );
         },
         insert_dose_time: function(dose_time, med_id, event_scope) {
            var self = this;
            console.log(dose_time);
            this.connection.transaction(
               function(tx) {
                  self.query(
                     'INSERT INTO ' + self.settings.DOSIS_TABLE_NAME + ' ' +
                        '(amount, time, reoccurence, reminder_task_id, Interval_Unit_id, Med_id, special_interval) ' + 
                     'VALUES (' + dose_time.amount +', "' + dose_time.time + '", '+ dose_time.reoccurence +', "'+ dose_time.reminder_task_id +'", (SELECT id FROM Interval_Unit WHERE name="' + dose_time.interval + '"), '+ med_id + ', "' + dose_time.special_interval + '")' +
                     ';',
                     tx,
                     self.events.DOSE_INSERTED,
                     event_scope
                  );
               }
            );
         },
         archive_user_action: function(med, status, now) {
            console.log('archive', med, status, now);
            var interactions = (med.interactions !== undefined) ? JSON.stringify(med.interactions) : "NULL"; 
            var self = this;
            console.log(
               "INSERT INTO " + self.settings.HISTORY_TABLE_NAME + " " +
                  "(status, time_scheduled, time_taken, date, med_name, icon, dosis, interactions) " + 
               "VALUES (" +
                  "'" + status + "', " + 
                  "'" + med.time + "', " +
                  "'" + now.toString('HH:mm') + "', " +
                  "DATE('"+ now.toString("yyyy-MM-d") +"'), "+
                  "'" + med.trade_name +"', " +
                  "(SELECT name FROM Icon WHERE id=" + med.icon + "), " +
                  "'" + med.amount + " x " + med.dosis_amount + med.unit + "', " +
                  "'" + interactions + "'" +
               ");"
            );
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "INSERT INTO " + self.settings.HISTORY_TABLE_NAME + " " +
                        "(status, time_scheduled, time_taken, date, med_name, icon, dosis, interactions) " + 
                     "VALUES (" +
                        "'" + status + "', " + 
                        "'" + med.time + "', " +
                        "'" + now.toString('HH:mm') + "', " +
                        "DATE('"+ now.toString("yyyy-MM-d") +"'), "+
                        "'" + med.trade_name +"', " +
                        "(SELECT name FROM Icon WHERE id=" + med.icon + "), " +
                        "'" + med.amount + " x " + med.dosis_amount + med.unit + "', " +
                        "'" + interactions + "'" +
                     ");",
                     tx
                  );
               }
            );
         },

         /* UPDATE */
         update_setting: function(attribute, value) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "UPDATE " + self.settings.SETTINGS_TABLE_NAME + " SET value='" + value + "' WHERE key='" + attribute + "';", 
                     tx, 
                     self.events.SETTING_STORED
                  );
               }
            );
         },
         update_dose_time: function(dose_time, event_scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "UPDATE " + self.settings.DOSIS_TABLE_NAME + " " +
                        "SET " +
                           "time='" + dose_time.time + "', " + 
                           "special_interval='" + dose_time.special_interval + "', " + 
                           "reminder_task_id='" + (dose_time.reminder ? JSON.stringify(dose_time.reminder_task_id) : null) + "', " +
                           "amount=" + dose_time.amount + ", " + 
                           "Interval_Unit_id= (SELECT id FROM Interval_Unit WHERE name='" + dose_time.interval + "')" + 
                        "WHERE id='" + dose_time.id + "'" +
                     ";", 
                     tx,
                     self.events.DOSE_UPDATED,
                     event_scope
                  );
               }
            );
         },
         update_user_data: function(attribute, value) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "UPDATE " + self.settings.USER_DATA_TABLE_NAME + " SET value='" + value + "' WHERE key='" + attribute + "';", 
                     tx, 
                     self.events.USER_DATA_STORED
                  );
               }
            );
         },
         update_archive_user_action: function(id, med, status, now) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "UPDATE " + self.settings.HISTORY_TABLE_NAME + " " +
                           "SET " +
                              "time_taken='" + now.toString('HH:mm')  + "', " +
                              "date='" + now.toString("yyyy-MM-d")  + "', " +
                              "status='" + status  + "', " +
                              "interactions='" + JSON.stringify(med.interactions) + "' " + 
                           "WHERE id=" + id + 
                        ";",
                     tx
                  );
               }
            );
         },
         save_med_note: function(id, note) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "UPDATE " + self.settings.MED_TABLE_NAME + " " +
                           "SET " +
                              "note='" + note  + "' " + 
                           "WHERE id=" + id + 
                        ";",
                     tx
                  );
               }
            );
         },


         /* DELETE */
         delete_dose_time: function(id) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query(
                     "DELETE FROM " + self.settings.DOSIS_TABLE_NAME + " WHERE id=" + id + ";", 
                     tx
                  );
               }
            );
         },


         /**
            PRIVATE FUNCTIONS
         */
         connect: function() {
            return window.openDatabase("Database", "1.0", this.settings.DB_NAME, 200000);
         },

         table_exists: function(table_name) {
            var self = this;
            this.connection.transaction(
               function(tx) {
                  self.query("SELECT 1 FROM " + table_name, tx, self.events.STORAGE_INITIALIZED);
               }
            );
         },

         query: function(query, tx, success_event, caller_scope) {
            // console.log("exec query", query);
            var self = this;
            var event_scope = caller_scope ? caller_scope : this.event_aggregater;
            tx.executeSql(
               query, 
               [], 
               function(transaction, result) { // a query succeeded
                  // console.log("a query succeeded. Event:", success_event, "transaction:", transaction, "result:", result);
                  
                  if (success_event === self.events.STORAGE_INITIALIZED)
                     self.initialized = true,
                     event_scope.$broadcast(success_event, result);
                  else if (success_event)
                     event_scope.$emit(success_event, result);
               }, 
               function(tx, err) { // a query failed
                  if (err.code === 5) 
                     event_scope.$emit(self.events.TABLE_DOES_NOT_EXIST, err);
                  console.log("a query failed", err);
               }
            );
         },

         query_failed: function(e, ee) {
            console.log("query failed. Dead end", e, ee);
         },


         setup_storage: function() {
            console.log("setup storage");
            this.setup_med_table(this);
            this.setup_settings_table(this, this.settings.SETTINGS_TABLE_NAME);
            this.setup_history_table(this);
            this.setup_user_data_table(this, this.settings.USER_DATA_TABLE_NAME)
            this.setup_user_condition_table(this);
         },

         setup_med_table: function(scope) {
            var self = this;
            this.connection.transaction(
               function(tx) {

                  // creating ENUM tables as it seems ENUM is not supported
                  self.setup_enum_table(tx, self.settings.ICON_TABLE_NAME, 'name', 'VARCHAR(6)', self.settings.accepted_icons);
                  self.setup_enum_table(tx, self.settings.UNIT_TABLE_NAME, 'unit', 'VARCHAR(2)', self.settings.accepted_units);
                  self.setup_enum_table(tx, self.settings.ACTIVE_INGREDIENT_TABLE_NAME, 'name', 'VARCHAR(50)', self.default_values.active_ingredients);
                  self.setup_enum_table(tx, self.settings.INTERACTION_STATUS_TABLE_NAME, 'status', 'VARCHAR(20)', self.settings.interaction_statusses);
                  self.setup_enum_table(tx, self.settings.INTERVAL_UNIT_TABLE_NAME, 'name', 'VARCHAR(5)', self.settings.accepted_interval_units);

                  tx.executeSql('DROP TABLE IF EXISTS ' + self.settings.INTERACTION_TABLE_NAME);
                  tx.executeSql(
                     'CREATE TABLE IF NOT EXISTS ' + self.settings.INTERACTION_TABLE_NAME + ' (' +
                        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                        'description VARCHAR(1000), ' +
                        'Interaction_Status_id INT REFERENCES ' + self.settings.INTERACTION_STATUS_TABLE_NAME + '(id),' +
                        'Primary_med_id INT REFERENCES ' + self.settings.MED_TABLE_NAME + '(id),' +
                        'Secondary_med_id INT REFERENCES ' + self.settings.MED_TABLE_NAME + '(id)' +
                     ')'
                  );
                  if (self.populate_storage) {
                     tx.executeSql(
                        'INSERT INTO ' + self.settings.INTERACTION_TABLE_NAME + 
                        ' (description, Interaction_Status_id, Primary_med_id, Secondary_med_id) ' + 
                        'SELECT "Deze twee medicijnen hebben een gevaarlijke wisselwerking.", 2, 4, 2 UNION ALL ' +
                        'SELECT "Deze medicijnen verslechteren elkaars werking.", 0, 1, 3 ;'
                     );
                  }

                  tx.executeSql('DROP TABLE IF EXISTS ' + self.settings.DOSIS_TABLE_NAME);
                  tx.executeSql(
                     'CREATE TABLE IF NOT EXISTS ' + self.settings.DOSIS_TABLE_NAME + ' (' +
                        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                        'amount INT, ' +
                        'time TIME, ' +
                        'reoccurence INT, ' +
                        'reminder_task_id INT, ' +
                        'Interval_Unit_id INT REFERENCES ' + self.settings.INTERVAL_UNIT_TABLE_NAME + '(id),' +
                        'Med_id INT REFERENCES ' + self.settings.MED_TABLE_NAME + '(id),' +
                        'special_interval VARCHAR(50)' +
                     ')'
                  );

                  if (self.populate_storage) {
                     tx.executeSql(
                        'INSERT INTO ' + self.settings.DOSIS_TABLE_NAME + 
                        ' (amount, time, reoccurence, reminder_task_id, Interval_Unit_id, Med_id) ' + 
                        'SELECT 2, "06:00", 1, "null", 0, 0 UNION ALL ' +
                        'SELECT 1, "08:00", 1, "null", 0, 0 UNION ALL ' +
                        'SELECT 3, "08:00", 1, "null", 0, 2 UNION ALL ' +
                        'SELECT 1, "13:00", 1, "null", 0, 0 UNION ALL ' +
                        'SELECT 1, "13:00", 1, "null", 0, 1 UNION ALL ' +
                        'SELECT 2, "13:00", 1, "null", 0, 2 UNION ALL ' +
                        'SELECT 1, "13:00", 1, "null", 0, 3 UNION ALL ' +
                        'SELECT 1, "16:00", 1, "null", 0, 3 UNION ALL ' +
                        'SELECT 1, "18:30", 1, "null", 0, 2 UNION ALL ' +
                        'SELECT 1, "18:30", 1, "null", 0, 0;'
                     );
                     tx.executeSql(
                        'INSERT INTO ' + self.settings.DOSIS_TABLE_NAME + 
                        ' (amount, time, reoccurence, reminder_task_id, Interval_Unit_id, Med_id) ' + 
                        'SELECT 1, "08:00", 1, "null", 0, 2 UNION ALL ' +
                        'SELECT 1, "13:00", 1, "null", 0, 0 UNION ALL ' +
                        'SELECT 2, "22:00", 1, "null", 0, 1;'
                     );
                     tx.executeSql(
                        'INSERT INTO ' + self.settings.DOSIS_TABLE_NAME + 
                        ' (amount, time, reoccurence, reminder_task_id, Interval_Unit_id, Med_id, special_interval) ' + 
                        'SELECT 2, "08:00", 1, "null", 1, 1, \'{"monday":false,"tuesday":false,"wednesday":false,"thursday":false,"friday":true,"saturday":false,"sunday":true}\' UNION ALL ' +
                        'SELECT 2, "22:00", 1, "null", 1, 1, \'{"monday":true,"tuesday":true,"wednesday":false,"thursday":false,"friday":true,"saturday":false,"sunday":true}\';'
                     );
                  }

                  // Create the med table
                  tx.executeSql('DROP TABLE IF EXISTS ' + self.settings.MED_TABLE_NAME);
                  tx.executeSql(
                     'CREATE TABLE IF NOT EXISTS ' + self.settings.MED_TABLE_NAME + ' (' +
                        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                        'prescribed BOOL, ' +
                        'description VARCHAR(1000), ' +
                        'trade_name VARCHAR(100), ' +
                        'note VARCHAR(4000), ' +
                        'dosis_amount INT, ' +
                        'when_to_use VARCHAR(1000), ' +
                        'when_not_to_use VARCHAR(1000), ' +
                        'how_to_use VARCHAR(1000), ' +
                        'Icon_id INT REFERENCES ' + self.settings.ICON_TABLE_NAME + '(id),' +
                        'Unit_id INT REFERENCES ' + self.settings.UNIT_TABLE_NAME + '(id),' +
                        'Active_Ingredient_id INT REFERENCES ' + self.settings.ACTIVE_INGREDIENT_TABLE_NAME + '(id)' +
                     ')'
                  );
                  if (self.populate_storage) {
                     var med; 
                     var query_pre_fix = 'INSERT INTO ' + self.settings.MED_TABLE_NAME + ' (prescribed, description, trade_name, note, dosis_amount, when_to_use, when_not_to_use, how_to_use, Icon_id, Unit_id, Active_Ingredient_id) VALUES ';
                     for (med_i in self.default_values.meds) {
                        med = self.default_values.meds[med_i];
                        tx.executeSql(query_pre_fix + '("' + med.prescribed + '", "' + med.description + '", "' + med.trade_name + '", "' + med.note + '", ' + med.dosis_amount + ', "' + med.when_to_use + '", "' + med.when_not_to_use + '", "' + med.how_to_use + '", ' + med.Icon_id + ', ' + med.Unit_id + ', "' + med.active_ingredient + '")');
                     }
                  }
               }, 
               this.query_failed
            );
         },

         setup_enum_table: function(tx, table_name, value_column_name, value_column_type, values) {
            tx.executeSql('DROP TABLE IF EXISTS ' + table_name);
            tx.executeSql(
               'CREATE TABLE IF NOT EXISTS ' + table_name + ' (' +
                  'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                  value_column_name + ' ' + value_column_type +
               ')'
            );

            var i = 0, length = values.length;
            for (i; i < length; i++) {
               tx.executeSql('INSERT INTO ' + table_name + ' (id, ' + value_column_name + ') VALUES (' + i + ', "' + values[i] + '")');
            }
         },

         setup_settings_table: function(scope, table_name) {
            this.connection.transaction(
               function(tx) {
                  tx.executeSql('DROP TABLE IF EXISTS ' + table_name);
                  tx.executeSql('CREATE TABLE IF NOT EXISTS ' + table_name + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, key VARCHAR(50), value VARCHAR(50), type VARCHAR(4))');
                  
                  var query_pre_fix = 'INSERT INTO ' + table_name + ' (key, value, type) VALUES ';
                  for (var key in scope.default_values.settings) {
                     tx.executeSql(query_pre_fix + '("' + key + '", "' + scope.default_values.settings[key].value + '", "' + scope.default_values.settings[key].type + '")');
                  }
               }, 
               this.query_failed, 
               function() {
                  // console.log("setting table created");
               }
            );
         },

         setup_user_data_table: function(scope, table_name) {
            this.connection.transaction(
               function(tx) {
                  tx.executeSql('DROP TABLE IF EXISTS ' + table_name);
                  tx.executeSql('CREATE TABLE IF NOT EXISTS ' + table_name + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, key VARCHAR(50), value VARCHAR(50))');
                  
                  var query_pre_fix = 'INSERT INTO ' + table_name + ' (key, value) VALUES ';
                  for (var key in scope.default_values.user_data) {
                     tx.executeSql(query_pre_fix + '("' + key + '", "' + scope.default_values.user_data[key] + '")');
                  }
               }, 
               this.query_failed, 
               function() {
                  // console.log("setting table created");
               }
            );
         },

         setup_history_table: function(scope) {
            console.log("setup history table");
            var self = this;
            this.connection.transaction(
               function(tx) {
                  tx.executeSql('DROP TABLE IF EXISTS ' + self.settings.HISTORY_TABLE_NAME);
                  tx.executeSql(
                     'CREATE TABLE IF NOT EXISTS ' + self.settings.HISTORY_TABLE_NAME + ' (' +
                        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                        'status INT, ' +
                        'time_scheduled TIME, ' +
                        'time_taken TIME, ' +
                        'date DATE, ' +
                        'dosis VARCHAR(50), ' +
                        'interactions VARCHAR(100), ' +
                        'med_name VARCHAR(50),' +
                        'icon VARCHAR(10)' +
                     ')'
                  );
                  if (self.populate_storage) {
                     tx.executeSql(
                        'INSERT INTO ' + self.settings.HISTORY_TABLE_NAME + 
                        ' (status, time_scheduled, time_taken, date, med_name, icon, dosis, interactions) ' + 
                        'SELECT 0, "06:00", "06:00", DATE("2014-05-01"), "Ibuprofen", "tablet_1", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT -1, "08:00", NULL, DATE("2014-05-01"), "Paracetamol", "tablet_2", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 0, "10:00", "10:00", DATE("2014-05-01"), "Nurofeen", "tablet_2", "1 x 100mg", NULL UNION ALL ' +
                        'SELECT 0, "13:00", "13:00", DATE("2014-05-01"), "Hydrochloorthiazide", "liquid", "50ml", NULL UNION ALL ' +
                        'SELECT 1, "06:00", "06:05", DATE("2014-05-02"), "Ibuprofen", "tablet_2", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT 0, "08:00", "08:00", DATE("2014-05-02"), "Paracetamol", "tablet_2", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 0, "13:00", "13:00", DATE("2014-05-02"), "Hydrochloorthiazide", "tablet_1", "50ml", NULL UNION ALL ' +
                        'SELECT 0, "06:00", "06:00", DATE("2014-05-03"), "Ibuprofen", "tablet_2", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT 1, "08:00", "08:10", DATE("2014-05-03"), "Paracetamol", "liquid", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 1, "13:00", "13:30", DATE("2014-05-03"), "Hydrochloorthiazide", "tablet_1", "50ml", NULL UNION ALL ' +
                        'SELECT -1, "06:00", NULL, DATE("2014-05-04"), "Ibuprofen", "tablet_2", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT -1, "08:00", NULL, DATE("2014-05-04"), "Paracetamol", "liquid", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 0, "06:00", "06:00", DATE("2014-05-05"), "Ibuprofen", "tablet_1", "2 x 120mg", NULL UNION ALL ' +

                        'SELECT 0, "06:00", "06:00", DATE("2014-05-06"), "Ibuprofen", "tablet_1", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT -1, "08:00", NULL, DATE("2014-05-06"), "Paracetamol", "tablet_2", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 0, "10:00", "10:00", DATE("2014-05-06"), "Nurofeen", "tablet_2", "1 x 100mg", NULL UNION ALL ' +
                        'SELECT 0, "13:00", "13:00", DATE("2014-05-06"), "Hydrochloorthiazide", "liquid", "50ml", NULL UNION ALL ' +
                        'SELECT 1, "06:00", "06:05", DATE("2014-05-07"), "Ibuprofen", "tablet_2", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT 0, "08:00", "08:00", DATE("2014-05-07"), "Paracetamol", "tablet_2", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 0, "13:00", "13:00", DATE("2014-05-07"), "Hydrochloorthiazide", "tablet_1", "50ml", NULL UNION ALL ' +
                        'SELECT 0, "06:00", "06:00", DATE("2014-05-08"), "Ibuprofen", "tablet_2", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT 1, "08:00", "08:10", DATE("2014-05-08"), "Paracetamol", "liquid", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 1, "13:00", "13:30", DATE("2014-05-08"), "Hydrochloorthiazide", "tablet_1", "50ml", NULL UNION ALL ' +
                        'SELECT -1, "06:00", NULL, DATE("2014-05-09"), "Ibuprofen", "tablet_2", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT -1, "08:00", NULL, DATE("2014-05-09"), "Paracetamol", "liquid", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 0, "06:00", "06:00", DATE("2014-05-10"), "Ibuprofen", "tablet_1", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT 0, "06:00", "06:00", DATE("2014-05-10"), "Ibuprofen", "tablet_1", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT 0, "06:00", "06:00", DATE("2014-05-10"), "Ibuprofen", "tablet_1", "2 x 120mg", NULL UNION ALL ' +

                        'SELECT 0, "06:00", "06:00", DATE("2014-05-11"), "Ibuprofen", "tablet_1", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT -1, "08:00", NULL, DATE("2014-05-11"), "Paracetamol", "tablet_2", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 0, "10:00", "10:00", DATE("2014-05-11"), "Nurofeen", "tablet_2", "1 x 100mg", NULL UNION ALL ' +
                        'SELECT 0, "13:00", "13:00", DATE("2014-05-11"), "Hydrochloorthiazide", "liquid", "50ml", NULL UNION ALL ' +
                        'SELECT 1, "06:00", "06:05", DATE("2014-05-12"), "Ibuprofen", "tablet_2", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT 0, "08:00", "08:00", DATE("2014-05-12"), "Paracetamol", "tablet_2", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 0, "13:00", "13:00", DATE("2014-05-12"), "Hydrochloorthiazide", "tablet_1", "50ml", NULL UNION ALL ' +
                        'SELECT 0, "06:00", "06:00", DATE("2014-05-13"), "Ibuprofen", "tablet_2", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT 1, "08:00", "08:10", DATE("2014-05-13"), "Paracetamol", "liquid", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 1, "13:00", "13:30", DATE("2014-05-13"), "Hydrochloorthiazide", "tablet_1", "50ml", NULL UNION ALL ' +
                        'SELECT -1, "06:00", NULL, DATE("2014-05-14"), "Ibuprofen", "tablet_2", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT -1, "08:00", NULL, DATE("2014-05-14"), "Paracetamol", "liquid", "2 x 60mg", NULL UNION ALL ' +
                        'SELECT 0, "06:00", "06:00", DATE("2014-05-15"), "Ibuprofen", "tablet_1", "2 x 120mg", NULL UNION ALL ' +
                        'SELECT 1, "09:00", "09:20", DATE("2014-05-15"), "Ibuprofen", "tablet_2", "2 x 120mg", NULL;'
                     );
                  }
               }, 
               this.query_failed
            );
         },

         setup_user_condition_table: function() {
            // setup table and inject default data

            this.initialized = true;
            this.event_aggregater.$broadcast(this.events.STORAGE_INITIALIZED, "got initialized");
         }
      }
   }])
;