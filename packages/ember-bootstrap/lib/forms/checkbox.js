require("ember-bootstrap/mixins/focus_support");

Bootstrap.Forms.Checkbox = Bootstrap.Forms.Field.extend(Bootstrap.FocusSupport, {

  inputField: Ember.Checkbox.extend({
    attributeBindings: ['name', 'type', 'checked', 'disabled', 'tabindex'],
    checkedBinding:   'parentView.value',
    disabledBinding: 'parentView.disabled',
    autofocusBinding: 'parentView.autofocus',
    classNameBindings: ['parentView.inputFieldClassNames'],
    name: Ember.computed(function() {
      return this.get('parentView.name') || this.get('parentView.label');
    }).property('parentView.name', 'parentView.label')
  })
});
