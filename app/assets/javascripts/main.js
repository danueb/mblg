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
    url: '/movies',

  });
  
  window.Posts = Backbone.Collection.extend({
    model: Post,
    url: '/posts'
  });

  window.ViewMaster = Backbone.Model.extend({
    // "reel" 3d fun!

    initialize: function() {
      this.set({'currentPostIndex': window.posts.length - 1});
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

    goNext: function() {
      var nextIndex = this.get('currentPostIndex') + 1
      if(!this.onLast()){
        this.set({'currentPostIndex': nextIndex});
        App.navigate('/'+nextIndex);
      }
    },

    goPrev: function() {
      var prevIndex = this.get('currentPostIndex') - 1
      if(!this.onFirst()){
        this.set({'currentPostIndex': prevIndex});
        App.navigate('/'+prevIndex);
      }
    }

  })

  window.movies = new window.Movies(window.movieData);
  window.posts = new window.Posts(window.postData);
  window.viewMaster = new window.ViewMaster();

  // VIEWS //

  window.HeaderView = Backbone.View.extend({
    tagName: 'header',
    className: 'top-nav',
    template: Handlebars.compile( $('#header-template').html() ),

    initialize: function() {
      _.bindAll(this, 'render');
    },

    render: function() {
      $(this.el).html( this.template({}) );
      return this;
    }
  });

  window.MainView = Backbone.View.extend({
    className: 'main',

    initialize: function() {
      _.bindAll(this, 'render', 'update');
      this.postView = new PostView({
        model: this.model.currentPost(),
        viewMaster: this.model
      });
      this.movieInfoView = new MovieInfoView({
        model: this.model.currentPost().movie(),
        viewMaster: this.model
      });

      this.listenTo(this.model, 'change:currentPostIndex', this.update);
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
      $(this.el).append(this.postView.render().el);
      $(this.el).append(this.movieInfoView.render().el);
      return this;
    }
  });

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
      ':postid': 'post'
    },

    initialize: function() {
      this.headerView = new HeaderView();
      this.mainView = new MainView({
        model: viewMaster
      });
    },

    home: function() {
      var $moms = $('#moms-div');
      if (!$(".top-nav")[0]){
        $moms.before(this.headerView.render().el);
      }

      $moms.empty();
      $moms.append(this.mainView.render().el);
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