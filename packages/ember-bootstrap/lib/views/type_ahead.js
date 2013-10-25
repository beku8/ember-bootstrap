require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.TypeAhead = Ember.TextField.extend(Bootstrap.FocusSupport, {
    dataset_name: undefined, //The string used to identify the dataset. Used by typeahead.js to cache intelligently.
    dataset_valueKey: 'value', //The key used to access the value of the datum in the datum object. Defaults to value.
    dataset_limit: 5, //The max number of suggestions from the dataset to display for a given query. Defaults to 5.
    dataset_template: undefined, //The template used to render suggestions. Can be a string or a precompiled template. If not provided, suggestions will render as their value contained in a <p> element (i.e. <p>value</p>).
    dataset_engine: undefined, //The template engine used to compile/render template if it is a string. Any engine can use used as long as it adheres to the expected API. Required if template is a string.
    dataset_header: undefined, //The header rendered before suggestions in the dropdown menu. Can be either a DOM element or HTML.
    dataset_footer: undefined, //The footer rendered after suggestions in the dropdown menu. Can be either a DOM element or HTML.
    dataset_local: undefined, //An array of datums.
    dataset_prefetch: undefined, //Can be a URL to a JSON file containing an array of datums or, if more configurability is needed, a prefetch options object.
    dataset_remote: undefined, //Can be a URL to fetch suggestions from when the data provided by local and prefetch is insufficient or, if more configurability is needed, a remote options object.

    didInsertElement: function () {
        this._super();

        var self = this;
        Ember.run.schedule('actions', this, function () {
            self.$().typeahead({
                name: self.get('dataset_name'),
                valueKey: self.get('dataset_valueKey'),
                limit: self.get('dataset_limit'),
                template: self.get('dataset_template'),
                engine: self.get('dataset_engine'),
                header: self.get('dataset_header'),
                footer: self.get('dataset_footer'),
                local: self.get('dataset_local'),
                prefetch: self.get('dataset_prefetch'),
                remote: self.get('dataset_remote')
                
                /*remote: {
                    url: '%QUERY',
                    override: function (query, done) {
                        setTimeout(function () {
                            done([{firstName: 'Essie', lastName: 'Vaill'},{firstName: Cruz', lastName: 'Roudabush'},{firstName: Billie', lastName: 'Tinnes'}]);
                        }, 500);
                    }
                }								
								engine: Bootstrap.TypeAhead.HandlebarsEngine.create(),
    						template: '<strong>{{lastName}} {{firstName}}</strong>',
								*/
            }).on('typeahead:selected', function (ev, datum) {
                self.selected(datum);
            });
        });
    },

    willDestroyElement: function () {
        this._super();
			
        this.$().typeahead('destroy');
    },
	
	  selected: function(datum) {
			//this.set('value', datum);
		}
});

Bootstrap.TypeAhead.HandlebarsEngine = Ember.Object.extend({
    compile: function (template) {
        var compile = Handlebars.compile(template),
            render = {
                render: function (ctx) {
                    return compile(ctx);
                }
            };
        return render;
    }
});

/*Bootstrap.TypeAhead = Ember.TextField.extend(Bootstrap.FocusSupport, { 	
  minLength: 1, //The max number of items to display in the dropdown.
  items: 8, //The minimum character length needed before triggering autocomplete suggestions

  url: '/autocomplete', 
  labelProperty: 'label',
  idProperty: 'id',
  orgLookup: null,

  didInsertElement: function() {
    this._super();
    var self = this;
    Ember.run.schedule('actions', this, function() {
      var labels, mapped, typeAhead;
      typeAhead = self.$().typeahead({
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
      
      var instance = typeAhead.data('typeahead');
      self.orgLookup = $.proxy(instance.lookup,instance);
      instance.lookup = $.proxy(self._lookup, self);
      self.valueIdChanged();
    });
  },
  
  willDestroyElement: function () {
    this._super();
    var typeahead = this.$().data('typeahead');
    Ember.run.schedule('actions', this, function() {
      //cleanup 
      typeahead.$menu.remove();
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
  
  _lookup: function () {
    var val = this.$().val();

    if (val) {
      this.orgLookup();
    } else {
      this.set('valueId',null);
    }
  },

  valueIdChanged: function() {
    var id = this.get('valueId');
    var label = this.$().val();
    
    if (Ember.isEmpty(label) && !Ember.isEmpty(id)) {
      label = this.getLabelById(id);
      this.$()
        .val(label)
        .change();
    }
  }.observes('valueId')
});*/
