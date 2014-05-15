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
        .when('/requests', {
          templateUrl: 'app/partials/requests.html',
          controller: 'RequestListController'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

  angular.module('issuesApp')
    .controller('RequestListController', ['$scope', function($scope){
      $scope.filteredRequests = [
        {
          title: 'Test title 1',
          description: 'I am the description',
          author: 'Juri',
          comments: []
        }
      ];
    }]);


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