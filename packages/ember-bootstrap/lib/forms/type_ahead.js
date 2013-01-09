require("ember-bootstrap/views/type_ahead");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.TypeAhead = Bootstrap.Forms.Field.extend({
  minLength: 1, //The max number of items to display in the dropdown.
  items: 8, //The minimum character length needed before triggering autocomplete suggestions
  
  url: '/autocomplete', 
  labelProperty: 'label',
  idProperty: 'id',

  inputField: Bootstrap.TypeAhead.extend(Bootstrap.StyleSupport, {
    minLengthBinding: 'parentView.minLengthBinding',
    itemsBinding: 'parentView.items',
    
    valueIdBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name'],
    autofocusBinding: 'parentView.autofocus',
    urlBinding: 'parentView.url',
    idPropertyBinding: 'parentView.idProperty',
    labelPropertyBinding: 'parentView.labelProperty',
    disabledBinding: 'parentView.disabled',
    styleBinding: 'parentView.style',

    updater: function(id, label) {
      var parent = this.get('parentView');
      if (parent.updater) {
        return parent.updater(id, label);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getLabel: function(item) {
      var parent = this.get('parentView');
      if (!Ember.empty(parent) && parent.getLabel) {
        return parent.getLabel(item);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getLabelById: function(id) {
      var parent = this.get('parentView');
      if (!Ember.empty(parent) && parent.getLabelById) {
        return parent.getLabelById(id);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getId: function(item) {
      var parent = this.get('parentView');
      if (!Ember.empty(parent) && parent.getId) {
        return parent.getId(item);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getQueryPromise: function (query) {
      var parent = this.get('parentView');
      if (!Ember.empty(parent) && parent.getQueryPromise) {
        return parent.getQueryPromise(query);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  })
});
