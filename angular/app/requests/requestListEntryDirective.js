angular.module('issuesApp')
    .directive('requestListEntry', function(){
        return {
            restrict: 'A',
            scope: {
                item: '=item'
            },
            templateUrl: 'app/requests/listEntry.html'
            // link: function($scope, element, attrs){
            //     $scope.title = 'abc';
            // }
        };
    });