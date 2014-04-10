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

App.Store = DS.Store.extend({
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
  author: DS.attr('string')
});

App.RequestsIndexRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('request');
  }
});

App.RequestsEditRoute = Ember.Route.extend({
  model: function(params){
  }
});

App.RequestsDetailsRoute = Ember.Route.extend({

  model: function(params){
    return this.store.find('request', params.id);
  }

});

/*
App.FavlinksIndexRoute = Ember.Route.extend({
    model: function(params){
      return this.store.find('favlink');
      //return $.getJSON('./data/links.json');
    }
});

App.FavlinksDetailsRoute = Ember.Route.extend({
    model: function(params){
      return this.store.find('favlink', params.id);
    }
});

App.FavlinksEditRoute = Ember.Route.extend({
    model: function(params){
      return this.store.find('favlink', params.id);
    },
    actions: {
      save: function(modelToSave){
        this.store.push('favlink', modelToSave);
      }
    }
});
*/

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
      "author": "Juri"
  },
  {
      "id": 2,
      "title": "My website",
      "description": "My personal website and blog",
      "status": "Doing",
      "creationDate": "2014-03-20T10:00:00Z",
      "author": "Christoph"
  }
];