App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function(){
    this.route('about');
    this.resource('requests', function(){
      this.route('filter', { path: '/filter/:status'});
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

App.RequestsFilterRoute = Ember.Route.extend({

  renderTemplate: function(){
    this.render('requests.index');
  },

  model: function(filter){
    return this.store.find('request', { status: filter.status });
  }
});

App.RequestsEditRoute = Ember.Route.extend({

  model: function(params){
    return this.store.find('request', params.id);
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
    }
  }
});

App.RequestsCreateRoute = Ember.Route.extend({

  model: function(){
    return this.store.createRecord('request');
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

  actions: {
    'addComment': function(){
      var self = this;
      var comment = this.store.createRecord('comment', {
        comment: this.get('commentBody'),
        author: 'Juri',
        lastUpdated: new Date()
      });

      var model = self.get('model');

      comment.save().then(function(){
        model.get('comments').then(function(commentList){
            commentList.addObject(comment);
            model.save();

            self.set('commentBody', '');
          });
      });
    },

    'removeComment': function(commentToRemove){
      commentToRemove.deleteRecord();

      // strangely I have to do this as well
      this.get('model').save();
    },

    'close': function(){
      var model = this.get('model');
      model.set('status', 'closed');

      var self = this;
      var comment = this.store.createRecord('comment', {
        comment: 'closed',
        author: 'Juri',
        systemLog: true,
        lastUpdated: new Date()
      });

      comment.save().then(function(){
        model.get('comments').then(function(commentList){
            commentList.addObject(comment);
            model.save();

            self.set('commentBody', '');
          });
      });
    },

    'reopen': function(){
      var model = this.get('model');
      model.set('status', 'open');

      var self = this;
      var comment = this.store.createRecord('comment', {
        comment: 'open',
        author: 'Juri',
        systemLog: true,
        lastUpdated: new Date()
      });

      comment.save().then(function(){
        model.get('comments').then(function(commentList){
            commentList.addObject(comment);
            model.save();

            self.set('commentBody', '');
          });
      });
    }
  }

});

/* Model definitions */

App.Request = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  creationDate: DS.attr('date'),
  lastUpdated: DS.attr('date'),
  status: DS.attr('string', { defaultValue: 'Open' }),
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

/* Fixture data */

// App.Request.FIXTURES = [
//   {
//       "id": 1,
//       "title": "Forum für Bürgeranliegen",
//       "description": "Es wäre interessant wenn ich als Bürger die Möglichkeit hätte in einem Forum meine Anliegen anzuführen bzw. Hilfestellung bekommen kann.",
//       "status": "Open",
//       "creationDate": "2014-04-10T15:00:00Z",
//       "author": "Juri",
//       "owner": "",
//       "comments": [1]
//   },
//   {
//       "id": 3,
//       "title": "Another requirement",
//       "description": "A finished requirement...",
//       "status": "Done",
//       "creationDate": "2014-03-20T10:00:00Z",
//       "author": "Juri",
//       "owner": "Juri"
//   },
//   {
//       "id": 2,
//       "title": "Login mit Facebook",
//       "description": "Ich möchte mich auch mit meinem Facebook Account authentifizieren können!",
//       "status": "Doing",
//       "creationDate": "2014-03-20T10:00:00Z",
//       "author": "Juri",
//       "owner": "Christoph",
//       "comments": [2]
//   }
// ];

// App.Comment.FIXTURES = [
//   {
//     "id": 1,
//     "comment": "the comment",
//     "author": "Juri",
//     "creationDate": "2014-04-10T15:00:00Z"
//   },
//   {
//     "id": 2,
//     "comment": "another comment",
//     "author": "Juri",
//     "creationDate": "2014-04-10T15:00:00Z"
//   }
// ];
