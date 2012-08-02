Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  template: Ember.Handlebars.compile('<div class="control-group">\
    {{view view.labelView}}\
    <div class="controls">\
      {{view view.inputField}}\
      {{view view.errorsView}}\
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
  	var oldIsValidValue = this.get('isValid');
  	var newIsValidValue = this.isPropertyValid(name);
    this.set('isValid', newIsValidValue);	
    var parent = this.get('parentView');	   
	if (!Ember.empty(parent) && !Ember.isEqual(oldIsValidValue, newIsValidValue)) {
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
	  	this.valueDidChange(); //do validation
	  	this.parentViewItemReversePropertyBinding = Ember.bind(this, 'value', 'parentView.' + this.get('parentViewItemName') + '.' + name); 	
		Ember.run.sync(); // synchronize bindings
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
    template: Ember.Handlebars.compile('{{view.value}}'),

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
        	//errors/*Messages*/ = parent.getPath('parentView.' + parent.get('parentViewItemName') + '.errors'/*.messages'*/);
			errors = parent.getPath('parentView.' + parent.get('parentViewItemName') + '.errors.' + name + '.messages');

          if (!Ember.empty(errors/*Messages*/) /*&& errorsMessages.has(name)*/) {
            parent.$().find('.control-group').addClass('error')
            this.$().html(errors/*Messages.get(name)*/.join(', '));
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
  
  isPropertyValid: function(propertyName) {
		var obj = this.getPath('parentView.' + this.get('parentViewItemName'));
		if (Ember.empty(obj)) {
			return true;
		}
		
		/*var errors = obj.getPath('errors');
		if (Ember.empty(errors)) {
			return true;
		}	
		
		var errorMessages = errors.get('messages');
		errorMessages.remove(propertyName);	
		obj.get('validators').forEach(function(validator) {
			if (validator.attribute === propertyName) {
		  		validator.fn.call(obj, validator.meta.key(obj.constructor), obj.get(validator.attribute), validator.options);
			}
		});
		
		errorMessages = errors.get('messages');*/
		
		obj.get('errors').clear();
		obj.validate();
		
		return Ember.empty(obj.getPath('errors.' + propertyName + '.messages'));
	}  
});
