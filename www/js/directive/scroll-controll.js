angular.module('project.directive.scoll_controll', [])
   .directive("pjScrollControll", ['$ionicScrollDelegate',function($ionicScrollDelegate) {
      var attrs = {
         direction: 'dir'
      }
      var directions = {
         up: 'up',
         down: 'down'
      };
      var available_scroll_heigth;

      return {
         link: function($scope, $elem, $attrs) {
            var parent_level         = typeof $attrs.parentLevel == 'string' ? $attrs.parentLevel : 0;
            var container            = $elem;
            var scroll_controll_html = '<div class="scroll-controll"><i class="handle"></i></div>';
            var controll_visible     = false;
            
            $scope.scroll_up_el      = false;
            $scope.scroll_down_el    = false;
            $scope.offset            = false;
            $scope.build             = false;

            while (parent_level-- > 0)
               container = container.parent();

            setTimeout( function() {
               if ($elem[0].scrollHeight > container.innerHeight()){
                  $scope.build_scroll_controll();
               }
            }, 500);

            setInterval( function () {
               if (available_scroll_heigth !== $elem[0].scrollHeight) {
                  if ($elem[0].scrollHeight > container.innerHeight() && !controll_visible){
                     // show  
                     if (!$scope.build) $scope.build_scroll_controll();
                     $scope.scroll_up_el.fadeIn();
                     $scope.scroll_down_el.fadeIn();
                     controll_visible = true; 
                  } else if ($elem[0].scrollHeight <= container.innerHeight() && controll_visible) {
                     // hide
                     $scope.scroll_up_el.fadeOut();
                     $scope.scroll_down_el.fadeOut();
                     controll_visible = false;
                  }
               }

               available_scroll_heigth = $elem[0].scrollHeight;
            }, 1000);

            $scope.build_scroll_controll = function() {
               $scope.scroll_up_el = jQuery(scroll_controll_html).addClass('scroll-up').attr(attrs.direction, directions.up).hide();
               $scope.scroll_up_el.find('.handle').addClass('icon ion-chevron-up');
               $scope.scroll_down_el = jQuery(scroll_controll_html).addClass('scroll-down').attr(attrs.direction, directions.down).hide();
               $scope.scroll_down_el.find('.handle').addClass('icon ion-chevron-down');
               set_offset();

               container.append($scope.scroll_up_el).append($scope.scroll_down_el);
               add_listeners($scope.scroll_up_el), add_listeners($scope.scroll_down_el);

               $scope.scroll_up_el.fadeIn();
               $scope.scroll_down_el.fadeIn();
               controll_visible = true;
               $scope.build = true;
            }

            function add_listeners(el) {
               el.on('mousedown touchstart', function(e, ee) {
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
               });
            }

            function set_offset() {
               $scope.offset = get_offset();

               $scope.scroll_up_el.css('top', $scope.offset.top);
               //$scope.scroll_down_el.css('bottom', $scope.offset.bottom);
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