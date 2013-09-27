$(document).ready(function() {

  // MODELS //

  window.Movie = Backbone.Model.extend({
    initialize: function() {
      var imdbURL = "http://www.omdbapi.com/?i=" + this.get('imdb_id');
      this.imdb = new IMDBData({ 'url': imdbURL });
    }
  });

  window.IMDBData = Backbone.Model.extend({
    url: function(){
      return this.get('url');
    }
  });

  window.Post = Backbone.Model.extend({

    initialize: function() {
      this.set({ 'movieTitle':  this.movie().get('title') });
    },

    movie: function() {
      return window.movies.findWhere({"id": this.get('movie_id')});
    }

  });

  window.Movies = Backbone.Collection.extend({
    model: Movie,
    url: '/movies'
  });
  
  window.Posts = Backbone.Collection.extend({
    model: Post,
    url: '/posts'
  });

  window.ViewMaster = Backbone.Model.extend({
    // "reel" 3d fun!

    initialize: function() {
      // Put these in defaults? Idk
      this.set({'currentPostIndex': window.posts.length - 1});
      this.set({'currentView': 'home'});
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

    currentPost: function() {
      return window.posts.at(this.get('currentPostIndex'));
    },

    goToHome: function() {
      this.set({'currentView': 'home'});
      this.setPostUrl();
    },

    goNext: function() {
      var nextIndex = this.get('currentPostIndex') + 1;
      if(!this.onLast()){
        this.set({'currentPostIndex': nextIndex});
        this.setPostUrl();
      }
    },

    goPrev: function() {
      var prevIndex = this.get('currentPostIndex') - 1;
      if(!this.onFirst()){
        this.set({'currentPostIndex': prevIndex});
        this.setPostUrl();
      }
    },

    goToAbout: function() {
      this.set({'currentView': 'about'});
      App.navigate('/about');    },

    setPostUrl: function() {
      var index = this.get('currentPostIndex');
      if(this.onLast()){
        App.navigate('/');
      } else {
        App.navigate('/post/'+index);
      }
    }
  })

  window.movies = new window.Movies(window.movieData);
  window.posts = new window.Posts(window.postData);
  window.viewMaster = new window.ViewMaster();

  // VIEWS //

  window.MainView = Backbone.View.extend({
    className: 'main',

    initialize: function() {
      _.bindAll(this, 'toggleSubviews', 'render', 'update');
      this.headerView = new HeaderView({
        viewMaster: this.model
      });
      this.postView = new PostView({
        model: this.model.currentPost(),
        viewMaster: this.model
      });
      this.movieInfoView = new MovieInfoView({
        model: this.model.currentPost().movie(),
        viewMaster: this.model
      });
      this.aboutView = new AboutView();

      this.listenTo(this.model, 'change:currentPostIndex', this.update);
      this.listenTo(this.model, 'change:currentView', this.toggleSubviews);
    },

    update: function() {
      this.postView.remove();
      this.movieInfoView.remove();
      this.postView = new PostView({
        model: this.model.currentPost(),
        viewMaster: this.model
      });
      this.movieInfoView = new MovieInfoView({
        model: this.model.currentPost().movie(),
        viewMaster: this.model
      });
      this.render();
    },

    render: function() {
      $(this.el).append(this.aboutView.render().el);
      $(this.el).append(this.postView.render().el);
      $(this.el).append(this.movieInfoView.render().el);
      this.toggleSubviews();
      return this;
    },

    toggleSubviews: function() {
      this.$('.about').toggle(this.model.onAbout());
      this.$('.post').toggle(this.model.onHome());
      this.$('.movie-info').toggle(this.model.onHome());
      this.$('.list').toggle(this.model.onList());
    }
  });

  window.HeaderView = Backbone.View.extend({
    tagName: 'header',
    className: 'top-nav',
    template: Handlebars.compile( $('#header-template').html() ),

    initialize: function() {
      _.bindAll(this, 'toggleHomeButton', 'render');
      this.viewMaster = this.options.viewMaster;

      this.listenTo(this.viewMaster, 'change:currentView', this.toggleHomeButton);
    },

    render: function() {
      $(this.el).html( this.template({}) );
      this.toggleHomeButton();
      return this;
    },

    toggleHomeButton: function() {
      this.$('.nav-head').toggleClass('buttonify', !this.viewMaster.onHome());
    },

    events: {
      "click .nav-head.buttonify": "home",
      "click .nav-option.list": "list",
      "click .nav-option.about": "about"
    },

    home: function() {
      this.viewMaster.goToHome();
    },

    list: function() {
      // TODO: list
      console.log('list button pushed');
    },

    about: function() {
      if(this.viewMaster.onAbout()){
        this.viewMaster.goToHome();
      } else {
        this.viewMaster.goToAbout();
      }
    }
  });

  window.AboutView = Backbone.View.extend({
    tagName: 'section',
    className: 'about',
    template: Handlebars.compile( $('#about-template').html() ),

    initialize: function() {
      _.bindAll(this, 'render');
    },

    render: function() {
      $(this.el).html( this.template( {} ) );
      return this;
    }

    // TODO: remember, there's a link to the list view in here
  })

  window.PostView = Backbone.View.extend({
    tagName: 'article',
    className: 'post',
    template: Handlebars.compile( $('#post-template').html() ),

    initialize: function() {
      _.bindAll(this, 'render');
      this.viewMaster = this.options.viewMaster;
    },

    render: function() {
      $(this.el).html( this.template( this.model.toJSON() ) );
      this.$(".prev").toggleClass('disabled', this.viewMaster.onFirst());
      this.$(".next").toggleClass('disabled', this.viewMaster.onLast());
      return this;
    },

    events: {
      'click .prev': 'prev',
      'click .next': 'next'
    },

    prev: function() {
      this.viewMaster.goPrev();
    },

    next: function() {
      this.viewMaster.goNext();
    }
  });

  window.MovieInfoView = Backbone.View.extend({
    tagName: 'section',
    className: 'movie-info',
    template: Handlebars.compile( $('#movie-info-template').html() ),

    initialize: function() {
      _.bindAll(this, 'render', 'updateData');
      this.listenTo(this.model.imdb, 'change', this.updateData);
      this.listenTo(this.model, 'change', this.render);

      if(!this.model.imdb.has('title')){
        this.model.imdb.fetch();
      }
    },

    updateData: function() {
      this.model.set({ 'imdb': this.model.imdb.toJSON() });
    },

    render: function() {
      $(this.el).html( this.template( this.model.toJSON() ) );
      return this;
    }
  });

  // window.MoviesViews = Backbone.View.extend({
  //   className: 'movies',
  //   template: Handlebars.compile( $('#movies-template').html() ),

  //   initialize: function() {
  //     _.bindAll(this, 'render');
  //     this.listenTo(this.collection, 'reset', this.render);
  //   },

  //   render: function() {
  //   }
  // });

  window.Mblg = Backbone.Router.extend({
    routes: {
      '': 'home',
      'about': 'about',
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

    post: function(postid) {
      this.home();
      viewMaster.set({'currentPostIndex': postid});
    }
  });

  $(function() {
    window.App = new Mblg();
    Backbone.history.start();
    if($(window).width() < 768){
      window.scroll(0,38);
    }
  });
});