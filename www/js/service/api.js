angular.module('project.service.api', ['project.service.phonestorage'])
   .service('API', function(Phonestorage) {
      return {
         initialized:false,
         root_scope: {},
         fake_data: {
            auto_complete_list: ["Nurofee", "Miconazolnitraat", "Paracetamol Trekpleister", "Hydrochloorthiazide", "Ibuprofen 200mg", "Ibuprofen 400mg", "Oxazepam", "Citrosan", "Indurfamo", "Ibasoloina", "Ibufanol"],
            medicin: {
               0: { 
                  id: 5, 
                  description: "Dit medicijn behoort tot de medicijngroep van vochtafdrijvende middelen.",
                  trade_name: "Ibuprofen 400mg",
                  note: "Een notule bij dit medicijn",
                  Icon_id: 4,
                  Unit_id: 3,
                  dosis_amount: 400,
                  when_to_use: "Dit medicijn werkt vochtafdrijvend. Te gebruiken bij: hartfalen, leverziekte, nierziekte, longoedeem, hoge bloeddruk of voorkoming van nierstenen. Dit medicijn zorgt ervoor dat u extra vochtafdrijft.",
                  when_not_to_use: "U word afgeraden dit medicijn te gebruiken wanneer u diabetes of vast gestelde nierproblemen heeft. ",
                  how_to_use: "Bij het ontbijt innemen met water. Blijf gedurende de dag een gewone hoeveelheid drinken.",
                  active_ingredient: 4
               },
               1: { 
                  id: 6, 
                  description: "Dit medicijn behoort tot de medicijngroep van pijnstillende middelen. Dit middel wordt dan ook vaak voorgescheven tegen de pijn.",
                  trade_name: "Oxazepam",
                  note: "Een notule bij dit medicijn",
                  Icon_id: 1,
                  Unit_id: 5,
                  dosis_amount: 10,
                  when_to_use: "Dit medicijn werkt pijnstillend. Te gebruiken bij: hoofdpijn, kiespijn, ongesteldheidspijn.",
                  when_not_to_use: "U word afgeraden dit medicijn te gebruiken wanneer u diabetes of vast gestelde nierproblemen heeft. ",
                  how_to_use: "Bij het ontbijt innemen met water. Blijf gedurende de dag een gewone hoeveelheid drinken.",
                  active_ingredient: 0
               },
               2: { 
                  id: 7, 
                  description: "Dit medicijn behoort tot de medicijngroep van pijnstillende middelen. Dit middel wordt dan ook vaak voorgescheven tegen de pijn.",
                  trade_name: "Citrosan",
                  note: "Een notule bij dit medicijn",
                  Icon_id: 2,
                  Unit_id: 6,
                  dosis_amount: 1,
                  when_to_use: "Dit medicijn werkt vochtafdrijvend. Te gebruiken bij: hartfalen, leverziekte, nierziekte, longoedeem, hoge bloeddruk of voorkoming van nierstenen. Dit medicijn zorgt ervoor dat u extra vochtafdrijft.",
                  when_not_to_use: "U word afgeraden dit medicijn te gebruiken wanneer u diabetes of vast gestelde nierproblemen heeft. ",
                  how_to_use: "Bij het ontbijt innemen met water. Blijf gedurende de dag een gewone hoeveelheid drinken.",
                  active_ingredient: 3
               },
               3: { 
                  id: 8, 
                  description: "Dit medicijn behoort tot de medicijngroep van vochtafdrijvende middelen.",
                  trade_name: "Ibuprofen 200mg",
                  note: "Een notule bij dit medicijn",
                  Icon_id: 4,
                  Unit_id: 3,
                  dosis_amount: 200,
                  when_to_use: "Dit medicijn werkt vochtafdrijvend. Te gebruiken bij: hartfalen, leverziekte, nierziekte, longoedeem, hoge bloeddruk of voorkoming van nierstenen. Dit medicijn zorgt ervoor dat u extra vochtafdrijft.",
                  when_not_to_use: "U word afgeraden dit medicijn te gebruiken wanneer u diabetes of vast gestelde nierproblemen heeft. ",
                  how_to_use: "Bij het ontbijt innemen met water. Blijf gedurende de dag een gewone hoeveelheid drinken.",
                  active_ingredient: 4
               },
            },
            interaction_list: [
               {status: "Gevaarlijk", primary_med_name: "Ibuprofen 400mg", secondary_med_name: "Oxazepam", description: "Deze twee medicinen gaan niet samen"},
               {status: "Ongevaarlijk", primary_med_name: "Ibuprofen 200mg", secondary_med_name: "Citrosan", description: "De combinatie van deze twee medicijnen verminderd de werking van Citrosan"},
               {status: "Gevaarlijk", primary_med_name: "Ibuprofen 200mg", secondary_med_name: "Oxazepam", description: "Deze twee medicinen gaan niet samen"}
            ]
         },
         events: {
            DEVICE_ERROR_NO_CONNECTION:   "DEVICE_ERROR_NO_CONNECTION",
            CONNECTION_LOST:              "CONNECTION_LOST",
            AUTO_COMPLETE_LIST_RETRIEVED: "AUTO_COMPLETE_LIST_RETRIEVED",
            UNCHECKED_MED_RETRIEVED:      "UNCHECKED_MED_RETRIEVED",
            SAFE_MED_RETRIEVED:           "SAFE_MED_RETRIEVED",
            MED_INTERACTION:              "MED_INTERACTION",
            API_CALL_FAILED:              "API_CALL_FAILED",
            INTERACTION_LIST_RETRIEVED:   "INTERACTION_LIST_RETRIEVED"
         },
         errors: {
            BAD_PARAMETER: "Verkeerde parameter aan de url meegegeven",
            BAD_FUNCTION:  "Onbekende functie aan de url meegegeven"
         },
         config: {
            url: {
               base:                   "http://",
               get_auto_complete_list: "get_list",
               get_med_by_name:        "get_med/name/",
               get_med_by_code:        "get_med/code/"
            }
         },

         /**
            PUBLIC FUNCTIONS
         */
         init: function(root_scope) {
            // setup device connection API so we can see or the device has internet
            this.initialized = true;
            this.root_scope = root_scope;

         },

         get_auto_complete_list : function(caller_scope) {
            this.call(
               this.config.url.base + this.config.url.get_auto_complete_list, 
               this.events.AUTO_COMPLETE_LIST_RETRIEVED,
               this.events.API_CALL_FAILED,
               caller_scope,
               this.fake_data.auto_complete_list
            );
         },

         get_medicin_by_name: function(med_name, prescribed, caller_scope) {
            console.log("get med", med_name, prescribed, caller_scope);

            if (!prescribed) {
               var scope = this;
               this.root_scope.$on(
                  this.events.UNCHECKED_MED_RETRIEVED, 
                  function(e, result) {
                     var medicin = result;
                     
                     caller_scope.$on(
                        scope.events.INTERACTION_LIST_RETRIEVED,
                        function (e, result) {
                           var interaction_list = result;
                           
                           caller_scope.$on(
                              Phonestorage.events.MED_NAMES_RETRIEVED, 
                              function(e, result) {
                                 var meds_in_use = [];
                                 for (var i = 0; i < result.rows.length; i++){
                                    meds_in_use[i] = result.rows.item(i).trade_name;
                                 }

                                 scope.check_for_interaction(meds_in_use, interaction_list, medicin, caller_scope);
                              }
                           );
                           Phonestorage.get_med_names(caller_scope);
                        }
                     );
                     scope.get_interaction_list(med_name, caller_scope);
                     
                  }
               );
            }

            // select right med from fake data  
            var result_med;
            for (med in this.fake_data.medicin)
               if (this.fake_data.medicin[med].trade_name === med_name)
                  result_med =  this.fake_data.medicin[med];
         
            this.call(
               this.config.url.base + this.config.url.get_med_by_name + encodeURIComponent(med_name), 
               prescribed ? this.events.SAFE_MED_RETRIEVED : this.events.UNCHECKED_MED_RETRIEVED,
               this.events.API_CALL_FAILED,
               prescribed ? caller_scope : this.root_scope,
               result_med
            );
         },

         get_interaction_list: function(med_name, caller_scope) {
            caller_scope.$emit(this.events.INTERACTION_LIST_RETRIEVED, this.fake_data.interaction_list);

            // following will happen in the API server side
            // var scope = this;
            // this.connection.transaction(
            //    function(tx) {
            //       scope.query(
            //          "SELECT " +
            //             "Interaction.description, " +
            //             "Interaction_Status.status, " +
            //             "primary_med.trade_name AS primary_med_name, " +
            //             "secondary_med.trade_name AS secondary_med_name " +
            //          "FROM Interaction " +
            //             "JOIN Interaction_Status " +
            //                "ON Interaction.Interaction_Status_id = Interaction_status.id " +
            //             "JOIN Medicin primary_med " +
            //                "ON Interaction.Primary_med_id = primary_med.id " +
            //             "JOIN Medicin secondary_med " +
            //                "ON Interaction.Secondary_med_id = secondary_med.id " +
            //          "WHERE " +
            //             "primary_med_name = '" + med_name + "' OR " +
            //             "secondary_med_name = '" + med_name + "' " +
            //          ";",
            //          tx, 
            //          scope.events.INTERACTION_LIST_RETRIEVED, 
            //          caller_scope
            //       );
            //    }
            // );
         },

         check_for_interaction: function(meds_in_use, interaction_list, medicin, caller_scope) {
            console.log("cheking for interactions", interaction_list, meds_in_use);
            var interactions = [];
            for (var i = 0; i < interaction_list.length; i++) {
               for (var ii = 0; ii < meds_in_use.length; ii++) {
                  console.log(interaction_list[i].primary_med_name, interaction_list[i].secondary_med_name, meds_in_use[ii]);
                  if (
                     interaction_list[i].primary_med_name === meds_in_use[ii] ||
                     interaction_list[i].secondary_med_name === meds_in_use[ii]
                  ) {
                     interactions.push(interaction_list[i]);
                  }
               }
            }

            if (interactions.length > 0)
               caller_scope.$emit(this.events.MED_INTERACTION, {med: medicin, med_interactions: interactions});
            else
               caller_scope.$emit(this.events.SAFE_MED_RETRIEVED, medicin);
         },

         /**
            PRIVATE FUNCTIONS
         */
         call: function(url, success_event, error_event, event_scope, fake_data) {
            // console.log("API.call", url, success_event, event_scope, fake_data);
            if (fake_data)
               event_scope.$emit(success_event, fake_data);

            if (!this.device_connection())
               event_scope.$emit(this.events.DEVICE_ERROR_NO_CONNECTION, "The device does not have a connection to the world wide interwebs");
            

            // call

            // listen respone

            // succes
            // event_scope.$emit(success_event, result_data);
            // fail
         },

         device_connection: function() {
            return true;
         }
      }
   })
;