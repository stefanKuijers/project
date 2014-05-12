angular.module('project.directive.search', [])
   .directive("pjSearch", [function() {
      return {
         link: function($scope, $elem, $attrs) {

            var list_index = 0, 
                list_length = $scope.auto_list.length,
                new_results = [];

            $scope.search_string = "";
            $scope.search_results = [];

            $scope.$watch(
               'search_string', 
               function() { 
                  jQuery($elem.find('.results')[0]).hide();

                  $scope.search_results = new_results = [];
                  if ($scope.search_string === "") {
                     jQuery($elem.find('.results')[0]).fadeIn();
                     return;
                  }

                  for (list_index = 0; list_index < list_length; list_index++) {
                     if ($scope.auto_list[list_index].toLowerCase().match($scope.search_string.toLowerCase())) 
                        new_results.push($scope.auto_list[list_index])
                  }

                  $scope.search_results = new_results;

                  setTimeout(function() {
                     jQuery($elem.find('.results')[0]).fadeIn();
                  }, 200);
               }
            );

            $scope.$watch(
               'auto_list', 
               function() { 
                  list_length = $scope.auto_list.length;
               }
            );

            $scope.select_result = function(result) {
               var el_input = $elem.find('input');
               el_input.blur();
               el_input.parent().parent().trigger('click');

               if (typeof cordova !== 'undefined') {
                  cordova.plugins.SoftKeyboard.hide();
               }
               $scope.choose_result(result);
            }

            function set_focus() {
               var el_input = $elem.find('input');
               el_input.focus();
               el_input.trigger('click');

               if (typeof cordova !== 'undefined') {
                  cordova.plugins.SoftKeyboard.show();
               }
            }
            setTimeout(set_focus, 350);
         } 
      }
   }])
;