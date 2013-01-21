require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

//requires Date Format http://stevenlevithan.com/assets/misc/date.format.js

Bootstrap.DatePicker = Ember.TextField.extend(/*Bootstrap.TextSupport,*/ Bootstrap.FocusSupport, {
  format: 'dd-mm-yyyy',
  language: 'nl',
  autoclose: true,

  attributeBindings: ['name', 'type', 'value', 'readonly'],

  value: function(key, value) {
    var datepicker = (this.state ===  'inDOM') && this.$() ? this.$().data('datepicker') : undefined;
    if (arguments.length === 1) { // getter
      if (!Ember.isEmpty(datepicker)) {
        return new ISO8601Date(datepicker.getDate());
      }
      return null;
    } else { // setter
      if (!Ember.isEmpty(value) && !Ember.isEmpty(datepicker)) {
        if (Ember.typeOf(value) === 'date' && !isNaN(value)) {
          datepicker.setDate(value);
          return date;
        } else if (Ember.typeOf(value) === 'string') {
          var format = this.get('format');
          if (format.length === value.length) { //assume datepicker has set the date
            var date = $.fn.datepicker.DPGlobal.parseDate(
              value, 
              $.fn.datepicker.DPGlobal.parseFormat(format), 
              this.get('language'));
            if (!isNaN(date)) {
              //datepicker.setDate(date); //so don't need to set the date again
              return date;
            }
          } else {
            var date = new ISO8601Date(value);
            if (!isNaN(date)) { //try to make date
              datepicker.setDate(date);
              return date;
            }
          }
        }
      }
      return value;
    }
  }.property(),

  didInsertElement: function() {
    this._super();
    var self = this;
    Ember.run.schedule('actions', this, function() {
      self.$().datepicker({
        format: self.get('format'),
        language: self.get('language'),
        autoclose: self.get('autoclose')
      }).on('changeDate', function(ev) {
        //self.set('value', ev.date);
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
