window.Movie = Backbone.Model.extend({
  initialize: function() {
    var tmdbURL = "http://api.themoviedb.org/3/movie/"
                 + this.get('tmdb_id')
                 + "?api_key=98a34be63cee4bcc6a3b15ebf867ffdd"
                 + "&append_to_response=casts";
    this.facts = new TmdbData({ 'url': tmdbURL});
  }
});

window.Movies = Backbone.Collection.extend({
  model: Movie,
  url: '/movies'
});