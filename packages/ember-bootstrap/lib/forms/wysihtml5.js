require("ember-bootstrap/views/wysihtml5");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Wysihtml5 = Bootstrap.Forms.Field.extend({

  inputField: Bootstrap.Wysihtml5.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name'],
    autofocusBinding: 'parentView.autofocus'
  })
});
