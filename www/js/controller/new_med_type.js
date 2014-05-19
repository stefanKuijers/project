angular.module('project.controller.new_med_type', ['project.service.api', 'project.service.phonestorage', 'project.directive.search'])
   .controller('NewMedTypeCtrl', ['$scope', '$ionicPopup', 'API', 'Phonestorage', function($scope, $ionicPopup, API, Phonestorage) {
      var interaction_index = 0;

      $scope.$on(API.events.AUTO_COMPLETE_LIST_RETRIEVED, function(e, result) {
         $scope.auto_list = result;
      });
      API.get_auto_complete_list($scope);

      $scope.choose_result = function(med_name) {
         var med_prescribed = window.localStorage.getItem("new_med_prescribed") == 'true'; // retrieve and typecast to boolean
         var safe_med_listener = $scope.$on(API.events.SAFE_MED_RETRIEVED, function(e, medicin) {
            safe_med_listener(), med_interaction_listener();
            medicin.prescribed = med_prescribed;
            
            $scope.add_med_to_storage(medicin);
         });

         var med_interaction_listener = $scope.$on(API.events.MED_INTERACTION, function(e, result) {
            med_interaction_listener(), safe_med_listener();
            $scope.interactions = result.med_interactions;
            $scope.med = result.med;

            $scope.show_interaction_popup();
         });
         
         API.get_med_by(API.config.get_med_by.name, med_name, med_prescribed, $scope);
      }

      $scope.add_med_to_storage = function(medicin) {
         var med_added_listener = $scope.$on(Phonestorage.events.MED_ADDED, function(e, result) {
            med_added_listener();
            window.location = "#/medicijn-detail/" + result.insertId;
         });
         
         Phonestorage.add_medicin(medicin, $scope);
      }

      $scope.show_interaction_popup = function() {
         if ($scope.interactions[interaction_index].status === 'Ongevaarlijk') { // don't show a popup for interactions that are not dangarous
            interaction_index++;

            if (interaction_index === ($scope.interactions.length) ) {// if this was the last: add the med to the list 
               $scope.add_med_to_storage($scope.med);
               return;
            }
         }

         $scope.int_desc = $scope.interactions[interaction_index].description;
         $scope.med_a = $scope.interactions[interaction_index].primary_med_name;
         $scope.med_b = $scope.interactions[interaction_index].secondary_med_name;

         $ionicPopup.show({
            templateUrl: 'view/dialog/med_interaction.html',
            title: "Medicijn Interactie",
            subTitle: $scope.interactions[interaction_index].status,
            scope: $scope,
            buttons: [
              { 
                 text: 'Neem niet in', 
                 type: 'button-positive',
                 onTap: function(e) { return 'cancelled'; } 
              },
              {
                text: '<b>Negeer Waarschuwing</b>',
                onTap: function(e) { return 'ignored'; }
              },
            ]
         }).then(function(res) {
            interaction_index++;

            if (res === 'ignored' && interaction_index === $scope.interactions.length ) // last warning ignored so add the med
               $scope.add_med_to_storage($scope.med);   
            else if (res === 'ignored' && interaction_index < $scope.interactions.length ) // warning ignored but there are more warnings
               $scope.show_interaction_popup();
            else // warning heeded. The user cancelled taking the medicin. Navigate home.
               window.location.hash = "";
         });
      }
   }])
;