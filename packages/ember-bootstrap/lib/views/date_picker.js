var get = Ember.get;
var Bootstrap = window.Bootstrap;

//requires Date Format http://stevenlevithan.com/assets/misc/date.format.js

Bootstrap.DatePicker = Ember.TextField.extend({
   	format: 'dd-mm-yyyy',
   	language: 'nl',
   	autoclose: true,
   	data: null,
    attributeBindings: ['data', 'name', 'format', 'type', 'value', 'readonly'],
    
	value: function(key, value) {
    	if (arguments.length === 1) { // getter
		  	var data = this.get('data');
			if (Ember.typeOf(data) === 'date' && !isNaN(data)) {
				return data.format(this.get('format'));
			}
			if (!Ember.empty(data) && !isNaN(new Date(data))) { //try to make date
				return (new Date(data)).format(this.get('format'));
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
    }
});
