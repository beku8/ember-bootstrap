require("ember-bootstrap/views/type_ahead");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.TypeAhead = Bootstrap.Forms.Field.extend({

  inputField: Bootstrap.TypeAhead.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name'],
    hasFocusBinding: 'parentView.hasFocus'
  })
});
