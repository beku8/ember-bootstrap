require("ember-bootstrap/views/wysiwyg");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Wysiwyg = Bootstrap.Forms.Field.extend({

  inputField: Bootstrap.Wysiwyg.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    styleBinding: 'parentView.style',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name', 'style'],
    autofocusBinding: 'parentView.autofocus',
    disabledBinding: 'parentView.disabled',
    editorViewClassNamesBinding: 'parentView.editorViewClassNames'
  })
});
