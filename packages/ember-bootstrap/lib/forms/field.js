
Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  classNameBindings: [':form-group', 'isValid:has-no-error:has-error'],
  labelCache: undefined,
  help: undefined,
  isValid: true,
  helpViewClassNames: '',
  errorsViewClassNames: '',
  labelFieldClassNames: 'col-sm-4',
  inputFieldDivClassNames: 'col-sm-8',
  template: Ember.Handlebars.compile([
    '{{#if view.label}}{{view view.labelView viewName="labelView"}}{{/if}}',
    '<div {{bindAttr class="view.inputFieldDivClassNames"}}>',
    '  {{view view.inputField viewName="inputField" classNames="form-control"}}',
    '</div>',
    '{{view view.errorsView}}',
    '{{view view.helpView}}'].join("\n")),

  label: Ember.computed(function(key, value) {
    if(arguments.length === 1){
      if(this.get('labelCache') === undefined){
        var path = this.get('valueBinding._from');
        if (path) {
          path = path.split(".");
          return path[path.length - 1];
        }
      } else {
        return this.get('labelCache');
      }
    } else {
      this.set('labelCache', value);
      return value;
    }
  }).property(),

  labelView: Ember.View.extend({
    tagName: 'label',
    classNameBindings: ['parentView.labelFieldClassNames'],
    classNames: ['control-label'],
    template: Ember.Handlebars.compile('{{view.value}}'),

    value: Ember.computed(function(key, value) {
      var parent = this.get('parentView');

      if (value && value !== parent.get('label')) {
        parent.set('label', value);
      } else {
        value = parent.get('label');
      }

      // If the labelCache property is present on parent, then the
      // label was set manually, and there's no need to humanise it.
      // Otherwise, it comes from the binding and needs to be
      // humanised.
      return parent.get('labelCache') === undefined || parent.get('labelCache') === false ?
        Bootstrap.Forms.human(value) : value;
    }).property('parentView.label'),

    inputElementId: 'for',
    forBinding: 'inputElementId',
    attributeBindings: ['for']
  }),

  inputField: Ember.View.extend({
    classNames: ['form-control'],
    tagName: 'div',
    template: Ember.Handlebars.compile('') //'This class is not meant to be used directly, but extended.'
  }),

  valueChanged: function () {
    var binding = this.get('valueBinding._from'),
      fieldName = null,
      object = null;

    if (binding) {
      binding = binding.split(".");
      fieldName = binding[binding.length - 1];
      object = this.get(binding.slice(0, binding.length - 1).join('.'));
    } else {
      fieldName = this.get('label');
      object = this.get('context');
    }

    Ember.run.schedule('actions', this, function () { //so bindings are flushed
      var errors = Em.get(object, 'errors');
      if (!Ember.isEmpty(errors)) {
        errors.clear();
      }
      if (object != null && object.validate) {
        object.validate();
      }
    });
  }.observes('value'),

  errorsView: Ember.View.extend({
    tagName: 'div',
    classNameBindings: ['parentView.errorsViewClassNames', 'parentView.isValid:hidden'],
    classNames: ['has-errors', 'help-block'],
    template: Ember.Handlebars.compile('{{view.message}}'),

    message: Ember.computed(function(key, value) {
        var parent = this.get('parentView');

        if (parent !== null) {
            var binding = parent.get('valueBinding._from');
            var fieldName = null;
            var object = null;

            if (binding) {
                binding = binding.replace("_parentView.", "").split(".");
                fieldName = binding[binding.length - 1];
                object = parent.get(binding.slice(0, binding.length - 1).join('.'));
            } else {
                fieldName = parent.get('label');
                object = parent.get('context');
            }

            if (object && !object.get('isValid')) {
                var errors = object.get('errors.' + fieldName + '.messages');
                if (!Ember.isEmpty(errors)) {
                    //parent.$().addClass('has-error');
                    parent.set('isValid', false);
                    return errors.join(', ');
                } else {
                    //parent.$().removeClass('has-error');
                    parent.set('isValid', true);
                    return '';
                }
            } else {
                //parent.$().removeClass('has-error');
                parent.set('isValid', true);
                return '';
            }
        }
    }).property('parentView.context.isValid', 'parentView.label', 'parentView.context.errors.length')
  }),

  helpView: Ember.View.extend({
    tagName: 'div',
    classNameBindings: ['parentView.helpViewClassNames'],
    classNames: ['help-block'],
    template: Ember.Handlebars.compile('{{view.content}}'),
    contentBinding: 'parentView.help'
  }),

  didInsertElement: function() {
    this.set('labelView.inputElementId', this.get('inputField.elementId'));
  }
});