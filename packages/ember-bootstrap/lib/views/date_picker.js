var get = Ember.get;

Bootstrap.DatePicker = Ember.TextField.extend({
	//date: new Date(),
   	dataDateFormat: 'dd-mm-yyyy',
  	dataDateLanguage: 'nl',
    attributeBindings: ['name', 'dataDateFormat:data-date-format', 'dataDateLanguage:data-date-language', 'type', 'value'],
    
	value: Ember.computed(function(key, value) {
		// getter
		if (arguments.length === 1) {
		  	var date = this.get('date');
			if (Ember.typeOf(date) === 'date') {
        		var format = this.$().datepicker.DPGlobal.parseFormat(this.get('dataDateFormat'));
        		var value = this.$().datepicker.DPGlobal.formatDate(date, 
        			format, 
					this.get('dataDateLanguage'));
        		var datePicker = this.$().data('datepicker');
        		if (!Ember.empty(datePicker)) {
        			if (!Ember.isEqual(date, datePicker.date)) {
        				datePicker.element.prop('value', value);
        				datePicker.update();
        			}
        		}
        		return value;
			}
            return date;
		// setter
		} else {
        	if (Ember.typeOf(value) === 'string') {
        		var format = this.$().datepicker.DPGlobal.parseFormat(this.get('dataDateFormat'));
        		this.set('date', this.$().datepicker.DPGlobal.parseDate(value, 
					format, 
					this.get('dataDateLanguage')));
        	}
            return value;		  	
		}
	}).property('date'),
  	  	
  	didInsertElement: function() {
        this._super();
        var self = this;  	
		Ember.run.schedule('actions', this, function() {
			self.$().datepicker();
		});
    }
});
