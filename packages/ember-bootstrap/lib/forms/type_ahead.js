require("ember-bootstrap/views/type_ahead");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.TypeAhead = Bootstrap.Forms.Field.extend({
	name: undefined,
	valueKey: 'value', 
	limit: 5,
	template: undefined,
	engine: undefined,
	header: undefined, 
	footer: undefined,
	local: undefined, 
	prefetch: undefined,
	remote: undefined,

  inputField: Bootstrap.TypeAhead.extend(Bootstrap.StyleSupport, {
    nameBinding: 'parentView.name', 
    valueKeyBinding: 'parentView.valueKey', 
    limitBinding: 'parentView.limit', 
    templateBinding: 'parentView.template', 
    engineBinding: 'parentView.engine', 
    headerBinding: 'parentView.header', 
    footerBinding: 'parentView.footer', 
    localBinding: 'parentView.local',
    prefetchBinding: 'parentView.prefetch',
    remoteBinding: 'parentView.remote',
		
    styleBinding: 'parentView.style',
		disabledBinding: 'parentView.disabled',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    valueBinding: 'parentView.value',
    autofocusBinding: 'parentView.autofocus'	
  })
});


/*Bootstrap.Forms.TypeAhead = Bootstrap.Forms.Field.extend({
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
      if (!Ember.isEmpty(parent) && parent.getLabel) {
        return parent.getLabel(item);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getLabelById: function(id) {
      var parent = this.get('parentView');
      if (!Ember.isEmpty(parent) && parent.getLabelById) {
        return parent.getLabelById(id);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getId: function(item) {
      var parent = this.get('parentView');
      if (!Ember.isEmpty(parent) && parent.getId) {
        return parent.getId(item);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getQueryPromise: function (query) {
      var parent = this.get('parentView');
      if (!Ember.isEmpty(parent) && parent.getQueryPromise) {
        return parent.getQueryPromise(query);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  })
});*/
