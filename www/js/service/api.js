angular.module('project.service.api', [])
   .service('API', function() {
      return {
         initialized:false,
         fake_data: {
            auto_complete_list: ["Nurofee", "Miconazolnitraat", "Paracetamol Trekpleister", "Hydrochloorthiazide", "Ibuprofen 200mg", "Ibuprofen 400mg", "Oxazepam", "Citrosan", "Indurfamo", "Ibasoloina", "Ibufanol"]
         },
         events: {
            DEVICE_ERROR_NO_CONNECTION: "DEVICE_ERROR_NO_CONNECTION",
            AUTO_COMPLETE_LIST_RETRIEVED: "AUTO_COMPLETE_LIST_RETRIEVED",
            API_CALL_FAILED: "API_CALL_FAILED"
         },
         config: {
            url: {
               base: "http://",
               get_auto_complete_list: "get_list"
            }
         },

         /**
            PUBLIC FUNCTIONS
         */
         init: function() {
            // setup device connection API so we can see or the device has internet
            this.initialized = true;
         },

         get_auto_complete_list : function(caller_scope) {
            this.call(
               this.config.url.base + this.config.url.get_auto_complete_list, 
               this.events.AUTO_COMPLETE_LIST_RETRIEVED,
               this.events.API_CALL_FAILED,
               caller_scope,
               this.fake_data.auto_complete_list
            );
         },

         /**
            PRIVATE FUNCTIONS
         */
         call: function(url, success_event, error_event, caller_scope, fake_data) {
            if (fake_data)
               caller_scope.$emit(success_event, fake_data);

            if (!this.device_connection())
               caller_scope.$emit(this.events.DEVICE_ERROR_NO_CONNECTION, "The device does not have a connection to the world wide interwebs");
            

            // call

            // listen respone

            // succes
            // caller_scope.$emit(success_event, result_data);
            // fail
         },

         device_connection: function() {
            return true;
         }
      }
   })
;