/**
   This service provides the settings that the current user uses

   Data will be fetched from local storage
*/
angular.module('project.service.user.settings', [])
   .factory('Settings', function() {

     return [
       { id: 0, name: 'setting 1', value: 'value 1' },
       { id: 1, name: 'setting 2', value: 'value 2' },
       { id: 2, name: 'setting 3', value: 'value 3' },
       { id: 3, name: 'setting 4', value: 'value 4' }
     ];
   })
;