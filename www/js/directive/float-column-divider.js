angular.module('project.directive.column_divider', [])
   .directive("pjFloatColumnDivider", [function() {

      return {
         link: function($scope, $elem, $attrs) {
            var parent_level = typeof $attrs.parentLevel == 'string' ? $attrs.parentLevel : 1;
            var container    = $elem;

            while (parent_level-- > 0)
               container = container.parent();

            setInterval( function () {
               if ($elem.innerHeight() < container.innerHeight()){
                  $elem.css('height', container.innerHeight() -1);
               }
            }, 500);
         } 
      }
   }])
;