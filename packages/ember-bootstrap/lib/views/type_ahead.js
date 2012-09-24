require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.TypeAhead = Ember.TextField.extend(Bootstrap.FocusSupport, { 	
	url: '/autocomplete', 

  	didInsertElement: function() {
        this._super();
        var self = this;  	
		Ember.run.schedule('actions', this, function() {
			var labels, mapped;
			self.$().typeahead({
				//https://github.com/twitter/bootstrap/pull/3682
			  	source: function (query, process) {
			  		if (self.source) {
			  			self.source(query, process);
			  		} else {
						$.get(self.get('url'), 
							{ q: query }, 
							function (data) {
						  		labels = [];
						  		mapped = {};

								$.each(data, function (i, item) {
									mapped[item.label] = item.value;
									labels.push(item.label);
								})

						  		process(labels);
						  	}
						);
					}
			  	},
				updater: function (item) {
					return mapped[item];
			  	}
			});
		});
    }
});
