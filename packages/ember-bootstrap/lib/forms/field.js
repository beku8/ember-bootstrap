var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-group'],
  labelCache: undefined,
  template: Ember.Handlebars.compile([
    '{{#if view.label}}{{view view.labelView viewName="labelView"}}{{/if}}',
    '<div {{bindAttr class="view.label:controls view.iconSpanView:input-append"}}>',
    '  {{view view.inputField viewName="inputField"}}',
    '  {{view view.errorsView}}',
    '</div>'].join("\n")),
  itemBinding: 'controller.content',
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
  	if (!Ember.isEmpty(parentViewItemReversePropertyBinding)) {
  		parentViewItemReversePropertyBinding.disconnect(this);
  		//delete this.parentViewItemReversePropertyBinding;
  		this.set('parentViewItemReversePropertyBinding', null);
  	}
  	var name = this.get('name');
  	var item = this.get('item');
  	if (!Ember.isEmpty(item) && !Ember.isEmpty(name)) {
  		this.removeObserver('item.' + name);
  	}
  },
  
  nameChanged: function() {
  	this.cleanUp();
  	var name = this.get('name');
  	var item = this.get('item');
  	if (!Ember.isEmpty(item) && !Ember.isEmpty(name)) {
		this.addObserver('item.' + name, function() {
			this.validate();
		});
	  	this.set('value', item.get(name));
	  	this.validate(); //trigger validation
	  	this.set('parentViewItemReversePropertyBinding', Ember.bind(this, 'value', 'item.' + name)); 	
		Ember.run.sync(); // synchronize bindings
  	}
  }.observes('name'),
 
  label: Ember.computed(function(key, value) {
    if(arguments.length === 1){
      if(this.get('labelCache') === undefined){
        var path = this.get('valueBinding._from');
        if (path) {
          path = path.split(".");
          return path[path.length - 1];
        }
      } else {
        return this.get('labelCache');
      }
    } else {
      this.set('labelCache', value);
      return value;
    }
  }).property('valueBinding'),

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

	inputElementId: 'for',
    forBinding: 'parentView.name', //'inputElementId'
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

      if (!Ember.isEmpty(parent)) {
      	var item = parent.get('item');
        var name = parent.get('name');
        
        if (!Ember.isEmpty(item) && !item.get('isValid')) {
          var errors = item.get('errors.' + name + '.messages');
          
          if (!Ember.isEmpty(errors)/* && name in errors*/) {
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
    if (Ember.isEmpty(item)) {
      return;
    }

	var errors = item.get('errors');
	if (!Ember.isEmpty(errors)) {          
    	errors.clear();
    }
    if(item.validate) {
    	item.validate();
    	item.notifyPropertyChange('isValid');
    } else {
    	debugger;
    }
  },

  didInsertElement: function() {
    this.set('labelView.inputElementId', this.get('inputField.elementId'));
  	Ember.run.next(this, function() {
		this.nameChanged();
	});    
  }
});
