require("ember-bootstrap/forms/field");

/*Bootstrap.DatePicker = Ember.TextField.extend({
	attributeBindings: ['type', 'value', 'size', 'data-date-format', 'data-date-language'],
	data-date-format: 'dd-mm-yyyy',
	data-date-language: 'nl'
});*/



Bootstrap.Forms.DatePicker = Bootstrap.Forms.Field.extend({
  dataDateFormat: 'dd-mm-yyyy',
  dataDateLanguage: 'nl',

  inputField: Ember.TextField.extend({
    //valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    dataDateFormatBinding: 'parentView.dataDateFormat',
	dataDateLanguageBinding: 'parentView.dataDateLanguage',
    attributeBindings: ['name', 'dataDateFormat:data-date-format', 'dataDateLanguage:data-date-language', 'type', 'value'],
    
	//didInsertElement: function() {
	//	Ember.run.next(this, function() {
	//		this.$().datepicker();
	//		var datepicker = this.$().data('datepicker');
	//		if (!Ember.empty(datepicker)) {
	//		    datepicker.date = this.get('value');
    //		   	datepicker.setValue();
    //		   	datepicker.update();
    //	   	}
	//	});
    //},
    
    //valueChanged: function() {
    //	var datepicker = this.$().data('datepicker');
    //	if (!Ember.empty(datepicker)) {
	//		datepicker.date = this.get('value');
    //		datepicker.setValue()grep;
    //		datepicker.update();
    //	}
  	//}.observes('value')  
  	
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
  	
  	dateBinding: 'parentView.value',
  	
  	didInsertElement: function() {
		Ember.run.next(this, function() {
			this.$().datepicker();
		});
    } 	
  })
});


