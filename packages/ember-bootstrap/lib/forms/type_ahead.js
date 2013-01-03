require("ember-bootstrap/views/type_ahead");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.TypeAhead = Bootstrap.Forms.Field.extend({

  inputField: Bootstrap.TypeAhead.extend({
    valueIdBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name'],
    autofocusBinding: 'parentView.autofocus',
    urlBinding: 'parentView.url',
    idPropertyBinding: 'parentView.idProperty',
    labelPropertyBinding: 'parentView.labelProperty',
    disabledBinding: 'parentView.disabled'
  })
});
