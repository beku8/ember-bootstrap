require("ember-bootstrap/forms/field");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Checkbox = Bootstrap.Forms.Field.extend({

  inputField: Ember.Checkbox.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name']
  })
});
