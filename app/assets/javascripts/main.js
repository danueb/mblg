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

  window.movies = new window.Movies(window.movieData);
  window.posts = new window.Posts(window.postData);

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

  window.PostView = Backbone.View.extend({
    tagName: 'article',
    className: 'post',
    template: Handlebars.compile( $('#post-template').html() ),

    initialize: function() {
      _.bindAll(this, 'render');
      // listeners?
    },

    render: function() {
      $(this.el).html( this.template( this.model.toJSON() ) );
      return this;
    }
  })

  window.MovieView = Backbone.View.extend({
    className: 'movie',
    template: Handlebars.compile( $('#movie-template').html() ),

    initialize: function() {
      _.bindAll(this, 'render');
    },

    render: function() {
      $(this.el).html( this.template( this.model.toJSON() ) );
      return this;
    }
  });

  window.MovieInfoView = window.MovieView.extend({
    tagName: 'section',
    className: 'movie-info',
    template: Handlebars.compile( $('#movie-info-template').html() ),

    initialize: function() {
      _.bindAll(this, 'render', 'updateData');
      this.listenTo(this.model.imdb, 'change', this.updateData);
      this.listenTo(this.model, 'change', this.render);
      this.model.imdb.fetch();
    },

    updateData: function() {
      this.model.set({ 'imdb': this.model.imdb.toJSON() });
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
      '': 'home'
    },

    initialize: function() {
      var post = window.posts.last();
      this.headerView = new HeaderView();
      this.postView = new PostView({
        model: post
      });
      this.movieInfoView = new MovieInfoView({
        model: post.movie()
      })
    },

    home: function() {
      // Mom's div and Mom's favorite div
      var $moms = $('#moms-div'), $favDiv = $moms.find('#favorite-div');

      $favDiv.empty();

      if (!$(".top-nav")[0]){
        $moms.before(this.headerView.render().el);
      }

      $favDiv.append(this.postView.render().el);
      $favDiv.append(this.movieInfoView.render().el);
    }
  });

  $(function() {
    window.App = new Mblg();
    Backbone.history.start();
  })
});