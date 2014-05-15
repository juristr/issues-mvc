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
          id: 1,
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
          id: 1,
          title: 'Test title 1',
          status: 'closed',
          description: 'I am the description111',
          author: 'Juri',
          comments: [
            {
              comment: 'open',
              author: 'Juri',
              systemLog: true,
              lastUpdated: new Date()
            },
            {
              comment: 'Hi, this is a test comment',
              author: 'Juri',
              systemLog: false,
              lastUpdated: new Date()
            }
          ]
        };

      $scope.close = function(item){
        console.log('close item');
      };
      $scope.reOpen = function(item){
        console.log('reopen item');
      };

      $scope.addComment = function(commentBody){
        $scope.item.comments.push({
          comment: commentBody,
          author: 'Juri',
          systemLog: false,
          lastUpdated: new Date()
        });
      };
      $scope.removeComment = function(){

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