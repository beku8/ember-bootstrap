require("ember-bootstrap/views/type_ahead");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.TypeAhead = Bootstrap.Forms.Field.extend({
	dataset_name: undefined,
	dataset_valueKey: 'value', 
	dataset_limit: 5,
	dataset_template: undefined,
	dataset_engine: undefined,
	dataset_header: undefined, 
	dataset_footer: undefined,
	dataset_local: undefined, 
	dataset_prefetch: undefined,
	dataset_remote: undefined,

  inputField: Bootstrap.TypeAhead.extend(Bootstrap.StyleSupport, {
    dataset_nameBinding: 'parentView.dataset_name', 
    dataset_valueKeyBinding: 'parentView.dataset_valueKey', 
    dataset_limitBinding: 'parentView.dataset_limit', 
    dataset_templateBinding: 'parentView.dataset_template', 
    dataset_engineBinding: 'parentView.dataset_engine', 
    dataset_headerBinding: 'parentView.dataset_header', 
    dataset_footerBinding: 'parentView.dataset_footer', 
    dataset_localBinding: 'parentView.dataset_local',
    dataset_prefetchBinding: 'parentView.dataset_prefetch',
    dataset_remoteBinding: 'parentView.dataset_remote',
		
    styleBinding: 'parentView.style',
		disabledBinding: 'parentView.disabled',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    //valueBinding: 'parentView.value',
    autofocusBinding: 'parentView.autofocus',
		
		target: function () {
        return this.get('parentView');
    }.property('parentView')
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
