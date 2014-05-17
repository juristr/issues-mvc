angular.module('issuesApp')
    .directive('requestListEntry', function(){
        return {
            restrict: 'A',
            scope: {
                customerItem: '=requestListEntry'
            },
            templateUrl: 'app/requests/listEntry.html'
            // link: function($scope, element, attrs){
            //     $scope.title = 'abc';
            // }
        };
    });