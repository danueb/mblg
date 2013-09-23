$(document).ready(function() {

  // MODELS //

  window.Movie = Backbone.Model.extend({

  });
  window.Post = Backbone.Model.extend({

  });

  window.Movies = Backbone.Collection.extend({
    model: Movie,
    url: '/movies'
  });
  
  window.Posts = Backbone.Collection.extend({
    model: Post,
    url: '/posts'
  });

  window.movs = new window.Movies();
  window.psts = new window.Posts();

  // VIEWS //

  window.MovieView = Backbone.View.extend({
    className: 'movie',
    template: Handlebars.compile( $('#movie-template').html() ),

    initialize: function() {
      _.bindAll(this, 'render');
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      $(this.el).html( this.template( this.model.toJSON() ) );
      return this;
    }
  });

  window.MoviesViews = Backbone.View.extend({
    className: 'movies',
    template: Handlebars.compile( $('#movies-template').html() ),

    initialize: function() {
      _.bindAll(this, 'render');
      this.listenTo(this.collection, 'reset', this.render);
    },

    render: function() {
      $this = $(this.el);
      this.collection.each(function(movie){
        var view = new MovieView({ model: movie });
        $this.append(view.render().el);
      });
      return this;
    }
  });

});