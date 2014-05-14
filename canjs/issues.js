require(['can', 'mustache'], function(can){
    'use strict';

    var Router = can.Control({

        init: function(){
            this.element.find('#js-content').html(can.view('application'));
        },

        'route': function(){
            this.element.find('.js-content-container').html(can.view('index'));
        },

        'index route': function(){
            this.element.find('.js-content-container').html(can.view('index'));
        },

        'requests route': function(){

        },

        'requests/created_by route': function(){

        },

        'requests/assigned route': function(){

        },

        'details/:id route': function(){

        },

        'edit/:id route': function(){

        },

        'create route': function(){

        }

    });

    var RequestListController = can.Control({

        init: function(){

        }

    });


    new Router('body');
    can.route.ready();
});