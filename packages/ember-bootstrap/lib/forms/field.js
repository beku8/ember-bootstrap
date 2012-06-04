Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  template: Ember.Handlebars.compile('<div class="control-group">\
    {{view labelView}}\
    <div class="controls">\
      {{view inputField}}\
      {{view errorsView}}\
    </div>\
  </div>'),
  parentViewItemName: 'item',
  
  init: function() {
    this._super();
  },
  
  destroy: function() {
	this.cleanUp();
    this._super();
  },

  parentViewItemPropertyBinding: null,
  parentViewItemReversePropertyBinding: null,
	  
  valueDidChange: function() {
  	var name = this.get('name');
    this.set('isValid', !this.checkForPropertyError(name));	
    var parent = this.get('parentView');	   
	if (!Ember.empty(parent)) {
  		parent.notifyPropertyChange('isErroneous');
  	}    
  },
   
  cleanUp: function(){
  	if (!Ember.empty(this.parentViewItemPropertyBinding)) {
  		this.parentViewItemPropertyBinding.disconnect(this);
  	}
  	if (!Ember.empty(this.parentViewItemReversePropertyBinding)) {
  		this.parentViewItemReversePropertyBinding.disconnect(this);
  	}  	
  	var name = this.get('name');
  	var obj = this.getPath('parentView.' + this.get('parentViewItemName'));
  	if (!Ember.empty(obj) && !Ember.empty(name)) {
  		Ember.removeObserver(obj, name, this, 'valueDidChange');
  	}
  },
  
  nameChanged: function() {
  	this.cleanUp();
  	var name = this.get('name');
  	var obj = this.getPath('parentView.' + this.get('parentViewItemName'));
  	if (!Ember.empty(obj) && !Ember.empty(name)) {
	  	Ember.addObserver(obj, name, this, 'valueDidChange');
	  	this.set('value', obj.get(name));
	  	this.parentViewItemReversePropertyBinding = Ember.bind(this, 'parentView.' + this.get('parentViewItemName') + '.' + name, 'value'); 	
		Ember.run.sync(); // synchronize bindings
		this.valueDidChange(); //do validation
  	}
  }.observes('name'),

  didInsertElement: function () {
  	Ember.run.next(this, function() {
		this.nameChanged();
	});
  },
 
  labelView: Ember.View.extend({
    tagName: 'label',
    classNames: ['control-label'],
    template: Ember.Handlebars.compile('{{value}}'),

    value: Ember.computed(function(key, value) {
      var parent = this.get('parentView');

      if (value && value != parent.get('label')) {
        parent.set('label', value);
      } else {
        value = parent.get('label');
      }

      return Bootstrap.Forms.human(value);
    }).property('parentView.label'),

    forBinding: 'parentView.name',
    attributeBindings: ['for']
  }),

  inputField: Ember.View.extend({
    classNames: ['ember-bootstrap-extend'],
    tagName: 'div',
    template: Ember.Handlebars.compile('') //'This class is not meant to be used directly, but extended.'
  }),

  errorsView: Ember.View.extend({
    tagName: 'div',
    classNames: ['errors', 'help-inline'],

    _updateContent: function() {
      parent = this.get('parentView');

      if (parent !== null) {
        name = parent.get('name');

        if (!parent.get('isValid')) {
          errorsMessages = parent.getPath('parentView.' + parent.get('parentViewItemName') + '.errors.messages');

          if (!Ember.empty(errorsMessages) && errorsMessages.has(name)) {
            parent.$().find('.control-group').addClass('error')
            this.$().html(errorsMessages.get(name).join(', '));
          } else {
            parent.$().find('.control-group').removeClass('error')
            this.$().html('');
          }
        } else {
          parent.$().find('.control-group').removeClass('error')
          this.$().html('');
        }
      }
    }.observes('parentView.name', 'parentView.isValid')
  }),
  
  checkForPropertyError: function(propertyName) {
		var obj = this.getPath('parentView.' + this.get('parentViewItemName'));
		if (Ember.empty(obj)) {
			return false;
		}
		var errorMessages = obj.getPath('errors.messages');
		if (Ember.empty(errorMessages)) {
			return false;
		}		
		obj.get('validators').forEach(function(validator) {
			if (validator.attribute === propertyName) {
		  		validator.fn.call(obj, validator.meta.key(obj.constructor), obj.get(validator.attribute), validator.options);
			}
		});
		errorMessages = obj.getPath('errors.messages');
		var hasErrorState = errorMessages.has(propertyName);
		return hasErrorState; 
	}  
});
