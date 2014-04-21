angular.module('project.directive.search', [])
   .directive("pjSearch", [function() {
      return {
         link: function(scope, elem, attrs) {
            var list_index = 0, 
                list_length = scope.auto_list.length;

            scope.search_string = "";
            scope.search_results = [];

            scope.$watch(
               'search_string', 
               function() { 
                  scope.search_results = [];
                  if (scope.search_string === "") return;
                  for (list_index = 0; list_index < list_length; list_index++) {
                     if (scope.auto_list[list_index].toLowerCase().match(scope.search_string.toLowerCase())) 
                        scope.search_results.push(scope.auto_list[list_index])
                  }
               }
            );

            scope.$watch(
               'auto_list', 
               function() { 
                  list_length = scope.auto_list.length;
               }
            );

            scope.select_result = function(result) {
               scope.choose_result(result);
            }
         } 
      }
   }])
;