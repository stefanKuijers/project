angular.module('project.directive.scoll_controll', [])
   .directive("pjScrollControll", ['$ionicScrollDelegate',function($ionicScrollDelegate) {
      var attrs = {
         direction: 'dir'
      }
      var directions = {
         up: 'up',
         down: 'down'
      };

      return {
         link: function($scope, $elem, $attrs) {
            var parent_level = $attrs.parentLevel;
            var container = $elem;
            var scroll_controll_html = '<div class="scroll-controll"><div class="handle"></div></div>';
            var scroll_up_el, scroll_down_el, offset;


            while (parent_level-- > 0)
               container = container.parent();


            setTimeout( function() {
               if ($elem[0].scrollHeight > container.innerHeight()){
                  $scope.build_scroll_controll();
               }
               
            }, 500);

            setInterval(function() {
               console.log($elem.parent().css('-webkit-transform'));
            }, 1000);

            jQuery(window).on('resize', function() {
               set_offset();
            });

            $scope.build_scroll_controll = function() {
               scroll_up_el = jQuery(scroll_controll_html).addClass('scroll-up').attr(attrs.direction, directions.up).hide();
               scroll_down_el = jQuery(scroll_controll_html).addClass('scroll-down').attr(attrs.direction, directions.down).hide();
               set_offset();
               

               container.append(scroll_up_el).append(scroll_down_el);
               add_listeners(scroll_up_el), add_listeners(scroll_down_el);

               validate_scroll_controll();

               scroll_up_el.fadeIn();
               scroll_down_el.fadeIn();
            }

            function add_listeners(el) {
               el.on('mousedown', function(e, ee) {
                  var current_transform = $elem.parent().css('-webkit-transform');
                  var split = current_transform.replace(')', '').split(',');
                  var y_value = $elem.parent().css('-webkit-transform').replace(')', '').split(',').pop();

                  // update scroll position
                  switch(jQuery(this).attr(attrs.direction)) {
                     case directions.up:
                        $ionicScrollDelegate.scrollTo(0, 0,true);
                     break;

                     case directions.down:
                        $ionicScrollDelegate.scrollTo(0, $elem[0].scrollHeight,true);
                     break;

                     default: break;
                  }

                  // check or both scroll controllers are still needed
                  validate_scroll_controll();
               });
            }

            function validate_scroll_controll() {
               console.log($ionicScrollDelegate);
               console.log($ionicScrollDelegate.getScrollPosition());
               console.log($ionicScrollDelegate.getScrollView());
            }

            function set_offset() {
               offset = get_offset();

               scroll_up_el
                  .css('left', offset.left)
                  .css('right', offset.right)
                  .css('top', offset.top)
               ;

               scroll_down_el
                  .css('left', offset.left)
                  .css('right', offset.right)
                  .css('bottom', offset.bottom)
               ;
            }

            function get_offset() {
               var temp_offset = $elem.offset();
               return {
                  top:    temp_offset.top    ? temp_offset.top    : 0,
                  left:   temp_offset.left   ? temp_offset.left   : 0,
                  bottom: temp_offset.bottom ? temp_offset.bottom : 0,
                  right:  temp_offset.right  ? temp_offset.right  : 0,
               }
            }
         } 
      }
   }])
;