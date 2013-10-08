$(document).ready(function() {

  window.movies = new window.Movies(window.movieData);
  window.posts = new window.Posts(window.postData);
  window.viewMaster = new window.ViewMaster();

  window.Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'about': 'about',
      'list': 'list',
      'post/:postid': 'post'
    },

    initialize: function() {
      this.mainView = new MainView({
        model: viewMaster
      });
    },

    home: function() {
      var $moms = $('#moms-div');
      if (!$(".top-nav")[0]){
        $moms.before(this.mainView.headerView.render().el);
      }

      $moms.empty();
      $moms.append(this.mainView.render().el);
    },

    about: function() {
      this.home();
      viewMaster.set({'currentView': 'about'});
    },

    list: function() {
      this.home();
      viewMaster.set({'currentView': 'list'});
    },

    post: function(postid) {
      this.home();
      viewMaster.set({'currentPostIndex': postid});
    }
  });

  window.App = new Router();
  Backbone.history.start();

  // for mobile
  if($(window).width() < 768){
    window.scroll(0,38);
  }
  
});