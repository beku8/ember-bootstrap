Bootstrap.Forms.TextField = Bootstrap.Forms.Field.extend({

  inputField: Ember.TextField.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    disabledBinding: 'parentView.disabled',
    placeholderBinding: 'parentView.placeholder',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name', 'placeholder', 'disabled']
  })
});
