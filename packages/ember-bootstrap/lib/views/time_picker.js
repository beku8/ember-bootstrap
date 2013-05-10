require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.TimePicker = Ember.View.extend({
  //template: 'dropdown',
  minuteStep: 1,
  showSeconds: false,
  secondStep: 15,
  defaultTime: 'value',
  showMeridian: false,
  showInputs: true,
  //disableFocus: false,
  //modalBackdrop: false,

  classNames: 'input-append bootstrap-timepicker-component',
  attributeBindings: ['name'],
  template: Ember.Handlebars.compile([
    '{{view view.inputField}}',
    '<span class="add-on">',
    '  <i class="icon-time"></i>',
    '</span>'].join("\n")),

  inputField: Ember.TextField.extend(/*Bootstrap.FocusSupport,*/ {
    classNames: 'timepicker-default',
    attributeBindings: ['name', 'type', 'value', 'readonly'],
    valueBinding: 'parentView.value',
    disabledBinding: 'parentView.disabled'
  }),

  didInsertElement: function() {
    this._super();
    var self = this;
    Ember.run.schedule('actions', this, function() {
      $(self.$().children()[0]).timepicker({
        //template: self.get('template'),
        minuteStep: self.get('minuteStep'),
        showSeconds: self.get('showSeconds'),
        secondStep: self.get('secondStep'),
        defaultTime: self.get('defaultTime'),
        showMeridian: self.get('showMeridian'),
        showInputs: self.get('showInputs')/*,
        disableFocus: self.get('disableFocus'),
        modalBackdrop: self.get('modalBackdrop')*/
      });
    });
  },

  willDestroyElement: function() {
    var widget = $(this.$().children()[0]).data('timepicker').$widget;
    Ember.run.schedule('actions', this, function() {
      //cleanup
      widget.remove();
    });
  }
});
