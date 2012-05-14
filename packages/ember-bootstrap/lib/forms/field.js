Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  template: Ember.Handlebars.compile('<div class="control-group">\
    {{view labelView}}\
    <div class="controls">\
      {{view inputField}}\
      {{view errorsView}}\
    </div>\
  </div>'),
	
  label: null,
  name: null,	
  isValid: true,
  value: null,
  
  nameChanged: function() {
  	var name = this.get('name');
  	var obj = this.getPath('parentView.item');
  	if (!Ember.empty(obj)) {
	  	Ember.addObserver(obj, name, this, function() { 
	  		this.set('isValid', !this.checkForPropertyError(name));			
	  	});
	  	Ember.bind(this, "parentView.item." + name, "value");
  	}
  }.observes('name'),

  didInsertElement: function () {
	this.nameChanged();
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
    template: Ember.Handlebars.compile('This class is not meant to be used directly, but extended.')
  }),

  errorsView: Ember.View.extend({
    tagName: 'div',
    classNames: ['errors', 'help-inline'],

    _updateContent: function() {
      parent = this.get('parentView');

      if (parent !== null) {
        name = parent.get('name');

        if (!parent.get('isValid')) {
          errorsMessages = parent.getPath('parentView.item.errors.messages');

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
		var obj = this.getPath('parentView.item');
		var errorMessages = obj.getPath('errors.messages');
		obj.get('validators').forEach(function(validator) {
			if (validator.attribute === propertyName) {
		  		validator.fn.call(obj, validator.meta.key(obj.constructor), obj.get(validator.attribute), validator.options);
			}
		});
		var hasErrorState = errorMessages.has(propertyName);
		return hasErrorState; 
	}  
});