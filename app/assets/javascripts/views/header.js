window.HeaderView = Backbone.View.extend({
  tagName: 'header',
  className: 'top-nav',

  initialize: function() {
    _.bindAll(this, 'toggleHomeButton', 'render');
    this.template = Handlebars.compile( window.headerTemplate );

    this.viewMaster = this.options.viewMaster;
    this.listenTo(this.viewMaster, 'change:currentView', this.toggleHomeButton);
  },

  render: function() {
    $(this.el).html( this.template({}) );
    this.toggleHomeButton();
    return this;
  },

  toggleHomeButton: function() {
    this.$('.nav-head').toggleClass('clickable', !this.viewMaster.onHome());
  },

  events: {
    "click .nav-head.clickable": "home",
    "click .nav-option.list": "list",
    "click .nav-option.about": "about"
  },

  home: function() {
    this.viewMaster.goToHome();
  },

  list: function() {
    if(this.viewMaster.onList()){
      this.viewMaster.goToHome();
    } else {
      this.viewMaster.goToList();
    }
  },

  about: function() {
    if(this.viewMaster.onAbout()){
      this.viewMaster.goToHome();
    } else {
      this.viewMaster.goToAbout();
    }
  }
});