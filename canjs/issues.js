require(['can', 'mustache', 'canLocalStorage', 'moment', '../assets/libs/showdown'], function(can){
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

        'requests/details/:id route': function(){
            var list = new Issue({
                id: 1,
                title: 'Test issue title',
                description: 'Some **formatted** description!',
                author: 'Juri',
                owner: 'Juri',
                status: 'open',
                createdDate: new Date(),
                updatedDate: new Date(),
                comments: [
                    {
                        id: 1,
                        comment: 'Test comment',
                        author: 'Juri'
                    }
                ]
            });


            this._instantiateController(RequestDetailController, list);
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

    var RequestDetailController = can.Control({
        commentBody: undefined,

        init: function(element, options){
            this.element.html(can.view('request_details', options));
        },

        '.js-reopen click': function(){
            // write log
            this.options.attr('comments').push({
                  comment: 'open',
                  author: 'Juri',
                  systemLog: true,
                  lastUpdated: new Date()
                });

            this.options.attr('status', 'open');
        },

        '.js-close click': function(){
            // write log
            this.options.attr('comments').push({
                  comment: 'closed',
                  author: 'Juri',
                  systemLog: true,
                  lastUpdated: new Date()
                });

            this.options.attr('status', 'closed');
        },

        '.js-add-comment click': function(){
            var newComment = this.element.find('.js-new-comment').val();

            var comment = {
                comment: newComment,
                author: 'Juri',
                lastUpdated: new Date()
              };

            this.options.attr('comments').push(comment);

             this.element.find('.js-new-comment').val('');
        }
    });

    /*
    can.Component.extend({
        tag: 'issue-entry',
        template: can.view('listentry')
    });
    */

   
    var Issue = can.Model.extend({
        isOpen: function(){
            return this.attr('status') === 'open';
        }
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

    var showdown = new Showdown.converter();
    can.Mustache.registerHelper('format-markdown', function(value){
        return showdown.makeHtml(value());
    });

    can.Mustache.registerHelper('format-date', function(value){
        return moment(value).fromNow();
    });


    new Router('body');
    can.route.ready();
});