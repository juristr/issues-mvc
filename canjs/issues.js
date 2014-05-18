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
            this._instantiateController(RequestListController);
        },

        'requests/created_by route': function(){

        },

        'requests/assigned route': function(){

        },

        'details/:id route': function(){

        },

        'request/edit/:id route': function(){
            this._instantiateController(RequestEditController, { 
                issue: new Issue({
                    id: 1,
                    title: 'Test issue title',
                    author: 'Juri',
                    description: 'Some description'
                }) 
            });
        },

        'request/create route': function(){
            this._instantiateController(RequestEditController);
        },

        _instantiateController: function(controllerClass, options){
            if(this._currentPageController)
                this._currentPageController.destroy();

            this._currentPageController = new controllerClass(this.element.find('.js-content-container'), options);
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

    var RequestEditController = can.Control({
        _model: undefined,

        init: function(element, options){

            if(options && options.issue){
                this._model = new Issue(options.issue.attr());
            }else{
                this._model = new Issue();
            }

            this.element.html(can.view('request_edit', { issue: this._model }));
        },

        '.js-save click': function(){
            console.log('saving');

            window.location.hash = '#!requests';
        },

        '.js-cancel click': function(){
            window.location.hash = '#!requests';
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


    // 2-way binds an element and value
    var Value = can.Control({
        init: function(){
            this.set()
        },
        "{value} change": "set",
        set: function(){
            this.element.val(this.options.value())
        },
        "change": function(){
            this.options.value(this.element.val())
        }
    });
    can.Mustache.registerHelper('value', function(value){
        return function(el){
            new Value(el, {value: value});
        }
    });


    new Router('body');
    can.route.ready();
});