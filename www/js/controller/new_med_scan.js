angular.module('project.controller.new_med_scan', ['project.service.api', 'project.service.phonestorage'])
   .controller('NewMedScanCtrl', ['$scope', '$ionicPopup', 'API', 'Phonestorage', function($scope, $ionicPopup, API, Phonestorage) {
 
      function scan_failure(error) {
         // alert("Failed: " + error);
         window.location = "#/nieuw";
      }

      function scan() {
         if (typeof cordova !== 'undefined')
            cordova.exec(scan_success, scan_failure, "ScanditSDK", "scan",[
               "0YrawIQwEeOWJH/OZoV+Yf93mpkacyj9h9j8BVZHykk",
               {
                  "beep": true,
                  "1DScanning" : true,
                  "2DScanning" : true
               }
               ]
            );
         else
            alert("The camera of this device is not available");
      }

      scan_success = function(scan_result) {
         var med_prescribed = window.localStorage.getItem("new_med_prescribed") == 'true'; // retrieve and typecast to boolean
         var safe_med_listener = $scope.$on(API.events.SAFE_MED_RETRIEVED, function(e, medicin) {
            safe_med_listener();
            medicin.prescribed = med_prescribed;
            
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
         
         API.get_med_by(API.config.get_med_by.code, scan_result[0], med_prescribed, $scope);
      }

      $scope.add_med_to_storage = function(medicin) {
         var med_added_listener = $scope.$on(Phonestorage.events.MED_ADDED, function(e, result) {
            med_added_listener();
            window.location = "#/medicijn-detail/" + result.insertId;
         });
         
         Phonestorage.add_medicin(medicin, $scope);
      }

      scan();
   }])
;