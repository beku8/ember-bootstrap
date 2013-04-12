require("ember-bootstrap/mixins/item_selection_support");
require("ember-bootstrap/views/button_group");

var get = Ember.get, set = Ember.set;
var Bootstrap = window.Bootstrap;

Bootstrap.RadioButtonGroup = Bootstrap.ButtonGroup.extend({
  selection: null,

  init: function() {
    this._super();
    var content = get(this, 'content');
    if (content && get(this, 'allowsEmptySelection') === false) {
      set(this, 'selection', content.get('firstObject'));
    }
  },

  itemViewClass: Ember.View.extend(Bootstrap.ItemSelectionSupport, {
    classNames: 'btn',
    tagName: 'a',
    template: Ember.Handlebars.compile('{{view.title}}')
  })
});

Bootstrap.Radio = Ember.View.extend(Bootstrap.ItemViewTitleSupport, {
    classNames: ['radio'],
    tagName: 'label',
    attributeBindings: ['title'],

    init: function () {
        this._super();
        this.on("change", this, this._updateElementValue);
    },

    destroy: function() {
        this._super();
        this.off("change", this, this._updateElementValue);
    },

    _updateElementValue: function () {
        this.set('parentView.value', this.get('radioValue'));
    },

    checked: function () {
        return Ember.isEqual(this.get('parentView.value'), this.get('radioValue'));
    }.property('parentView.value', 'radioValue'),

    radioName: function () {
        return '%@_%@'.fmt(Ember.guidFor(this.get('parentView')), this.get('radioValue'));
    }.property('parentView', 'radioValue'),

    radioLabel: function() {
        var labelProp = this.get('parentView.itemLabelProperty');
        return this.get('content.%@'.fmt(labelProp));
    }.property('content', 'parentView.itemLabelProperty'),

    radioValue: function () {
        var valueProp = this.get('parentView.itemValueProperty');
        return this.get('content.%@'.fmt(valueProp));
    }.property('content', 'parentView.itemValueProperty'),

    template: Ember.Handlebars.compile('<input type="radio" {{bindAttr name="view.radioName" value="view.radioValue" checked="view.checked"}}> {{view.radioLabel}}')
});

//usage: {{view Bootstrap.RadiosGroup contentBinding="controller.questions" valueBinding="controller.checkedQuestionId"}}
Bootstrap.RadioGroup = Ember.CollectionView.extend({
    itemViewClass: Bootstrap.Radio,
    valueBinding: null,
    contentBinding: null,
    itemLabelProperty: 'description',
    itemValueProperty: 'id'
});

