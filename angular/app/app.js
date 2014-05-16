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
        .when('/requests/:authorFilter?', {
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
    .controller('RequestsListController', ['$scope', '$routeParams', function($scope, $routeParams){
      console.log('Visualizing: ' + $routeParams.authorFilter);


      var requests = [
          {
            id: 1,
            title: 'Test title 1',
            description: 'I am the description',
            author: 'Juri',
            owner: 'Juri',
            comments: []
          },
          {
            id: 2,
            title: 'Test title 1',
            description: 'I am the description',
            author: 'Christoph',
            owner: 'Juri',
            comments: []
          }
        ];


      if($routeParams.authorFilter){
        $scope.requests = requests.filter(function(element){
          if($routeParams.authorFilter === 'assigned'){
            return element.owner === 'Juri';
          }else{
            return element.author === 'Juri';
          }
        });
      }else{
        $scope.requests = requests;
      }
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

        // write a log
        $scope.item.comments.push({
          comment: 'closed',
          author: 'Juri',
          systemLog: true,
          lastUpdated: new Date()
        });

        // update current object
        $scope.item.status = 'closed';
      };

      $scope.reOpen = function(item){

        // write a log
        $scope.item.comments.push({
          comment: 'open',
          author: 'Juri',
          systemLog: true,
          lastUpdated: new Date()
        });

        $scope.item.status = 'open';
      };

      $scope.addComment = function(commentBody){
        $scope.item.comments.push({
          id: guid(),
          comment: commentBody,
          author: 'Juri',
          systemLog: false,
          lastUpdated: new Date()
        });
      };

      $scope.removeComment = function(comment){
        var result = $scope.item.comments.filter(function(element){
          return element.id === comment.id;
        });

        // delete record from array...don't blame me -.-
        var newArray = [];
        for(var i=0; i<$scope.item.comments.length; i++){
          if($scope.item.comments[i].id !== comment.id){
            newArray.push($scope.item.comments[i]);
          }
        }

        $scope.item.comments = newArray;
      };

    }]);

  var guid = (function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    }
    return function() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
             s4() + '-' + s4() + s4() + s4();
    };
  })();


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