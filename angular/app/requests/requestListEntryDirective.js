angular.module('issuesApp')
    .directive('requestListEntry', function(){
        return {
            restrict: 'E',
            templateUrl: 'app/requests/listEntry.html'
        };
    });