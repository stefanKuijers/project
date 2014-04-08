/**
   This service provides the medicins that the current user uses

   Data will be fetched from local storage
*/
angular.module('project.service.user.medicins', [])
   .factory('Medicins', function($filter) {
      var meds = [
         { id: 0, dosis: [{time: "08:00", amount: 2}, {time: "12:00", amount: 1}, {time: "18:00", amount: 2}], trade_name: 'Ultacit', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "Hydrotalciet", form: "tablet_1", dose:{amount:200, unit:"mg"}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
         { id: 1, dosis: [{time: "08:00", amount: 1}], trade_name: 'Paracetamol Trekpleister', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: false, active_ingredient: "Paracetamol", form: "tablet_2", dose:{amount:100, unit:"mg"}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
         { id: 2, dosis: [{time: "12:00", amount: 2}], trade_name: 'Pectrofree', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "Dextromethorfan", form: "tablet_1", dose:{amount:250, unit:"mg"}, interaction: {description: "Dit medicijn kent bepaalde wisselwerkingen met andere medicijnen", status: {code:2, name:"Schadelijk"}, combination_med_id: 3}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
         { id: 3, dosis: [{time: "12:00", amount: 1}], trade_name: 'Nurofee', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "Nurofeen", form: "liquid", dose:{amount:200, unit:"ml"}, interaction: {description: "Dit medicijn kent bepaalde wisselwerkingen met andere medicijnen", status: {code:0, name:"Niet Schadelijk"}, combination_med_id: 4}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
         { id: 4, dosis: [{time: "12:00", amount: 1}], trade_name: 'Miconazolnitraat', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "miconazol", form: "tablet_3", dose:{amount:400, unit:"mg"}, interaction: {description: "Dit medicijn kent bepaalde wisselwerkingen met andere medicijnen", status: {code:1, name:"Mogelijke bijwerkingen"}, combination_med_id: 3}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
         { id: 5, dosis: [{time: "16:30", amount: 1}], trade_name: 'Ipraalox', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "paracetamol", form: "liquid", dose:{amount:10, unit:"cl"}, interaction: {description: "Dit medicijn kent bepaalde wisselwerkingen met andere medicijnen", status: {code:2, name:"Schadelijk"}, combination_med_id: 3}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} },
         { id: 6, dosis: [{time: "16:30", amount: 2}], trade_name: 'Davitamon', description: "Dit medicijn word soms gebruikt. Dit vooral in gevallen dat het nodig is hoewel dit niet altijd het geval is.", prescribed: true, active_ingredient: "paracetamol", form: "powder", dose:{amount:20, unit:"gr"}, interaction: {description: "Dit medicijn kent bepaalde wisselwerkingen met andere medicijnen", status: {code:0, name:"Niet Schadelijk"}, combination_med_id: 4}, information: {bijwerkingen: "Dit medicijn heeft de volgende bijwerkingen: - niet goed - slecht - soms echt niet lekker", houdbaarheid: "Dit medicijn blijft lang goed"}, conditions: {care_machine_usage: {title: "machine gebruik", description: "Dit medicijn heeft geen effect op het reactievermogen en kan daarom zonder probleem gebruikt worden in combinatie met het besturen van auto of het gebruik van machines."}, breast_feading: {title: "Borstvoeding", description: "Geen effect op borst voeding"}} }
      ];
      var meds_length = meds.length;
      var double_meds = [];
      var dosis_length;
      var parsed = false;
      var parsed_meds = [];
      var i,ii,parsed_meds_length;

      var Medicine = function(med) {
         return this.parse(med);
      };

      Medicine.prototype.parse = function(med) {
         med.note = "";
         med.primary_dose_index = 0;

         dosis_length = med.dosis.length;
         if (dosis_length > 1) {
            var ii = 1;
            for (ii; ii < dosis_length; ii++) {
               var double_med = angular.copy(med);

               double_med.primary_dose_index = ii;
               double_meds.push(double_med);
            };
         }

         return med;
      }

      return {
         parse: function() {
            if (parsed_meds.length === 0) {
               for (i = 0; i < meds_length; i++) {
                  parsed_meds[i] = new Medicine(meds[i]);
               };

               parsed_meds = meds.concat(double_meds);
               parsed_meds = $filter('orderBy')(parsed_meds, 'trade_name', false);
               parsed_meds = $filter('orderBy')(parsed_meds, 'dosis[primary_dose_index].time', false);

               var prevTime;
               parsed_meds_length = parsed_meds.length;
               for(i = 0; i < parsed_meds_length; i++) {
                  parsed_meds[i].time_header = parsed_meds[i].dosis[parsed_meds[i].primary_dose_index].time !== prevTime;
                  
                  prevTime = parsed_meds[i].dosis[parsed_meds[i].primary_dose_index].time;
               }
            }
         },

         get: function(id) {
            return id !== undefined ? this.get_by_id(id) : parsed_meds;
         },

         get_by_id: function(id) {
            for (i = 0; i < parsed_meds_length; i++) {
               if (parsed_meds[i].id == id)
                  return parsed_meds[i];
            }
         }
      }
      

   })
;