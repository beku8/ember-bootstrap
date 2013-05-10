require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.ColorPicker = Ember.View.extend({
  format: 'rgb',

  classNames: 'input-append color',
  attributeBindings: ['name', 'data-color', 'data-color-format'],
  template: Ember.Handlebars.compile([
    '{{view view.inputField}}',
    '<span class="add-on">',
    '  <i {{bindAttr style="view.iStyle"}}></i>',
    '</span>'].join("\n")),

  iStyle: function() {
    return 'background-color:' + this.get('value');
  }.property('value'),
  
  'data-colorBinding': 'value',

  inputField: Ember.TextField.extend(/*Bootstrap.FocusSupport,*/ {
    attributeBindings: ['name', 'type', 'value', 'readonly'],
    valueBinding: 'parentView.value',
    disabledBinding: 'parentView.disabled'
  }),

  didInsertElement: function() {
    var self = this;
    Ember.run.next(/*schedule('actions', this,*/ function() {
      self.$().colorpicker({format: self.get('format')});
    });
  },
  
  willDestroyElement: function() {
    var picker = this.$().data('colorpicker').picker;
    Ember.run.schedule('actions', this, function() {
      //cleanup
      picker.remove();
    });
  }
});

