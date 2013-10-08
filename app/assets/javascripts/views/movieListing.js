window.MovieListingView = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    _.bindAll(this, 'render');
    this.template = Handlebars.compile( window.movieListingTemplate );

    this.viewMaster = this.options.viewMaster;
  },

  render: function() {
    var id = this.model.get('id') - 1;
    $(this.el).html( this.template( this.model.toJSON() ));
    $(this.el).toggleClass('clickable', this.viewMaster.postExists(id));
    return this;
  },

  events: {
    'click': 'viewPost'
  },

  viewPost: function() {
    var id = this.model.get('id') - 1;
    console.log(id);
    this.viewMaster.goToPost(id);
  }
});