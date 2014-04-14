angular.module('project.controller.new_med', ['project.directive.radio', 'project.directive.dose_item'])
   .controller('NewMedCtrl', function($scope) {
      console.log("new med controller");
      $scope.question_answered = false;
      $scope.answer = null;

      $scope.set_answer = function(value) {
         if ($scope.answer === null) $scope.question_answered = true;

         $scope.answer = value;

         // funky stuff should probable move to MV*-PerfectPlace
         Window.localStorage.setItem("new_med_prescribed", value);
      }
   })
;