App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function(){
    this.route('about');
    this.resource('requests', { path: '/requests' }, function(){
      this.route('details', { path: '/details/:id' });
      this.route('edit', { path: '/edit/:id' });
    });
});

App.ApplicationStore = DS.Store.extend({
    revision: 12,
    // Says we are specifying all models in js
    adapter: DS.FixtureAdapter
});

App.Request = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  creationDate: DS.attr('date'),
  lastUpdated: DS.attr('data'),
  status: DS.attr('string'),
  author: DS.attr('string'),
  owner: DS.attr('string'),
  comments: DS.hasMany('comment', {async:true})
});

App.Comment = DS.Model.extend({
  comment: DS.attr('string'),
  author: DS.attr('string'),
  creationDate: DS.attr('date')
});

App.RequestsIndexRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('request');
  }
});

App.RequestsEditRoute = Ember.Route.extend({
  model: function(params){
    return this.store.find('request', params.id);
  },
  actions: {
    'save': function(model){
      this.store.push('request', model);
      this.transitionTo('requests.details', model);
    }
  }
});

App.RequestsDetailsRoute = Ember.Route.extend({

  model: function(params){
    return this.store.find('request', params.id);
  }

});

App.RequestsDetailsController = Ember.ObjectController.extend({
  newComment: null,

  actions: {
    'addComment': function(requestModel){
      var comment = this.store.createRecord('comment', {
        comment: this.get('commentBody')
      });

      this.store.push('comment', comment);

      this.set('newComment', null);
    }
  }

});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

App.Request.FIXTURES = [
  {
      "id": 1,
      "title": "StackOverflow",
      "description": "Sample description",
      "status": "Open",
      "creationDate": "2014-04-10T15:00:00Z",
      "author": "Juri",
      "owner": "",
      "comments": [1]
  },
  {
      "id": 2,
      "title": "My website",
      "description": "My personal website and blog",
      "status": "Doing",
      "creationDate": "2014-03-20T10:00:00Z",
      "author": "Juri",
      "owner": "Christoph",
      "comments": [2]
  }
];

App.Comment.FIXTURES = [
  {
    "id": 1,
    "comment": "the comment",
    "author": "Juri",
    "creationDate": "2014-04-10T15:00:00Z"
  },
  {
    "id": 2,
    "comment": "another comment",
    "author": "Juri",
    "creationDate": "2014-04-10T15:00:00Z"
  }
];