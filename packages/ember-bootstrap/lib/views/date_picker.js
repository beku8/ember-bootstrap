require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

//requires Date Format http://stevenlevithan.com/assets/misc/date.format.js

Bootstrap.DatePicker = Ember.TextField.extend(/*Bootstrap.TextSupport,*/ Bootstrap.FocusSupport, {
   	format: 'dd-mm-yyyy',
   	language: 'nl',
   	autoclose: true,
   	data: null,
   	disabledBinding: 'parentView.disabled',
    attributeBindings: ['data', 'name', 'format', 'type', 'value', 'readonly'],
    
    dataChanged: function() {
		var datepicker = this.$().data('datepicker');
		if (!Ember.empty(datepicker)) {
			var data = this.get('data');
			if (Ember.typeOf(data) === 'date' && !isNaN(data)) {
				datepicker.setDate(data);
			}
			if (!Ember.empty(data) && !isNaN(new ISO8601Date(data))) { //try to make date
				datepicker.setDate(new ISO8601Date(data));
			}
		}
    }.observes('data'),
    
	value: function(key, value) {
    	if (arguments.length === 1) { // getter
		  	var data = this.get('data');
		  	//this.$().data('datepicker').setDate(data);
			if (Ember.typeOf(data) === 'date' && !isNaN(data)) {
				return data.format(this.get('format'));
			}
			if (!Ember.empty(data) && !isNaN(new ISO8601Date(data))) { //try to make date
				return (new ISO8601Date(data)).format(this.get('format'));
			}
			return data;
		} else { // setter
			var date = Ember.empty(value) ? null : $.fn.datepicker.DPGlobal.parseDate(
				value, 
				$.fn.datepicker.DPGlobal.parseFormat(this.get('format')), 
				this.get('language'));
			this.set('data', date);
			return value;
		}
	}.property('data'),
  	  	
  	didInsertElement: function() {
        this._super();
        var self = this;  	
		Ember.run.schedule('actions', this, function() {
			self.$().datepicker({
            	format: self.get('format'),
            	language: self.get('language'),
            	autoclose: self.get('autoclose')
        	}).on('changeDate', function(ev) {
        		self.set('data', ev.date);
     		});
		});
    },
    
    willDestroyElement: function() {
    	var picker = this.$().data('datepicker').picker;
		Ember.run.schedule('actions', this, function() {
			//cleanup 
			picker.remove();
		});
    }
});
