window.MovieInfoView = Backbone.View.extend({
  tagName: 'section',
  className: 'movie-info',

  initialize: function() {
    _.bindAll(this, 'render', 'updateFacts');
    this.template = Handlebars.compile( window.movieInfoTemplate );

    this.listenTo(this.model.facts, 'change', this.updateFacts);
    this.listenTo(this.model, 'change', this.render);

    if(!this.model.facts.has('title')){
      this.model.facts.fetch();
    }
  },

  updateFacts: function() {
    this.model.set({ 'facts': this.model.facts.toJSON() });
  },

  render: function() {
    $(this.el).html( this.template( this.model.toJSON() ) );
    return this;
  }
});