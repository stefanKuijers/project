angular.module(
   'project.router', 
   [
      'project.controller.settings',
      'project.controller.nav_control',
      'project.controller.overview',
      'project.controller.med_info',
      'project.controller.new_med',
      'project.controller.new_med_type',
      'project.controller.new_med_scan',
      'project.controller.history'
   ]
).config(
   ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
   
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
            controller:              'NewMedScanCtrl' ,
            templateUrl:             'view/new-med-scan.html'
         })
         .state('nieuw-typ', {
            url:                     '/nieuw/type',
            controller:              'NewMedTypeCtrl',
            templateUrl:             'view/new-med-type.html'
         })
         .state('nieuw-detail', {
            url:                     '/nieuw/medicijn/:name',
            templateUrl:             'view/medicijn-detail.html'
         })
         .state('geschiedenis', {
            url:                     '/geschiedenis',
            controller:              'HistoryCtrl',
            templateUrl:             'view/history.html'
         })
      ;
      $urlRouterProvider.otherwise('/');
   }])
;