window.ListView = Backbone.View.extend({
  tagName: 'section',
  className: 'list',

  initialize: function() {
    _.bindAll(this, 'render');
    this.template = Handlebars.compile( window.listTemplate );
  },

  render: function() {
    var $listTag, vm = this.options.viewMaster;
    $(this.el).html( this.template( {} ));
    $listTag = this.$('ul.movie-list');
    this.collection.each(function(movie){
      var view = new MovieListingView({
        model: movie,
        viewMaster: vm
      });
      $listTag.append(view.render().el);
    });
    return this;
  }
});