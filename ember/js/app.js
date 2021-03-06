App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function(){
    this.route('about');
    this.resource('requests', function(){
      this.route('created', { path: '/created_by'});
      this.route('assigned', { path: '/assigned'});

      this.route('details', { path: '/details/:id' });
      this.route('edit', { path: '/edit/:id' });
      this.route('create', { path: '/create' });
    });
});

App.ApplicationSerializer = DS.LSSerializer.extend();
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'requests-emberjs'
});

// App.ApplicationStore = DS.Store.extend({
//     revision: 12,
//     // Says we are specifying all models in js
//     adapter: DS.FixtureAdapter
// });

App.RequestsIndexRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('request');
  }
});

App.RequestsCreatedRoute = Ember.Route.extend({

  setupController: function(controller, model){
    this.controllerFor('requests.index').set('model', model);
  },

  renderTemplate: function(){
    this.render('requests.index');
  },

  model: function(){
    return this.store.find('request', { author: 'Juri' });
  }
});

App.RequestsAssignedRoute = Ember.Route.extend({

  setupController: function(controller, model){
    this.controllerFor('requests.index').set('model', model);
  },

  renderTemplate: function(){
    this.render('requests.index');
  },

  model: function(){
    return this.store.find('request', { owner: 'Juri' });
  }
});

/*
Handles the issue list
 */
App.RequestsIndexController = Ember.ArrayController.extend({
  queryParams: ['status'],
  status: "open",

  openItems: Ember.computed.filterBy('model', 'status', 'open'),
  closedItems: Ember.computed.filterBy('model', 'status', 'closed'),

  filteredRequests: function(){
    var status = this.get('status');
    var model = this.get('model');

    if(status){
      return model.filterProperty('status', status);
    }else{
      return model;
    }
  }.property('status', 'model')

});


App.RequestsEditRoute = Ember.Route.extend({

  model: function(params){
    return this.store.find('request', params.id);
  },

  actions: {
    // Rollback eventually unsaved changes when we
    // transition away from this route
    // (http://emberjs.com/guides/routing/preventing-and-retrying-transitions/)
    willTransition: function(transition){
      var model = this.controller.get('model');

      if(model.get('isDirty')){
        // we could ask about whether to abandon changes
        model.rollback();
      }

      return true;
    }
  }

});

App.RequestsEditController = Ember.ObjectController.extend({
  actions: {
    'save': function(){
      var self = this;

      var model = this.get('model');
      model.set('lastUpdated', new Date());

      model.save().then(function(){
        self.transitionTo('requests.details', model);
      });
    },

    'cancel': function(){
      this.transitionTo('requests.index');
    }
  }
});

App.RequestsCreateRoute = Ember.Route.extend({

  model: function(){
    return this.store.createRecord('request');
  },

  actions: {
    // Rollback eventually unsaved changes when we
    // transition away from this route
    // (http://emberjs.com/guides/routing/preventing-and-retrying-transitions/)
    willTransition: function(transition){
      var model = this.controller.get('model');

      if(model.get('isDirty')){
        // we could ask about whether to abandon changes
        model.rollback();
      }

      return true;
    }
  },

  renderTemplate: function(){
    this.render('requests.edit', {
      controller: 'requestsCreate'
    });
  }

});

App.RequestsCreateController = Ember.ObjectController.extend({
  actions: {
    'save': function(){
      var self = this;

      var model = this.get('model');

      model.set('owner', 'Juri');
      model.set('creationDate', new Date());
      model.set('lastUpdated', new Date());

      model.save().then(function(){
        self.transitionTo('requests.index');
      });

    },

    'cancel': function(){
      this.transitionTo('requests.index');
    }

  }
});

App.RequestsDetailsRoute = Ember.Route.extend({

  model: function(params){
    return this.store.find('request', params.id);
  }

});

App.RequestsDetailsController = Ember.ObjectController.extend({
  commentBody: null,

  isOpen: Ember.computed.equal('status', 'open'),

  _saveComment: function(comment){
      var self = this;
      var model = self.get('model');

      // seems like I need to save both, the comment and the
      // association to the request parent model
      comment.save().then(function(){
        model.get('comments').then(function(commentList){
            commentList.addObject(comment);
            model.save();

            self.set('commentBody', '');
          });
      });
  },

  actions: {
    'addComment': function(){
      var comment = this.store.createRecord('comment', {
        comment: this.get('commentBody'),
        author: 'Juri',
        lastUpdated: new Date()
      });

      this._saveComment(comment);
    },

    'removeComment': function(commentToRemove){
      commentToRemove.deleteRecord();

      // strangely I have to do this as well
      this.get('model').save();
    },

    'close': function(){
      var model = this.get('model');
      model.set('status', 'closed');

      var comment = this.store.createRecord('comment', {
        comment: 'closed',
        author: 'Juri',
        systemLog: true,
        lastUpdated: new Date()
      });

      this._saveComment(comment);
    },

    'reopen': function(){
      var model = this.get('model');
      model.set('status', 'open');

      var comment = this.store.createRecord('comment', {
        comment: 'open',
        author: 'Juri',
        systemLog: true,
        lastUpdated: new Date()
      });

      this._saveComment(comment);
    }
  }

});

/* Model definitions */

App.Request = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  creationDate: DS.attr('date'),
  lastUpdated: DS.attr('date'),
  status: DS.attr('string', { defaultValue: 'open' }),
  author: DS.attr('string', { defaultValue: 'Juri' }),
  owner: DS.attr('string'),
  comments: DS.hasMany('comment', {async:true})
});

App.Comment = DS.Model.extend({
  comment: DS.attr('string'),
  author: DS.attr('string'),
  lastUpdated: DS.attr('date'),
  systemLog: DS.attr('boolean', { defaultValue: false }),
  request: DS.belongsTo('request', {async:true})
});


/* Handlebars helpers */

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});