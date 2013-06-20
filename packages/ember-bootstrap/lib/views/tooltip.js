var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Tooltip = Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['data-toggle', 'title', 'data-animation', 'data-html', 'data-placement', 'data-selector', 'data-trigger', 'data-title', 'data-trigger', 'data-delay', 'data-container'],

  'data-toggle': 'tooltip',
  'data-animation': true, //apply a css fade transition to the tooltip
  'data-html': false, //Insert html into the popover. If false, jquery's text method will be used to insert content into the dom. Use text if you're worried about XSS attacks.
  'data-placement': 'right', //how to position the popover - top | bottom | left | right
  'data-selector': false, //if a selector is provided, tooltip objects will be delegated to the specified targets
  'data-trigger': 'click', //how popover is triggered - click | hover | focus | manual
  'data-title': '', //default title value if `title` attribute isn't present
  'data-trigger': 'hover focus', //how tooltip is triggered - click | hover | focus | manual. Note you case pass trigger mutliple, space seperated, trigger types.
  'data-delay': 0, //delay showing and hiding the tooltip (ms) - does not apply to manual trigger type If a number is supplied, delay is applied to both hide/show Object structure is: delay: { show: 500, hide: 100 }
  'data-container': false, //Appends the tooltip to a specific element container: 'body'

  didInsertElement: function () {
    var self = this;
    Ember.run.schedule('actions', this, function () {
      self.$().tooltip();
    });
  },

  willDestroyElement: function () {
    this.$().tooltip('destroy');
  }
});
