angular.module('issuesApp')
    .filter('formattedDate', function(){
        return function(input){
            return moment(input).fromNow();
        };
    });