require("ember-bootstrap/forms/field");
require("ember-bootstrap/views/date_picker");
require("ember-bootstrap/mixins/text_support");
require("ember-bootstrap/mixins/focus_support");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.DatePicker = Bootstrap.Forms.Field.extend({
  format: 'dd-mm-yyyy',
  weekStart: 1,
  calendarWeeks: false,
  startDate: -Infinity,
  endDate: Infinity,
  daysOfWeekDisabled: [],
  autoclose: true,
  startView: 'month',
  minViewMode: 'days',
  todayBtn: false,
  todayHighlight: false,
  keyboardNavigation: true,
  language: 'nl',
  forceParse: true,
  //inputs: [],
  beforeShowDay: $.noop,

  inputField: Bootstrap.DatePicker.extend({
    formatBinding: 'parentView.format',
    weekStartBinding: 'parentView.weekStart',
    calendarWeeksBinding: 'parentView.calendarWeeks',
    startDateBinding: 'parentView.startDate',
    endDateBinding: 'parentView.endDate',
    daysOfWeekDisabledBinding: 'parentView.daysOfWeekDisabled',
    formatBinding: 'parentView.format',
    autocloseBinding: 'parentView.autoclose',
    startViewBinding: 'parentView.startView',
    minViewModeBinding: 'parentView.minViewMode',
    todayBtnBinding: 'parentView.todayBtn',
    todayHighlightBinding: 'parentView.todayHighlight',
    keyboardNavigationBinding: 'parentView.keyboardNavigation',
    languageBinding: 'parentView.language',
    forceParseBinding: 'parentView.forceParse',    
    inputsBinding: 'parentView.inputs',
    beforeShowDayBinding: 'parentView.beforeShowDay',

    disabledBinding: 'parentView.disabled',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    valueBinding: 'parentView.value',
    autofocusBinding: 'parentView.autofocus'
  })
});


