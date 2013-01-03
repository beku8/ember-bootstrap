require("ember-bootstrap/forms/field");
require("ember-bootstrap/views/date_picker");
require("ember-bootstrap/mixins/text_support");
require("ember-bootstrap/mixins/focus_support");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.DatePicker = Bootstrap.Forms.Field.extend({
  format: 'dd-mm-yyyy',
  language: 'nl',
  autoclose: true,

  inputField: Bootstrap.DatePicker.extend({
    formatBinding: 'parentView.format',
    languageBinding: 'parentView.language',
    autocloseBinding: 'parentView.autoclose',

    disabledBinding: 'parentView.disabled',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    valueBinding: 'parentView.value',
    autofocusBinding: 'parentView.autofocus'
  })
});


