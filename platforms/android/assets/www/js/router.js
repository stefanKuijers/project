angular.module(
   'project.router', 
   [
      'project.controller.settings',
      'project.controller.nav_control',
      'project.controller.overview',
      'project.controller.med_info',
      'project.controller.new_med'
   ]
).config(function($stateProvider, $urlRouterProvider) {
   
      $stateProvider
         .state('overzicht', {
            url:                     '/',
            controller:              'OverviewCtrl',
            templateUrl:             'view/overzicht.html'
         })
         .state('med-info', {
            url:                     '/medicijn-detail/:id',
            controller:              'MedInfoCtrl',
            templateUrl:             'view/medicijn-detail.html'
         })
         .state('nieuw', {
            url:                     '/nieuw',
            controller:              'NewMedCtrl',
            templateUrl:             'view/new-med.html'
         })
         .state('nieuw-scan', {
            url:                     '/nieuw/scan',
            templateUrl:             'view/new-med-scan.html'
         })
         .state('nieuw-typ', {
            url:                     '/nieuw/type',
            templateUrl:             'view/new-med-type.html'
         })
         .state('geschiedenis', {
            url:                     '/geschiedenis',
            templateUrl:             'view/history.html'
         })
      ;
      $urlRouterProvider.otherwise('/');
   })
;