var Bootstrap = window.Bootstrap;

Bootstrap.FocusSupport = Ember.Mixin.create({
  attributeBindings: ['autofocus'], //HTML5 autofocus see http://diveintohtml5.info/forms.html#autofocus

  didInsertElement: function() {
    this._super();
    if (this.get('autofocus')) {
      Ember.run.schedule('actions', this, function() {
      	this.$().focus();
      });
    }
  }
});
