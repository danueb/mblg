/* 
  reel 3d fun!
  
  Almost all navigation logic is kept here in the goofily named ViewMaster, 
  which keeps track of what set of views should be displayed and which post
  is the current post and so on. 
*/

window.ViewMaster = Backbone.Model.extend({

  defaults: {
    'currentPostIndex': 0,
    'currentView': 'home'
  },

  initialize: function() {
    this.set({'currentPostIndex': window.posts.length - 1});
  },

  onHome: function() {
    return this.get('currentView') == 'home';
  },
    
  onAbout: function() {
    return this.get('currentView') == 'about';
  },

  onList: function() {
    return this.get('currentView') == 'list';
  },

  onFirst: function() {
    return this.get('currentPostIndex') == 0;
  },

  onLast: function() {
    return this.get('currentPostIndex') == (window.posts.length - 1);
  },

  postExists: function(index) {
    return (index >= 0 && index < window.posts.length);
  },

  currentPost: function() {
    return window.posts.at(this.get('currentPostIndex'));
  },


  // Navigation
  // ALL in-app navigation should be done through these functions

  goToHome: function() {
    this.set({'currentView': 'home'});
    this.setPostUrl();
  },

  goToPost: function(index) {
    if(this.postExists(index)){
      this.set({'currentPostIndex': index});
      this.goToHome();
    }
  },

  goNext: function() {
    var nextIndex = parseInt(this.get('currentPostIndex')) + 1;
    if(!this.onLast()){
      this.set({'currentPostIndex': nextIndex});
      this.setPostUrl();
    }
  },

  goPrev: function() {
    var prevIndex = parseInt(this.get('currentPostIndex')) - 1;
    if(!this.onFirst()){
      this.set({'currentPostIndex': prevIndex});
      this.setPostUrl();
    }
  },

  goToAbout: function() {
    this.set({'currentView': 'about'});
    App.navigate('/about');    
  },

  goToList: function() {
    this.set({'currentView': 'list'});
    App.navigate('/list');   
  },

  // Should generally only be called from inside a viewmaster function
  setPostUrl: function() {
    var index = this.get('currentPostIndex');
    if(this.onLast()){
      App.navigate('/');
    } else {
      App.navigate('/post/'+index);
    }
  }
});