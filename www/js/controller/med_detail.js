angular.module('project.controller.med_info', ['project.service.phonestorage'])
   .controller('MedInfoCtrl', function($scope, $stateParams, $filter, Phonestorage) {
      if (Phonestorage.initialized) 
         get_med();
      else
         $scope.$on(Phonestorage.events.STORAGE_READY, get_med);

      function get_med() {
         Phonestorage.get_medicin_and_times($scope, $stateParams.id);

         $scope.$on(Phonestorage.events.MED_RETRIEVED, function(e, result) {
            $scope.med = result.rows.item(0);
            for (var i = 0; i < result.rows.length; i++)
               console.log(result.rows.item(i));

            $scope.$apply();
         });

         $scope.$on(Phonestorage.events.MED_TIMES_RETRIEVED, function(e, result) {
            $scope.times = [];

            for (var i = 0; i < result.rows.length; i++) {
               $scope.times[i] = result.rows.item(i);
               $scope.times[i].editable = false;
            }

            $scope.order_times();
            $scope.$apply();
         });
      }

      $scope.order_times = function() {
         $scope.times = $filter('orderBy')($scope.times, 'time', false);
      }

   }).directive("doseItem", function() {
      return {
         adding_dose: false,
         link: function(scope, elem, attrs) {
            scope.dose_click = function(id) {
               console.log("dose clicked", attrs.id);
            };

            scope.new_dose_click = function() {
               console.log("new dose");
               console.log(elem);
               var old = elem.clone();
               
               scope.times.push({
                  id:-1,
                  amount:1,
                  time: "08:00",
                  editable: true
               });
               scope.order_times()
               // elem.addClass('hide');
            }

         } 
      }
   })
;