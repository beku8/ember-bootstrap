require("ember-bootstrap/views/label");

Bootstrap.Forms.Label = Bootstrap.Forms.Field.extend({

  inputField: Bootstrap.Label.extend({
    contentBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name']
  })
});
