require("ember-bootstrap/forms/field");
require("ember-bootstrap/views/date_picker");

Bootstrap.Forms.DatePicker = Bootstrap.Forms.Field.extend({
  dataDateFormat: 'dd-mm-yyyy',
  dataDateLanguage: 'nl',

  inputField: Bootstrap.DatePicker.extend({
    nameBinding: 'parentView.label',
    dataDateFormatBinding: 'parentView.dataDateFormat',
	dataDateLanguageBinding: 'parentView.dataDateLanguage',
    classNameBindings: ['parentView.inputFieldClassNames'],
  	dateBinding: 'parentView.value'	
  })
});


