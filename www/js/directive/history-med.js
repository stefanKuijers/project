angular.module('project.directive.history_med', [])
   .directive("pjHistoryMed", ['$ionicPopup', function($ionicPopup) {
      return {
         link: function($scope, $elem, $attrs) {
            console.log("med history directive", $scope);

            $scope.popup = function () {
               var myPopup = $ionicPopup.show({
                  templateUrl: 'view/dialog/med_history_detail.html',
                  title: "<div class='dark-blue-title'>" + $scope.med.date + "</div>",
                  scope: $scope,
                  buttons: [
                    { text: 'Sluit Venster' }
                  ]
               });
            }
         } 
      }
   }])
;