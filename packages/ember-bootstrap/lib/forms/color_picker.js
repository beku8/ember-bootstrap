require("ember-bootstrap/forms/field");
require("ember-bootstrap/views/color_picker");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.ColorPicker = Bootstrap.Forms.Field.extend({
  format: 'rgb',

  inputField: Bootstrap.ColorPicker.extend({
    formatBinding: 'parentView.format',
    
    disabledBinding: 'parentView.disabled',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    valueBinding: 'parentView.value'
  })
});


