require(['can', 'mustache', 'canLocalStorage'], function(can){
    'use strict';

    var Router = can.Control({
        _currentPageController: undefined,

        init: function(){
            this.element.find('#js-content').html(can.view('application'));
        },

        'route': function(){
            this.element.find('.js-content-container').html(can.view('index'));
        },

        'requests route': function(){
            if(this._currentPageController)
                this._currentPageController.destroy();

            this._currentPageController = new RequestListController(this.element.find('.js-content-container'));
        },

        'requests/created_by route': function(){

        },

        'requests/assigned route': function(){

        },

        'details/:id route': function(){

        },

        'request/edit/:id route': function(){

        },

        'request/create route': function(){

        }

    });





    var RequestListController = can.Control({

        init: function(){
            var list = new Issue.List([
                    new Issue({
                        id: 1,
                        title: 'Issue 1 test',
                        description: 'Some description',
                        status: 'open',
                        author: 'Juri',
                        owner: 'Juri'
                    }),
                    new Issue({
                        id: 2,
                        title: 'Issue 2 test',
                        description: 'Another issue',
                        author: 'Juri',
                        status: 'open',
                        owner: 'Juri'
                    })                    
                ]);


            this.element.html(can.view('requests_index', {
                filteredRequests: list
            }));

        }

    });

    /*
    can.Component.extend({
        tag: 'issue-entry',
        template: can.view('listentry')
    });
    */

   
    var Issue = can.Model.extend({

    });

    // List for Todos
    Issue.List = Issue.List.extend({
        filter: function (check) {
            var list = [];

            this.each(function (todo) {
                if (check(todo)) {
                    list.push(todo);
                }
            });

            return list;
        },

        closed: function(){
            return this.filter(function (issue) {
                return issue.attr('status') === 'closed';
            });
        },

        open: function(){
            return this.filter(function (issue) {
                return issue.attr('status') === 'open';
            });
        }        
        
        /*filter: function (check) {
            var list = [];

            this.each(function (todo) {
                if (check(todo)) {
                    list.push(todo);
                }
            });

            return list;
        },

        completed: function () {
            return this.filter(function (todo) {
                return todo.attr('complete');
            });
        },

        remaining: function () {
            return this.attr('length') - this.completed().length;
        },

        allComplete: function () {
            return this.attr('length') === this.completed().length;
        }
        */
    });


    new Router('body');
    can.route.ready();
});