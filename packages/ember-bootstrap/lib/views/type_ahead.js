require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.TypeAhead = Ember.TextField.extend(Bootstrap.FocusSupport, { 	
  minLength: 1, //The max number of items to display in the dropdown.
  items: 8, //The minimum character length needed before triggering autocomplete suggestions

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
          return self.updater(mapped[item], item);
        },
        minLength: self.get('minLength'),
        items: self.get('items')
      });
    });
  },
  
  updater: function(id, label) {
    this.set('valueId', id);
    return label;
  },
  
  getLabel: function(item) {
    return Ember.get(item, this.get('labelProperty'));
  },

  getLabelById: function(id) {
    return id;
  },
  
  getId: function(item) {
    return Ember.get(item, this.get('idProperty'));
  },

  getQueryPromise: function (query) {
    return $.get(this.get('url'), { q: query });
  },

  valueIdChanged: function() {
    var id = this.get('valueId');
    var label = this.$().val();
    
    if (Ember.empty(label) && !Ember.empty(id)) {
      label = this.getLabelById(id);
      this.$()
        .val(label)
        .change();
    }
  }.observes('valueId')
});
