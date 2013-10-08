window.AboutView = Backbone.View.extend({
  tagName: 'section',
  className: 'about',

  initialize: function() {
    _.bindAll(this, 'render');
    this.template = Handlebars.compile( window.aboutTemplate );

    this.viewMaster = this.options.viewMaster;
  },

  render: function() {
    $(this.el).html( this.template( {} ) );
    return this;
  },

  events: {
    "click a.listLink": "list"
  },

  list: function() {
    this.viewMaster.goToList();
  }
});