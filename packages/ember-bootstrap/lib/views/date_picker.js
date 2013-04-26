require("ember-bootstrap/mixins/focus_support");
require("ember-bootstrap/mixins/text_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

//requires Date Format http://stevenlevithan.com/assets/misc/date.format.js

Bootstrap.DatePicker = Ember.TextField.extend(Bootstrap.TextSupport, Bootstrap.FocusSupport, {
  format: 'dd-mm-yyyy',
  language: 'nl',
  autoclose: true,
  _value: null,

  attributeBindings: ['name', 'type', /*'value',*/ 'readonly'],

  init: function() {
    this._super();
    this.get('attributeBindings').removeObject('value');
  },

  value: function (key, value) {
    var datepicker = (this.state === 'inDOM') && this.$() ? this.$().data('datepicker') : undefined;
    if (arguments.length === 1) { // getter
      //if (!Ember.isEmpty(datepicker)) {
      //  return new ISO8601Date(datepicker.getDate());
      //}
      return this.get('_value');
    } else { // setter
      if (!Ember.isEmpty(value)) {
        var date = null,
          format = this.get('format'),
          language = this.get('language')
        if (Ember.typeOf(value) === 'date' && !isNaN(value)) {
          date = value;
          if (!Ember.isEmpty(datepicker)) {
            datepicker.update(date);
          }
        } else if (Ember.typeOf(value) === 'string') {
          if (format.length === value.length) { //assume datepicker has set the date
            date = $.fn.datepicker.DPGlobal.parseDate(
              value,
              $.fn.datepicker.DPGlobal.parseFormat(format),
              language);
          } else if (value.match(/^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/)) {
            date = new ISO8601Date(value);
            if (!Ember.isEmpty(datepicker)) {
              datepicker.update(date);
            }
          }
        }
        if (Ember.typeOf(date) === 'date' && !isNaN(date)) {
          this.set('_value', date);
          return date;
        }
      }
      this.set('_value', null);
      if (!Ember.isEmpty(datepicker)) {
        //datepicker.update(''); //doesn't work
        if (!datepicker.isInput) {
          if (datepicker.component) {
            datepicker.element.find('input').val(null);
          }
        } else {
          datepicker.element.val(null);
        }
      }      
      return null;
    }
  }.property(),

  didInsertElement: function () {
    this._super();
    var self = this;
    Ember.run.schedule('actions', this, function () {
      var value = this.get('_value');
      self.$().datepicker({
        format: self.get('format'),
        language: self.get('language'),
        autoclose: self.get('autoclose')
      }).on('changeDate', function (ev) {
        //self.set('_value', ev.date);
      });
      if (!Ember.isEmpty(value)) {
        var datepicker = self.$().data('datepicker');
        datepicker.update(value);
      }
    });
  },

  willDestroyElement: function() {
    this._super();
    var picker = this.$().data('datepicker').picker;
    Ember.run.schedule('actions', this, function() {
      //cleanup 
      picker.remove();
    });
  }
});
