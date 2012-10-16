require("ember-bootstrap/mixins/focus_support");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Select = Bootstrap.Forms.Field.extend({
  optionLabelPath: 'content',
  optionValuePath: 'content',

  inputField: Ember.Select.extend(Bootstrap.FocusSupport, {
    contentBinding:         'parentView.content',

    optionLabelPathBinding: 'parentView.optionLabelPath',
    optionValuePathBinding: 'parentView.optionValuePath',

    selectionBinding:       'parentView.selection',
    promptBinding:          'parentView.prompt',
    multipleBinding:        'parentView.multiple',
    valueBinding:           'parentView.value',
    
    autofocusBinding: 'parentView.autofocus'
  }),
  
  nameChanged: function() { 
    this.cleanUp();
    var name = this.get('name');
    var item = this.get('item');
    if (!Ember.empty(item) && !Ember.empty(name)) {
        this.addObserver('item.' + name, function() {
	        this.validate();
        });

        var value = item.get(name);
        var valuePath = this.get('optionValuePath').replace(/^content\.?/, '');
        var content = this.get('content');
        for (i = 0; i < content.length; i++) {
            var itemValue = valuePath ? Ember.get(content[i], valuePath) : content[i];
            if (Ember.isEqual(itemValue, value)) {
                this.set('selection', content[i]);
                break;
            }
        }

        this.validate(); //trigger validation
        this.set('parentViewItemReversePropertyBinding', Ember.bind(this, 'value', 'item.' + name)); 	
        Ember.run.sync(); // synchronize bindings
    }
  }.observes('name')
});
