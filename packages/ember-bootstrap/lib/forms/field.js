var Bootstrap = window.Bootstrap;
Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-group'],
  template: Ember.Handlebars.compile([
    '{{#if view.label}}{{view view.labelView}}{{/if}}',
    '<div {{bindAttr class="view.label:controls"}}>',
    '  {{view view.inputField}}',
    '  {{view view.errorsView}}',
    '</div>'].join("\n")),
  itemBinding: 'bindingContext.content',
  //parentViewItemReversePropertyBinding: null,
  
  init: function() {
    this._super();
  },
  
  willDestroyElement: function() {
    this.cleanUp();
    this._super();
  },

  cleanUp: function(){
  	var parentViewItemReversePropertyBinding = this.get('parentViewItemReversePropertyBinding');
  	if (!Ember.empty(parentViewItemReversePropertyBinding)) {
  		parentViewItemReversePropertyBinding.disconnect(this);
  		//delete this.parentViewItemReversePropertyBinding;
  		this.set('parentViewItemReversePropertyBinding', null);
  	}
  	var name = this.get('name');
  	var item = this.get('item');
  	if (!Ember.empty(item) && !Ember.empty(name)) {
  		this.removeObserver('item.' + name);
  	}
  },
  
  nameChanged: function() {
  	this.cleanUp();
  	var name = this.get('name');
  	var item = this.get('item');
  	if (!Ember.empty(item) && !Ember.empty(name)) {
		this.addObserver('item.' + name, function() {
			this.validate();
		});
	  	this.set('value', item.get(name));
	  	this.validate(); //trigger validation
	  	this.set('parentViewItemReversePropertyBinding', Ember.bind(this, 'value', 'item.' + name)); 	
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

      if (!Ember.empty(parent)) {
      	var item = parent.get('item');
        var name = parent.get('name');
        
        if (!Ember.empty(item) && !item.get('isValid')) {
          var errors = item.get('errors.' + name + '.messages');
          
          if (!Ember.empty(errors)/* && name in errors*/) {
            parent.$().addClass('error');
            this.$().html(errors/*[name]*/.join(', '));
          } else {
            parent.$().removeClass('error');
            this.$().html('');
          }          
        } else {
          parent.$().removeClass('error');
          this.$().html('');
        }
      }
    }.observes('parentView.item.isValid', 'parentView.name')
  }),
  
  validate: function() {
    var name = this.get('name');
    var item = this.get('item');
    if (Ember.empty(item)) {
      return;
    }

	var errors = item.get('errors');
	if (!Ember.empty(errors)) {          
    	errors.clear();
    }
    if(item.validate) {
    	item.validate();
    	item.notifyPropertyChange('isValid');
    } else {
    	debugger;
    }
  }
});
