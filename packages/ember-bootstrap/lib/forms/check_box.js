require("ember-bootstrap/forms/field");
require("ember-bootstrap/mixins/focus_support");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Checkbox = Bootstrap.Forms.Field.extend(Bootstrap.FocusSupport, {

  inputField: Ember.Checkbox.extend({
    checkedBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name', 'type', 'checked', 'disabled', 'tabindex'],
    hasFocusBinding: 'parentView.hasFocus'
  })
});
