(function(){

    'use strict';

    var showdown = new Showdown.converter();

    angular.module('issuesApp')
        .filter('markdown', ['$sce', function($sce){
            return function(input){
                return $sce.trustAsHtml(showdown.makeHtml(input));
            };
        }]);

})();