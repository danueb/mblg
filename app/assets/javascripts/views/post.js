window.PostView = Backbone.View.extend({
  tagName: 'article',
  className: 'post',

  initialize: function() {
    _.bindAll(this, 'render');
    this.template = Handlebars.compile( window.postTemplate );

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