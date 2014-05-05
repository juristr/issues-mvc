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
        }

    });


    new Router('body');
    can.route.ready();
});