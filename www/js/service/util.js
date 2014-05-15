angular.module('project.service.util', [])
   .service('Util', [function() {
      var index = 0,
          length = 0,
          results = [],
          matched_filters = 0;

      return {
         on_mobile_device: (window.plugin !== undefined),
         msg: "",


         log: function() {
            if (this.on_mobile_device) {
               msg = "";
               for (var i = 0; i < arguments.length; i++)
                  msg += arguments[i] + " ";

               alert(msg + "     " + new Error().stack.split("\n")[2]);
            } else {
               for (var i = 0; i < arguments.length; i++)
                  console.log(arguments[i]);

               console.log(new Error().stack.split("\n")[2]); // get caller stack info
            }
         },

         hashString: function(s) { 
            return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0); 
         },

         search_object_array_by: function(array, options) {
            length = array.length;
            results = [];
            required_filters = Object.keys(options.filters).length;
            
            for (index = 0; index < length; index++) {
               matched_filters = 0;

               for (filter in options.filters) {
                  // console.log("filter", filter, options.filters[filter], array[index][filter], matched_filters);
                  if (options.strict) {
                     if (array[index][filter] === options.filters[filter]) {
                        if (++matched_filters >= required_filters) {
                           if (options.find_one) 
                              return array[index];
                           else 
                              results.push(array[index]);
                        }
                     }
                  } else {
                     if (array[index][filter] == options.filters[filter]) {
                        if (++matched_filters >= required_filters) {
                           if (options.find_one) 
                              return array[index];
                           else 
                              results.push(array[index]);
                        }
                     }
                  }
               }
            }
            return results.length > 0 ? results : false;       
         }

      }
   }])
;