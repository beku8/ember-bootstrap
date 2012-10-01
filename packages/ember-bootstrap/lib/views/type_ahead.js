require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.TypeAhead = Ember.TextField.extend(Bootstrap.FocusSupport, { 	
	url: '/autocomplete', 
	labelProperty: 'label',
	idProperty: 'id',

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
			  			self.getQueryPromise(query)
                			.done(function (data) {
								labels = [];
						  		mapped = {};

								$.each(data, function (i, item) {
									var label = self.getLabel(item);
									mapped[label] = self.getId(item);
									labels.push(label);
								});

						  		process(labels);
                			});
					}
			  	},
				updater: function (item) {
					self.set('valueId', mapped[item]);
					return item;
			  	}
			});
		});
    },
    
    getLabel: function(item) {
		var parent = this.get('parentView');
		if (!Ember.empty(parent) && parent.getLabel) {
			return parent.getLabel(item);
		} else {
			return Ember.get(item, this.get('labelProperty'));
		}
    },
    
    getId: function(item) {
 		var parent = this.get('parentView');
		if (!Ember.empty(parent) && parent.getId) {
			return parent.getId(item);
		} else {
			return Ember.get(item, this.get('idProperty'));
		}   
    },
    
	getQueryPromise: function (query) {
		var parent = this.get('parentView');
		if (!Ember.empty(parent) && parent.getQueryPromise) {
			return parent.getQueryPromise(query);
		} else {
			return $.get(this.get('url'), { q: query });
		}
	}
});
