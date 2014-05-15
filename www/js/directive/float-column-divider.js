angular.module('project.directive.column_divider', [])
   .directive("pjFloatColumnDivider", [
      function() {

         return {
            link: function($scope, $elem, $attrs) {
               var parent_level = typeof $attrs.parentLevel == 'string' ? $attrs.parentLevel : 1;
               var container = $elem;
               var interval = false;

               while (parent_level-- > 0)
                  container = container.parent();

               function set_interval(break_interval) {
                  if (break_interval && interval) 
                     clearInterval(interval), interval = false;

                  else
                     interval = setInterval(function() {
                        if ($elem.innerHeight() > 1000) clearInterval(interval), interval = false;
                        if ($elem.innerHeight() < container.innerHeight()) {
                           $elem.css('height', container.innerHeight() - 1);
                        }
                     }, 500);
               }

               function update_height() {
                  switch (window.orientation) {
                     case -90:
                     case 90:
                        set_interval();
                        break;
                     default:
                        set_interval(true);
                        break;
                  }
               }

               window.addEventListener('orientationchange', update_height);
               update_height();
            }
         }
   }]);