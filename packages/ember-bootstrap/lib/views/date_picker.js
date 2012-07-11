var get = Ember.get;

//requires Date Format http://stevenlevithan.com/assets/misc/date.format.js

Bootstrap.DatePicker = Ember.TextField.extend({
   	format: 'dd-mm-yyyy',
   	language: 'nl',
   	data: null,
    attributeBindings: ['data', 'name', 'format', 'type', 'value', 'readonly'],
    
	value: function() {
	  	var data = this.get('data');
		if (Ember.typeOf(data) === 'date') {
			return data.format(this.get('format'));
		}
		return data;
	}.property('data'),
  	  	
  	didInsertElement: function() {
        this._super();
        var self = this;  	
		Ember.run.schedule('actions', this, function() {
			self.$().datepicker({
            	format: self.get('format'),
            	language: self.get('language')
        	}).on('changeDate', function(ev) {
        		self.set('data', ev.date);
     		});
		});
    }
});
