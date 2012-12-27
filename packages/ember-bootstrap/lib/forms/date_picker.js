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
    nameBinding: 'parentView.label',
    formatBinding: 'parentView.format',
    languageBinding: 'parentView.language',
    autocloseBinding: 'parentView.autoclose',
    classNameBindings: ['parentView.inputFieldClassNames'],
    valueBinding: 'parentView.value',
    autofocusBinding: 'parentView.autofocus'
  })/*,
  
  iconSpanView: Ember.ContainerView.extend({
    tagName: 'span',
    classNames: ['add-on'],
    childViews: ['iconView'],
    
    iconView: Bootstrap.Icon.extend({
      classNames: ['icon', 'icon-calendar']
    })
  })*/
});


