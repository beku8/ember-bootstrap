require("ember-bootstrap/views/wysihtml5");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Wysihtml5 = Bootstrap.Forms.Field.extend({

  inputField: Bootstrap.Wysihtml5.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    styleBinding: 'parentView.style',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name', 'style'],
    autofocusBinding: 'parentView.autofocus'
  })
});
