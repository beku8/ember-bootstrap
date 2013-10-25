require("ember-bootstrap/forms/field");
require("ember-bootstrap/views/datetime_picker");
require("ember-bootstrap/mixins/text_support");
require("ember-bootstrap/mixins/focus_support");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.DateTimePicker = Bootstrap.Forms.Field.extend({
  maskInput: false, // disables the text input mask
  pickDate: true, // disables the date picker
  pickTime: true, // disables de time picker
  pick12HourFormat: false, // enables the 12-hour format time picker
  pickSeconds: true, // disables seconds in the time picker
  startDate: -Infinity, // set a minimum date
  endDate: Infinity, // set a maximum date
  collapse: true,
  language: 'nl',
  format: 'dd-MM-yyyy hh:mm:ss',
  minViewMode: undefined, // 'months' or 'years'
  viewMode: undefined, // 'months' or 'years'
  weekStart: 1,

  inputField: Bootstrap.DateTimePicker.extend({
    maskInputBinding: 'parentView.maskInput',
    pickDateBinding: 'parentView.pickDate',
    pickTimeBinding: 'parentView.pickTime',
    pick12HourFormatBinding: 'parentView.pick12HourFormat',
    pickSecondsBinding: 'parentView.pickSeconds',
    startDateBinding: 'parentView.startDate',
    endDateBinding: 'parentView.endDate',
    collapseBinding: 'parentView.collapse',
    languageBinding: 'parentView.language',
    formatBinding: 'parentView.format',
    minViewModeBinding: 'parentView.minViewMode',
    viewModeBinding: 'parentView.viewMode',
    weekStartBinding: 'parentView.weekStart',

    disabledBinding: 'parentView.disabled',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    valueBinding: 'parentView.value',
    autofocusBinding: 'parentView.autofocus'
  })
});


