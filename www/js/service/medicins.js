angular.module('project.service.medicins', [])
   .factory('Medicins', function() {
     // Might use a resource here that returns a JSON array

     // Some fake testing data
     var meds = [
       { id: 0, name: 'med 1' },
       { id: 1, name: 'med 2' },
       { id: 2, name: 'med 3' },
       { id: 3, name: 'med 4' }
     ];

     return {
       get: function(id) {
         return id !== undefined ? meds[id] : meds;
       }
     }
   })
;