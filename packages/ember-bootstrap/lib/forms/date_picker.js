require("ember-bootstrap/forms/field");

/*Bootstrap.DatePicker = Ember.TextField.extend({
	attributeBindings: ['type', 'value', 'size', 'data-date-format', 'data-date-language'],
	data-date-format: 'dd-mm-yyyy',
	data-date-language: 'nl'
});*/

Bootstrap.Forms.DatePicker = Bootstrap.Forms.Field.extend({
  dataDateFormat: 'dd-mm-yyyy',
  dataDateLanguage: 'nl',

  inputField: Ember.TextField.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    dataDateFormatBinding: 'parentView.dataDateFormat',
	dataDateLanguageBinding: 'parentView.dataDateLanguage',
    attributeBindings: ['name', 'dataDateFormat', 'dataDateLanguage'],
    
	didInsertElement: function() {
      this.$().datepicker();
    }
  })
});


