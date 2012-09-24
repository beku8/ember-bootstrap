var Bootstrap = window.Bootstrap;

Bootstrap.FocusSupport = Ember.Mixin.create({
  didInsertElement: function() {
    this._super();
    if (this.get('hasFocus')) {
      Ember.run.schedule('actions', this, function() {
      	this.$().focus();
      });
    }
  }
});
