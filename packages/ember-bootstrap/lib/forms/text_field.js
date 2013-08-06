require("ember-bootstrap/mixins/text_support");
require("ember-bootstrap/mixins/focus_support");

Bootstrap.Forms.TextField = Bootstrap.Forms.Field.extend({
  type: 'text',

  inputField: Ember.TextField.extend(Bootstrap.TextSupport, Bootstrap.FocusSupport, {
    typeBinding: 'parentView.type',
    sizeBinding: 'parentView.size',
    autofocusBinding: 'parentView.autofocus',
    classNameBindings: ['parentView.inputFieldClassNames'],
    
    insertNewline: function(event) {
    	var parentView = this.get('parentView');
    	if (parentView.insertNewline) { 
    		return parentView.insertNewline(event); 
    	}   
    },
    
    cancel: function(event) {
    	var parentView = this.get('parentView');
    	if (parentView.cancel) { 
    		return parentView.cancel(event); 
    	}
    }
  })
});
