require("ember-bootstrap/forms/field");

Bootstrap.Forms.Select = Bootstrap.Forms.Field.extend({

  inputField: Ember.Select.extend({
  	multipleBinding: 'parentView.multiple',
  	contentBinding: 'parentView.content',
    selectionBinding: 'parentView.value',
    promptBinding: 'parentView.prompt',
	optionLabelPathBinding: 'parentView.optionLabelPath',
	optionValuePathBinding: 'parentView.optionValuePath',
	classNameBindings: ['parentView.inputFieldClassNames'],
	 
	nameBinding: 'parentView.label',
    attributeBindings: ['name']
  })
});
