var get = Ember.get;

Bootstrap.DatePicker = Ember.TextField.extend({
	date: new Date(),
   	dataDateFormat: 'dd-mm-yyyy',
  	dataDateLanguage: 'nl',
    attributeBindings: ['name', 'dataDateFormat:data-date-format', 'dataDateLanguage:data-date-language', 'type', 'value'],
    
  	valueBinding: Ember.Binding.transform({
        to: function(value, binding) {  
        	if (Ember.typeOf(value) === 'date') {
        		var format = this.$().datepicker.DPGlobal.parseFormat(binding.get('dataDateFormat'));
        		return this.$().datepicker.DPGlobal.formatDate(value, 
					format, 
					binding.get('dataDateLanguage'))
        	}
            return value;
        },
        from: function(value, binding) {
			if (Ember.typeOf(value) === 'date') {
        		var format = this.$().datepicker.DPGlobal.parseFormat(binding.get('dataDateFormat'));
        		return this.$().datepicker.DPGlobal.parseDate(value, 
        			format, 
					binding.get('dataDateLanguage'));
			}
            return value;
        }
    }).from('date'),
  	  	
  	didInsertElement: function() {
        this._super();
        var self = this;  	
		Ember.run.schedule('actions', this, function() {
			self.$().datepicker();
		});
    }
});
