/*
  Convenience wrapper view holding everything.
  
  All subviews are given the viewMaster as an option for easy manipulation
  of the global view state (not strictly necessary since the instance of the
  viewMaster is already in the global Window scope but I think it's cleaner).
*/

window.MainView = Backbone.View.extend({
  className: 'main',

  initialize: function() {
    _.bindAll(this, 'toggleSubviews', 'render', 'update');
    this.headerView = new HeaderView({
      viewMaster: this.model
    });
    this.postView = new PostView({
      model: this.model.currentPost(),
      viewMaster: this.model
    });
    this.movieInfoView = new MovieInfoView({
      model: this.model.currentPost().movie(),
      viewMaster: this.model
    });
    this.aboutView = new AboutView({
      viewMaster: this.model
    });
    this.listView = new ListView({
      collection: movies,
      viewMaster: this.model
    });

    this.listenTo(this.model, 'change:currentPostIndex', this.update);
    this.listenTo(this.model, 'change:currentView', this.toggleSubviews);
  },

  update: function() {
    this.postView.remove();
    this.movieInfoView.remove();
    this.postView = new PostView({
      model: this.model.currentPost(),
      viewMaster: this.model
    });
    this.movieInfoView = new MovieInfoView({
      model: this.model.currentPost().movie(),
      viewMaster: this.model
    });
    this.render();
  },

  render: function() {
    $(this.el).append(this.aboutView.render().el);
    $(this.el).append(this.listView.render().el);
    $(this.el).append(this.postView.render().el);
    $(this.el).append(this.movieInfoView.render().el);
    this.toggleSubviews();
    return this;
  },

  toggleSubviews: function() {
    this.$('.about').toggle(this.model.onAbout());
    this.$('.list').toggle(this.model.onList());
    this.$('.post').toggle(this.model.onHome());
    this.$('.movie-info').toggle(this.model.onHome());
    this.$('.list').toggle(this.model.onList());
  }
});