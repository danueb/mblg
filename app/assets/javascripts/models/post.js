window.Post = Backbone.Model.extend({
  initialize: function() {
    this.set({ 'movieTitle':  this.movie().get('title') });
  },
  movie: function() {
    return window.movies.findWhere({"id": this.get('movie_id')});
  }
});

window.Posts = Backbone.Collection.extend({
  model: Post,
  url: '/posts'
});