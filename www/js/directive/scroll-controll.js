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
            var scroll_controll_html = '<div class="scroll-controll"><i class="handle"></i></div>';
            var scroll_up_el, scroll_down_el, offset, current_pos;
            var scroll_up_el_visible = scroll_down_el_visible = false;

            while (parent_level-- > 0)
               container = container.parent();

            setTimeout( function() {
               if ($elem[0].scrollHeight > container.innerHeight()){
                  $scope.build_scroll_controll();
               }
            }, 500);

            // on scroll detect or both controllers are still needed
            $ionicScrollDelegate.getScrollView().onScroll = function() {
               // their function put back in to scope
               if(!ionic.scroll.isScrolling) {
                 setTimeout($ionicScrollDelegate.getScrollView().setScrollStart, 50);
               } else {
                 clearTimeout($ionicScrollDelegate.getScrollView().scrollTimer);
                 $ionicScrollDelegate.getScrollView().scrollTimer = setTimeout($ionicScrollDelegate.getScrollView().setScrollStop, 80);
               }

               // validate_scroll_controll();
            };

            // jQuery(window).on('resize', function() {
            //    set_offset();
            // });

            $scope.build_scroll_controll = function() {
               scroll_up_el = jQuery(scroll_controll_html).addClass('scroll-up').attr(attrs.direction, directions.up).hide();
               scroll_up_el.find('.handle').addClass('icon ion-chevron-up');
               scroll_down_el = jQuery(scroll_controll_html).addClass('scroll-down').attr(attrs.direction, directions.down).hide();
               scroll_down_el.find('.handle').addClass('icon ion-chevron-down');
               set_offset();

               container.append(scroll_up_el).append(scroll_down_el);
               add_listeners(scroll_up_el), add_listeners(scroll_down_el);

               // validate_scroll_controll();
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
                  //validate_scroll_controll();
               });
            }

            function validate_scroll_controll() {
               current_offset_top = $ionicScrollDelegate.getScrollPosition().top;

               console.log(current_offset_top, $elem[0].scrollHeight - container.innerHeight());

               if (scroll_up_el_visible && current_offset_top == 0)
                  scroll_up_el.fadeOut(),
                  scroll_up_el_visible = false;
               else if (!scroll_up_el_visible && current_offset_top > 0)
                  scroll_up_el.fadeIn(),
                  scroll_up_el_visible = true;

               if (scroll_down_el_visible && current_offset_top >= ($elem[0].scrollHeight - container.innerHeight()) - 1)
                  scroll_down_el.fadeOut(),
                  scroll_down_el_visible = false;
               else if (!scroll_down_el_visible && current_offset_top <= $elem[0].scrollHeight - container.innerHeight())
                  scroll_down_el.fadeIn(),
                  scroll_down_el_visible = true;

            }

            function set_offset() {
               offset = get_offset();

               // not implementing as the scroll will have to be different
               //    .css('left', offset.left)
               //    .css('right', offset.right)

               scroll_up_el
                  .css('top', offset.top)
               ;

               scroll_down_el
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