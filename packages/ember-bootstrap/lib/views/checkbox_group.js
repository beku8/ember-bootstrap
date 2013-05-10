require("ember-bootstrap/mixins/item_view_title_support");

var get = Ember.get, set = Ember.set;
var Bootstrap = window.Bootstrap;

Bootstrap.InlineCheckbox = Ember.View.extend(Bootstrap.ItemViewTitleSupport, {
    classNames: ['checkbox inline'],
    tagName: 'label',
    attributeBindings: ['title'],

    init: function () {
        this._super();
        this.on("change", this, this._updateElementValue);
    },

    destroy: function () {
        this._super();
        this.off("change", this, this._updateElementValue);
    },

    _updateElementValue: function (evt) {
        if (evt.target.checked) {
            this.get('parentView.value').pushObject(this.get('radioValue'));
        } else {
            this.get('parentView.value').removeObject(this.get('radioValue'));
        }
    },

    checked: function () {
        return this.get('parentView.value').contains(this.get('radioValue'));
    }.property('parentView.value', 'radioValue'),

    radioLabel: function () {
        var labelProp = this.get('parentView.itemLabelProperty');
        return this.get('content.%@'.fmt(labelProp));
    }.property('content', 'parentView.itemLabelProperty'),

    radioValue: function () {
        var valueProp = this.get('parentView.itemValueProperty');
        return this.get('content.%@'.fmt(valueProp));
    }.property('content', 'parentView.itemValueProperty'),

    template: Ember.Handlebars.compile('<input type="checkbox" {{bindAttr value="view.radioValue" checked="view.checked"}}> {{view.radioLabel}}')
});

Bootstrap.CheckboxGroup = Ember.CollectionView.extend({
    itemViewClass: Bootstrap.InlineCheckbox,
    valueBinding: null,
    contentBinding: null,
    itemLabelProperty: 'description',
    itemValueProperty: 'id'
});
