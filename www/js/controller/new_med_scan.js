angular.module('project.controller.new_med_scan', ['project.service.api', 'project.service.phonestorage'])
   .controller('NewMedScanCtrl', ['$scope', '$ionicPopup', 'API', 'Phonestorage', function($scope, $ionicPopup, API, Phonestorage) {
      
      // fake data that could be extracted from a scan
      $scope.current_scan = {
         code: 12345678902
      }

      $scope.choose_result = function(med_name) {
         var med_prescribed = window.localStorage.getItem("new_med_prescribed") == 'true'; // retrieve and typecast to boolean
         var safe_med_listener = $scope.$on(API.events.SAFE_MED_RETRIEVED, function(e, medicin) {
            safe_med_listener();
            
            $scope.add_med_to_storage(medicin);
         });

         var med_interaction_listener = $scope.$on(API.events.MED_INTERACTION, function(e, result) {
            med_interaction_listener();

            $scope.int_desc = result.med_interactions[0].description;
            $scope.med_a = result.med_interactions[0].primary_med_name;
            $scope.med_b = result.med_interactions[0].secondary_med_name;
            $ionicPopup.show({
                templateUrl: 'view/dialog/med_interaction.html',
                title: "Medicijn Interactie",
                subTitle: result.med_interactions[0].status,
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
                  if (res === 'ignored')
                     $scope.add_med_to_storage(result.med);
                });
            }
         );
         
         API.get_med_by(API.config.get_med_by.code, $scope.current_scan.code, med_prescribed, $scope);
      }

      $scope.add_med_to_storage = function(medicin) {
         var med_added_listener = $scope.$on(Phonestorage.events.MED_ADDED, function(e, result) {
            med_added_listener();
            window.location = "#/medicijn-detail/" + result.insertId;
         });
         
         Phonestorage.add_medicin(medicin, $scope);
      }
   }])
;