var Bootstrap = window.Bootstrap;
Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-group'],
  template: Ember.Handlebars.compile([
    '{{view view.labelView}}',
    '<div class="controls">',
    '  {{view view.inputField}}',
    '  {{view view.errorsView}}',
    '</div>'].join("\n")),
  parentViewItemName: 'item',
  isValid: true,
  
  init: function() {
    this._super();
  },
  
  willDestroyElement: function() {
	this.cleanUp();
    this._super();
  },

  parentViewItemReversePropertyBinding: null,
	  
  valueDidChange: function() {
  	var name = this.get('name');
  	var oldIsValidValue = this.get('isValid');
  	var newIsValidValue = this.isPropertyValid(name);
    this.set('isValid', newIsValidValue);
    var parent = this.get('parentView');
	if (!Ember.empty(parent) && !Ember.isEqual(oldIsValidValue, newIsValidValue)) {
  		parent.notifyPropertyChange('isNotValid');
  	}
  },

  cleanUp: function(){
  	if (!Ember.empty(this.parentViewItemReversePropertyBinding)) {
  		this.parentViewItemReversePropertyBinding.disconnect(this);
  	}  	
  	this.removeObserver('parentView.' + this.get('parentViewItemName') + "." + this.get('name'));
  },
  
  nameChanged: function() {
  	this.cleanUp();
  	var name = this.get('name');
  	var obj = this.get('parentView.' + this.get('parentViewItemName'));
  	if (!Ember.empty(obj) && !Ember.empty(name)) {
		this.addObserver('parentView.' + this.get('parentViewItemName') + "." + name, function() {
			this.valueDidChange();
		});
	  	//Ember.addObserver(obj, name, this, 'valueDidChange');
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

      if (value && value !== parent.get('label')) {
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
      var parent = this.get('parentView');

      if (parent !== null) {
      	var context = parent.get('bindingContext');
        var name = parent.get('name');
        
        if (context !== null && !context.get('isValid')) {
          var errors = context.get('errors');
          
          if (errors !== undefined && name in errors) {
            parent.$().addClass('error');
            this.$().html(errors[name].join(', '));
          } else {
            parent.$().removeClass('error');
            this.$().html('');
          }          
        } else {
          parent.$().removeClass('error');
          this.$().html('');
        }

        /*if (!parent.get('isValid')) {
		  var errors = parent.get('parentView.' + parent.get('parentViewItemName') + '.errors.' + name + '.messages');

          if (!Ember.empty(errors)) {
            parent.$().find('.control-group').addClass('error')
            this.$().html(errors.join(', '));
          } else {
            parent.$().removeClass('error');
            this.$().html('');
          }
        } else {
          parent.$().removeClass('error');
          this.$().html('');
        }*/
      }
    }.observes('parentView.name', 'parentView.isValid')
  }),
  
  isPropertyValid: function(propertyName) {
		var obj = this.get('parentView.' + this.get('parentViewItemName'));
		if (Ember.empty(obj)) {
			return true;
		}
			
		obj.get('errors').clear();
		obj.validate();
		
		return Ember.empty(obj.get('errors.' + propertyName + '.messages'));
	}  
});
