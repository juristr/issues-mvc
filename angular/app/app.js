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
          controller: 'RequestsListController'
        })
        .when('/requests/details/:id', {
          templateUrl: 'app/details/requestDetail.html',
          controller: 'RequestsDetailsController'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

  angular.module('issuesApp')
    .controller('RequestsListController', ['$scope', function($scope){
      $scope.filteredRequests = [
        {
          title: 'Test title 1',
          description: 'I am the description',
          author: 'Juri',
          comments: []
        }
      ];
    }]);

  angular.module('issuesApp')
    .controller('RequestsDetailsController', ['$scope', function($scope){
      $scope.item = {
          title: 'Test title 1',
          description: 'I am the description',
          author: 'Juri',
          comments: []
        };

      $scope.close = function(item){
        console.log('close item');
      };
      $scope.reOpen = function(item){
        console.log('reopen item');
      };

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