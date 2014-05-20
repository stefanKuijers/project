angular.module('project.controller.overview', ['project.service.phonestorage', 'project.service.api', 'project.service.util', 'project.directive.scoll_controll'])
   .controller('OverviewCtrl', ['$scope', '$filter', 'Phonestorage', 'API', 'Util', function($scope, $filter, Phonestorage, API, Util) {
      var interaction_listeners = [];

      if (Phonestorage.initialized) 
         get_meds();
      else
         $scope.$on(Phonestorage.events.STORAGE_READY, get_meds);

      function get_meds() {
         var self = $scope;
         $scope.med_overview = [];
         var get_overview_listener = $scope.$on(Phonestorage.events.MED_OVERVIEW_RETRIEVED, function(e, result) {
            get_overview_listener();

            if (!$scope.interaction_listener) { // make sure 
               $scope.interaction_listener = $scope.$on(API.events.MED_INTERACTION, function(e, result) {
                  setTimeout( function() {if ($scope.interaction_listener) $scope.interaction_listener(); $scope.interaction_listener = false}, 1000);
                  var meds = Util.search_object_array_by($scope.med_overview, {find_one: false, filters: {id: result.med.id}});
                  console.log(meds);
                  for (med in meds) {
                     $scope.med_overview[$scope.med_overview.indexOf(meds[med])].interactions = result.med_interactions;
                     $scope.$apply();
                  }
               });
            }

            for (var i = 0; i < result.rows.length; i++) {
               $scope.med_overview[i] = angular.copy(result.rows.item(i));
               API.get_med_interactions($scope.med_overview[i], $scope);
            }

            $scope.med_overview = $filter('orderBy')($scope.med_overview, 'trade_name', false);
            $scope.med_overview = $filter('orderBy')($scope.med_overview, 'time', false);

            var prevTime;
            for (i = 0; i < result.rows.length; i++){
               $scope.med_overview[i].time_header = $scope.med_overview[i].time !== prevTime;
               prevTime = $scope.med_overview[i].time;
            }

            $scope.$apply();
         });
         Phonestorage.get_med_overview($scope);
      }   
   }])
;