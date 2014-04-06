angular.module(
   'project.router', 
   [
      'project.controller.settings',
      'project.controller.overview',
      'project.controller.med_info'
   ]
).config(function($stateProvider, $urlRouterProvider) {
   
      $stateProvider
         .state('overzicht', {
            url: '/',
            controller: 'OverviewCtrl',
            templateUrl: 'view/overzicht.html'
         })
         .state('med-info', {
            url: '/medicijn-detail/:id',
            controller: 'MedInfoCtrl',
            templateUrl: 'view/medicijn-detail.html'
         })
         .state('nieuw', {
            url: '/nieuw',
            templateUrl: 'view/new-med.html'
         })
         .state('nieuw-scan', {
            url: '/nieuw/scan',
            templateUrl: 'view/new-med-scan.html'
         })
         .state('nieuw-typ', {
            url: '/nieuw/typ',
            templateUrl: 'view/new-med-type.html'
         })
         .state('geschiedenis', {
            url: '/geschiedenis',
            templateUrl: 'view/history.html'
         })
      ;
      $urlRouterProvider.otherwise('/');
   })
;