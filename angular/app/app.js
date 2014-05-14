(function(){

  'use strict';

  angular
    .module('issuesApp', [
      'ngRoute'
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'app/partials/home.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

// angular
//   .module('issuesApp', [
//     'ngCookies',
//     'ngResource',
//     'ngSanitize',
//     'ngRoute'
//   ])
//   .config(function ($routeProvider) {
//     $routeProvider
//       .when('/', {
//         templateUrl: 'views/main.html',
//         controller: 'MainCtrl'
//       })
//       .otherwise({
//         redirectTo: '/'
//       });
//   });
})();