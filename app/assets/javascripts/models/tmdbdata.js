window.TmdbData = Backbone.Model.extend({
  url: function(){
    return this.get('url');
  }
});