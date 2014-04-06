/**
   This service provides the medicins that the current user uses

   Data will be fetched from local storage
*/
angular.module('project.service.user.medicins', [])
   .factory('Medicins', function() {
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