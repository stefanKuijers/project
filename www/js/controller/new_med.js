angular.module('project.controller.new_med', ['project.directive.radio'])
   .controller('NewMedCtrl', function($scope) {
      $scope.question_answered = false;
      $scope.answer = null;

      $scope.set_answer = function(value) {
         if ($scope.answer === null) $scope.question_answered = true;

         $scope.answer = value;

         // funky stuff should probable move to MV*-PerfectPlace
         window.localStorage.setItem("new_med_prescribed", value);
      }
   })
;