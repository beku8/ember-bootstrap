require("ember-bootstrap/mixins/text_support");

var Bootstrap = window.Bootstrap;
Bootstrap.Forms.TextField = Bootstrap.Forms.Field.extend({
  type: 'text',

  inputField: Ember.TextField.extend(Bootstrap.TextSupport, {
    typeBinding: 'parentView.type',
    sizeBinding: 'parentView.size',
    
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
