require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Wysihtml5 = Ember.TextArea.extend(Bootstrap.FocusSupport, {
	fontStyles: true,
	emphasis: true,
	lists: true,
	html: false,
	link: false,
	image: false,
	color: true,
	stylesheets: false,

	didInsertElement: function() {
        this._super();
        var self = this;
        Ember.run.schedule('actions', this, function() {
            self.$().wysihtml5({
				"font-styles": self.get('fontStyles'), //Font styling, e.g. h1, h2, etc. Default true
				"emphasis": self.get('emphasis'), //Italics, bold, etc. Default true
				"lists": self.get('lists'), //(Un)ordered lists, e.g. Bullets, Numbers. Default true
				"html": self.get('html'), //Button which allows you to edit the generated HTML. Default false
				"link": self.get('link'), //Button to insert a link. Default true
				"image": self.get('image'), //Button to insert an image. Default true
				"color": self.get('color'), //Button to change color of font
				"stylesheets": self.get('stylesheets'),
                "events": {
                    "change": function( ) {
                        var value = self.$().val();
                        self.set('value', value);
                    }
                }
            });
        });
    },
    
	willDestroyElement: function() {
		this._super(); 
		//HUGE MEMORY LEAK!!!!!!
	},
    
    valueChanged: function() {
    	var value = this.get('value');
    	//Ember.logger.log('Wysihtml: %s', value);
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
