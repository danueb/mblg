$(document).ready(function() {
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
});