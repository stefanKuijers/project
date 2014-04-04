angular.module('project.router', [])
   .config(function($stateProvider, $urlRouterProvider) {
   
      $stateProvider
         .state('overzicht', {
            url: '/',
            templateUrl: 'view/overzicht.html'
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