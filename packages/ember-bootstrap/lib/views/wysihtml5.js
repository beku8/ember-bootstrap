var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Wysihtml5 = Ember.TextArea.extend({
	didInsertElement: function() {
        this._super();
        var self = this;
        Ember.run.schedule('actions', this, function() {
            self.$().wysihtml5({
				"font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
				"emphasis": true, //Italics, bold, etc. Default true
				"lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
				"html": false, //Button which allows you to edit the generated HTML. Default false
				"link": true, //Button to insert a link. Default true
				"image": true, //Button to insert an image. Default true
				"color": false, //Button to change color of font
                "events": {
                    "change": function( ) {
                        var value = self.$().val();
                        self.set('value', value);
                    }
                }
            });
        });
    },
    
    valueChanged: function() {
    	var value = this.get('value');
    	console.log('Wysihtml: %s', value);
    	//var wysihtml5Editor = this.$().wysihtml5().data("wysihtml5").editor;
    	//var editorValue = wysihtml5Editor.getValue(); //DOESN'T WORK
    	var iframes = this.get('parentView').$().find('iframe').contents().find('.wysihtml5-editor');
    	var editorValue = iframes.html();
    	
    	if (!Ember.isEqual(value, editorValue)) {
    		//wysihtml5Editor.setValue(value, true); //DOESN'T WORK
			iframes.html(value);
    	}
    }.observes('value')
});
