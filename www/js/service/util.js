angular.module('project.service.util', [])
   .service('Util', [function() {
      
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
         }
            

      }
   }])
;