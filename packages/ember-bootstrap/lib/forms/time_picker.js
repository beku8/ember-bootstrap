require("ember-bootstrap/forms/field");
require("ember-bootstrap/views/time_picker");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.TimePicker = Bootstrap.Forms.Field.extend({
  //template: 'dropdown',
  minuteStep: 1,
  showSeconds: false,
  secondStep: 15,
  defaultTime: 'value',
  showMeridian: false,
  showInputs: true,
  //disableFocus: false,
  //modalBackdrop: false,

  inputField: Bootstrap.TimePicker.extend({
    //templateBinding: 'parentView.template',
    minuteStepBinding: 'parentView.minuteStep',
    showSecondsBinding: 'parentView.showSeconds',
    secondStepBinding: 'parentView.secondStep',
    defaultTimeBinding: 'parentView.defaultTime',
    showMeridianBinding: 'parentView.showMeridian',
    showInputsBinding: 'parentView.showInputs',
    //disableFocusBinding: 'parentView.disableFocus',
    //modalBackdropBinding: 'parentView.modalBackdrop',
    
    disabledBinding: 'parentView.disabled',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    valueBinding: 'parentView.value'
  })
});


