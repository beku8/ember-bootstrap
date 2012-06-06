var get = Ember.get;

Bootstrap.Wysihtml5 = Ember.TextArea.extend({
	didInsertElement: function() {
        this._super();
        var self = this;
        Ember.run.schedule('actions', this, function() {
            self.$().wysihtml5({
                "events": {
                    "change": function( ) {
                        var value = self.$().val();
                        self.set('value', value);
                    },
                },
            });
        });
    }
});
