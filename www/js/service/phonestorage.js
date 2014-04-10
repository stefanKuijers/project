angular.module('project.service.phonestorage', [])
   .service('Phonestorage', function($ionicPlatform) {
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
            meds_pre: {
               0: { id: 0, dosis: [{time: "08:00", amount: 2}, {time: "12:00", amount: 1}, {time: "18:00", amount: 2}], trade_name: 'Ultacit', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "Hydrotalciet", form: "tablet_1", dose:{amount:200, unit:"mg"}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
               1: { id: 1, dosis: [{time: "08:00", amount: 1}], trade_name: 'Paracetamol Trekpleister', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: false, active_ingredient: "Paracetamol", form: "tablet_2", dose:{amount:100, unit:"mg"}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
               2: { id: 2, dosis: [{time: "12:00", amount: 2}], trade_name: 'Pectrofree', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "Dextromethorfan", form: "tablet_1", dose:{amount:250, unit:"mg"}, interaction: {description: "Dit medicijn kent bepaalde wisselwerkingen met andere medicijnen", status: {code:2, name:"Schadelijk"}, combination_med_id: 3}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
               3: { id: 3, dosis: [{time: "12:00", amount: 1}], trade_name: 'Nurofee', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "Nurofeen", form: "liquid", dose:{amount:200, unit:"ml"}, interaction: {description: "Dit medicijn kent bepaalde wisselwerkingen met andere medicijnen", status: {code:0, name:"Niet Schadelijk"}, combination_med_id: 4}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
               4: { id: 4, dosis: [{time: "12:00", amount: 1}], trade_name: 'Miconazolnitraat', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "miconazol", form: "tablet_3", dose:{amount:400, unit:"mg"}, interaction: {description: "Dit medicijn kent bepaalde wisselwerkingen met andere medicijnen", status: {code:1, name:"Mogelijke bijwerkingen"}, combination_med_id: 3}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
               5: { id: 5, dosis: [{time: "16:30", amount: 1}], trade_name: 'Ipraalox', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "paracetamol", form: "liquid", dose:{amount:10, unit:"cl"}, interaction: {description: "Dit medicijn kent bepaalde wisselwerkingen met andere medicijnen", status: {code:2, name:"Schadelijk"}, combination_med_id: 3}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
               6: { id: 6, dosis: [{time: "16:30", amount: 2}], trade_name: 'Davitamon', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "paracetamol", form: "powder", dose:{amount:20, unit:"gr"}, interaction: {description: "Dit medicijn kent bepaalde wisselwerkingen met andere medicijnen", status: {code:0, name:"Niet Schadelijk"}, combination_med_id: 4}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} }
            },
            meds: {
               0: { 
                  id: 0, 
                  prescribed: true,
                  description: "Dit medicijn behoort tot de medicijngroep van vochtafdrijvende middelen.",
                  trade_name: "Hydrochloorthiazide",
                  note: "Een notule bij dit medicijn",
                  Icon_id: 4,
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
                  Icon_id: 1,
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
            REMINDER_TABLE_NAME:           "Reminder",
            REMINDER_DOSIS_TABLE_NAME:     "Reminder_Dosis",
            INTERVAL_UNIT_TABLE_NAME:      "Interval_Unit", 
            accepted_units:                ["ml", "cl", "dl", "mg", "g"],
            accepted_interval_units:       ["dag", "week", "maand"],
            accepted_icons:                ["tablet_1", "tablet_2", "tablet_3", "liquid", "powder", "injection"],
            interaction_statusses:         ["Ongevaarlijk", "Enigzins gevaarlijk", "gevaarlijk", "extreem gevaarlijk"]
         },
         events: {
            STORAGE_READY:        "STORAGE_READY",
            STORAGE_INITIALIZED:  "STORAGE_INITIALIZED",
            TABLE_DOES_NOT_EXIST: "TABLE_DOES_NOT_EXIST",
            SETTINGS_RETRIEVED:   "SETTINGS_RETRIEVED",
            SETTING_STORED:       "SETTING_STORED"
         },

         init: function(event_scope) {
            this.event_aggregater = event_scope;
            this.connection = this.connect();

            this.table_exists(this.settings.MED_TABLE_NAME);

            var scope = this;

            // comment this line
            // this.event_aggregater.$on(this.events.TABLE_DOES_NOT_EXIST , function(e, result) {
               scope.setup_storage();
            // and this line to force rebuild database on device
            // });
         },

         /**
            PUBLIC FUNCTIONS
         */
         /* GET */
         get_medicins: function() {},
         get_settings: function(caller_scope) {
            var scope = this;
            this.connection.transaction(
               function(tx) {
                  scope.query("SELECT * FROM " + scope.settings.SETTINGS_TABLE_NAME, tx, scope.events.SETTINGS_RETRIEVED, caller_scope);
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
            var scope = this;
            this.connection.transaction(
               function(tx) {
                  scope.query(
                     "UPDATE " + scope.settings.SETTINGS_TABLE_NAME + " SET value='" + value + "' WHERE key='" + attribute + "';", 
                     tx, 
                     scope.events.SETTING_STORED
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
            var scope = this;
            this.connection.transaction(
               function(tx) {
                  scope.query("SELECT 1 FROM " + table_name, tx, scope.events.STORAGE_INITIALIZED);
               }
            );
         },

         query: function(query, tx, success_event, caller_scope) {
            var scope = this;
            var event_scope = caller_scope ? caller_scope : this.event_aggregater;
            tx.executeSql(
               query, 
               [], 
               function(transaction, result) { // a query succeeded
                  console.log("a query succeeded. Event:", success_event, "transaction:", transaction, "result:", result);
                  
                  if (success_event === scope.events.STORAGE_INITIALIZED)
                     scope.initialized = true,
                     event_scope.$broadcast(success_event, result);
                  else if (success_event)
                     event_scope.$emit(success_event, result);
               }, 
               function(tx, err) { // a query failed
                  if (err.code === 5) 
                     event_scope.$emit(scope.events.TABLE_DOES_NOT_EXIST, err);
                  console.log("a query failed", err);
               }
            );
         },

         query_failed: function(e, ee) {
            console.log("query failed. Dead end", e, ee);
         },


         setup_storage: function() {
            this.setup_med_table(this);
            this.setup_settings_table(this, this.settings.SETTINGS_TABLE_NAME);
            this.setup_history_table(this);
            this.setup_reminder_table(this);
            this.setup_user_condition_table(this);
         },

         setup_med_table: function(scope) {
            this.connection.transaction(
               function(tx) {

                  // creating ENUM tables as it seems ENUM is not supported
                  scope.setup_enum_table(tx, scope.settings.ICON_TABLE_NAME, 'name', 'VARCHAR(6)', scope.settings.accepted_icons);
                  scope.setup_enum_table(tx, scope.settings.UNIT_TABLE_NAME, 'unit', 'VARCHAR(2)', scope.settings.accepted_units);
                  scope.setup_enum_table(tx, scope.settings.ACTIVE_INGREDIENT_TABLE_NAME, 'name', 'VARCHAR(50)', scope.default_values.active_ingredients);
                  scope.setup_enum_table(tx, scope.settings.INTERACTION_STATUS_TABLE_NAME, 'status', 'VARCHAR(20)', scope.settings.interaction_statusses);
                  scope.setup_enum_table(tx, scope.settings.INTERVAL_UNIT_TABLE_NAME, 'name', 'VARCHAR(5)', scope.settings.accepted_interval_units);

                  tx.executeSql('DROP TABLE IF EXISTS ' + scope.settings.INTERACTION_TABLE_NAME);
                  tx.executeSql(
                     'CREATE TABLE IF NOT EXISTS ' + scope.settings.INTERACTION_TABLE_NAME + ' (' +
                        'id INT IDENTITY(1,1) PRIMARY KEY, ' +
                        'description VARCHAR(1000), ' +
                        'Interaction_Status_id INT REFERENCES ' + scope.settings.INTERACTION_STATUS_TABLE_NAME + '(id),' +
                        'Primary_med_id INT REFERENCES ' + scope.settings.MED_TABLE_NAME + '(id),' +
                        'Secondary_med_id INT REFERENCES ' + scope.settings.MED_TABLE_NAME + '(id)' +
                     ')'
                  );
                  tx.executeSql(
                     'INSERT INTO ' + scope.settings.INTERACTION_TABLE_NAME + 
                     ' (id, description, Interaction_Status_id, Primary_med_id, Secondary_med_id) ' + 
                     'SELECT 0, "Deze twee medicijnen hebben een gevaarlijke wisselwerking.", 2, 0, 2 UNION ALL ' +
                     'SELECT 1, "Deze medicijnen verslechteren elkaars werking.", 0, 1, 3 ;'
                  );

                  tx.executeSql('DROP TABLE IF EXISTS ' + scope.settings.DOSIS_TABLE_NAME);
                  tx.executeSql(
                     'CREATE TABLE IF NOT EXISTS ' + scope.settings.DOSIS_TABLE_NAME + ' (' +
                        'id INT IDENTITY(1,1) PRIMARY KEY, ' +
                        'amount INT, ' +
                        'time TIME, ' +
                        'reoccurence INT, ' +
                        'reminder BOOL, ' +
                        'Interval_Unit_id INT REFERENCES ' + scope.settings.INTERVAL_UNIT_TABLE_NAME + '(id),' +
                        'Med_id INT REFERENCES ' + scope.settings.MED_TABLE_NAME + '(id)' +
                     ')'
                  );
                  tx.executeSql(
                     'INSERT INTO ' + scope.settings.DOSIS_TABLE_NAME + 
                     ' (id, amount, time, reoccurence, reminder, Interval_Unit_id, Med_id) ' + 
                     'SELECT 0, 2, "06:00", 1, "true", 0, 0 UNION ALL ' +
                     'SELECT 1, 1, "08:00", 1, "true", 0, 0 UNION ALL ' +
                     'SELECT 2, 2, "08:00", 1, "false", 1, 1 UNION ALL ' +
                     'SELECT 3, 3, "08:00", 1, "true", 0, 2 UNION ALL ' +
                     'SELECT 4, 1, "13:00", 1, "true", 0, 0 UNION ALL ' +
                     'SELECT 5, 1, "13:00", 1, "true", 0, 1 UNION ALL ' +
                     'SELECT 6, 2, "13:00", 1, "true", 2, 2 UNION ALL ' +
                     'SELECT 7, 1, "13:00", 1, "true", 0, 3 UNION ALL ' +
                     'SELECT 8, 1, "16:00", 1, "true", 0, 3 UNION ALL ' +
                     'SELECT 9, 1, "18:30", 1, "false", 0, 2 UNION ALL ' +
                     'SELECT 10, 1, "18:30", 1, "true", 0, 0 UNION ALL ' +
                     'SELECT 11, 2, "22:00", 1, "true", 0, 1;'
                  );

                  tx.executeSql('DROP TABLE IF EXISTS ' + scope.settings.REMINDER_TABLE_NAME);
                  tx.executeSql(
                     'CREATE TABLE IF NOT EXISTS ' + scope.settings.REMINDER_TABLE_NAME + ' (' +
                        'id INT IDENTITY(1,1) PRIMARY KEY, ' +
                        'time TIME, ' +
                        'task_id INT' +
                     ')'
                  );
                  tx.executeSql(
                     'INSERT INTO ' + scope.settings.REMINDER_TABLE_NAME + 
                     ' (id, time, task_id) ' + 
                     ' SELECT 0, "06:00", 1 UNION ALL ' +
                     ' SELECT 1, "08:00", 2 UNION ALL ' +
                     ' SELECT 2, "13:00", 3 UNION ALL ' +
                     ' SELECT 3, "16:00", 4 UNION ALL ' +
                     ' SELECT 4, "18:30", 5 UNION ALL ' +
                     ' SELECT 5, "22:00", 6;'
                  );

                  tx.executeSql('DROP TABLE IF EXISTS ' + scope.settings.REMINDER_DOSIS_TABLE_NAME);
                  tx.executeSql(
                     'CREATE TABLE IF NOT EXISTS ' + scope.settings.REMINDER_DOSIS_TABLE_NAME + ' (' +
                        'id INT IDENTITY(1,1) PRIMARY KEY, ' +
                        'Reminder_id INT REFERENCES ' + scope.settings.REMINDER_TABLE_NAME + '(id),' +
                        'Dosis_id INT REFERENCES ' + scope.settings.DOSIS_TABLE_NAME + '(id)' +
                     ')'
                  );
                  tx.executeSql(
                     'INSERT INTO ' + scope.settings.REMINDER_DOSIS_TABLE_NAME + 
                     ' (id, Reminder_id, Dosis_id)' + 
                     ' SELECT 0, 0, 0 UNION ALL ' +
                     ' SELECT 1, 1, 1 UNION ALL ' +
                     ' SELECT 2, 1, 2 UNION ALL ' +
                     ' SELECT 3, 1, 3 UNION ALL ' +
                     ' SELECT 4, 2, 4 UNION ALL ' +
                     ' SELECT 5, 2, 5 UNION ALL ' +
                     ' SELECT 6, 2, 6 UNION ALL ' +
                     ' SELECT 7, 2, 7 UNION ALL ' +
                     ' SELECT 8, 3, 8 UNION ALL ' +
                     ' SELECT 9, 4, 9 UNION ALL ' +
                     ' SELECT 10, 2, 10 UNION ALL ' +
                     ' SELECT 11, 5, 11;'
                  );
        

                  // Create the med table
                  tx.executeSql('DROP TABLE IF EXISTS ' + scope.settings.MED_TABLE_NAME);
                  tx.executeSql(
                     'CREATE TABLE IF NOT EXISTS ' + scope.settings.MED_TABLE_NAME + ' (' +
                        'id INT IDENTITY(1,1) PRIMARY KEY, ' +
                        'prescribed BOOL, ' +
                        'description VARCHAR(1000), ' +
                        'trade_name VARCHAR(100), ' +
                        'note VARCHAR(4000), ' +
                        // 'icon ENUM("tablet_1", "tablet_2", "tablet_3", "liquid", "powder", "injection"), ' +
                        'dosis_amount INT, ' +
                        // 'dosis_unit ENUM("ml", "cl", "dl", "mg", "g"), ' +
                        'when_to_use VARCHAR(1000), ' +
                        'when_not_to_use VARCHAR(1000), ' +
                        'how_to_use VARCHAR(1000), ' +
                        'Icon_id INT REFERENCES ' + scope.settings.ICON_TABLE_NAME + '(id),' +
                        'Unit_id INT REFERENCES ' + scope.settings.UNIT_TABLE_NAME + '(id),' +
                        'Active_Ingredient_id INT REFERENCES ' + scope.settings.ACTIVE_INGREDIENT_TABLE_NAME + '(id)' +
                     ')'
                  );

                  //console.log(scope.default_values.meds);
                  var med; 
                  var query_pre_fix = 'INSERT INTO ' + scope.settings.MED_TABLE_NAME + ' (id, prescribed, description, trade_name, note, dosis_amount, when_to_use, when_not_to_use, how_to_use, Icon_id, Unit_id, Active_Ingredient_id) VALUES ';
                  for (med_i in scope.default_values.meds) {
                     med = scope.default_values.meds[med_i];
                     tx.executeSql(query_pre_fix + '('+ med.id +', "' + med.prescribed + '", "' + med.description + '", "' + med.trade_name + '", "' + med.note + '", ' + med.dosis_amount + ', "' + med.when_to_use + '", "' + med.when_not_to_use + '", "' + med.how_to_use + '", ' + med.Icon_id + ', ' + med.Unit_id + ', "' + med.active_ingredient + '")');
                  }

                  
               }, 
               this.query_failed, 
               function() {
                  console.log("med table created");
               }
            );
         },

         setup_enum_table: function(tx, table_name, value_column_name, value_column_type, values) {
            tx.executeSql('DROP TABLE IF EXISTS ' + table_name);
            tx.executeSql(
               'CREATE TABLE IF NOT EXISTS ' + table_name + ' (' +
                  'id INT IDENTITY(1,1) PRIMARY KEY, ' +
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

                  // how to auto increment the id?
                  tx.executeSql('CREATE TABLE IF NOT EXISTS ' + table_name + ' (id INT IDENTITY(1,1) PRIMARY KEY, key VARCHAR(50), value VARCHAR(50), type VARCHAR(4))');
                  
                  var query_pre_fix = 'INSERT INTO ' + table_name + ' (key, value, type) VALUES ';
                  for (var key in scope.default_values.settings) {
                     tx.executeSql(query_pre_fix + '("' + key + '", "' + scope.default_values.settings[key].value + '", "' + scope.default_values.settings[key].type + '")');
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

            scope.initialized = true;
            scope.event_aggregater.$broadcast(scope.events.STORAGE_INITIALIZED, "got initialized");
         }
      }
   })
;