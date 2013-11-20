
require("ember-bootstrap/mixins/focus_support");

var Bootstrap = window.Bootstrap,
  get = Ember.get;

Bootstrap.Forms.Select = Bootstrap.Forms.Field.extend({
  optionLabelPath: 'content',
  optionValuePath: 'content',

  inputField: Ember.Select.extend(Bootstrap.FocusSupport, {
    contentBinding:         'parentView.content',

    optionLabelPathBinding: 'parentView.optionLabelPath',
    optionValuePathBinding: 'parentView.optionValuePath',

    valueBinding:           'parentView.value',
    selectionBinding:       'parentView.selection',
    promptBinding:          'parentView.prompt',
    multipleBinding:        'parentView.multiple',
    autofocusBinding:       'parentView.autofocus',
    disabledBinding:        'parentView.disabled',
    classNameBindings:      ['parentView.inputClassNames'],
    
    name: Ember.computed(function() {
      return this.get('parentView.name') || this.get('parentView.label');
    }).property('parentView.name', 'parentView.label'),
    
    _IE10AndLaterHack: function () { //doesn't fill in the selected value when content is loaded after the selection
        if (('documentMode' in document && 'atob' in window)) {//IE10+
            this.rerender();
        }
    }.observes('content.[]')
  })
});
