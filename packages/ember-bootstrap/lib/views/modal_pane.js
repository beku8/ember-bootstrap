var get = Ember.get;
var Bootstrap = window.Bootstrap;
var jQuery = window.jQuery;

var modalPaneTemplate = [
'{{#if view.heading}}',
'  <div class="modal-header">',
'  	{{#if view.showCloseButton}}',
'		<a href="#" class="close" rel="close">×</a>',
'	{{/if}}',
'	{{view view.headerViewClass}}',
'  </div>',
'{{/if}}',
'<div class="modal-body">{{view view.bodyViewClass}}</div>',
'<div class="modal-footer">',
'  {{#if view.secondary}}',
'   <button class="btn btn-secondary" type="button" rel="secondary">',
'     {{#if view.secondaryIcon}}{{view view.secondaryIconViewClass}}{{/if}}',
'     {{view.secondary}}',
'  </button>',
'  {{/if}}',
'  {{#if view.primary}}',
'   <button class="btn btn-primary" type="button" rel="primary" {{bindAttr disabled="view.isNotValid"}}>',
'  	  {{#if view.primaryIcon}}{{view view.primaryIconViewClass}}{{/if}}',
'  	  {{view.primary}}',
'  </button>',
'  {{/if}}',
'</div>'].join("\n");
var modalPaneBackdrop = '<div class="modal-backdrop"></div>';

Bootstrap.ModalPane = Ember.View.extend({
  classNames: 'modal',
  defaultTemplate: Ember.Handlebars.compile(modalPaneTemplate),
  heading: null,
  message: null,
  primary: null,
  secondary: null,
  showBackdrop: true,
  showCloseButton: true,
  closeOnEscape: true,
  headerViewClass: Ember.View.extend({
    tagName: 'h3',
    template: Ember.Handlebars.compile('{{view.parentView.heading}}')
  }),
  bodyViewClass: Ember.View.extend({
    tagName: 'p',
    template: Ember.Handlebars.compile('{{{view.parentView.message}}}')
  }),

  item: null, 
  
  isNotValid: function () {
  	if (!Ember.empty(this.get('item'))) {
    	return !this.get('item.isValid');
    }
    return false;
  }.property('item.isValid'), 

  primaryIcon: null,
  primaryIconViewClass: function() {
	var icon = this.get('primaryIcon');
	return Bootstrap.Icon.extend({ classNames:  icon});
  }.property('primaryIcon'),
  secondaryIcon: null,
  secondaryIconViewClass: function() {
	var icon = this.get('secondaryIcon');
    return Bootstrap.Icon.extend({ classNames:  icon});
  }.property('secondaryIcon'),	

  didInsertElement: function() {
    if (get(this, 'showBackdrop')) this._appendBackdrop();
    this._setupDocumentKeyHandler();
  },

  willDestroyElement: function() {
    if (this._backdrop) this._backdrop.remove();
    this._removeDocumentKeyHandler();
  },

  keyPress: function(event) {
    if (get(this, 'closeOnEscape') && event.keyCode === 27) {
      this._triggerCallbackAndDestroy({ close: true }, event);
    }
  },

  click: function(event) {
    var target = event.target,
        targetRel = target.getAttribute('rel');

    if (targetRel === 'close') {
      this._triggerCallbackAndDestroy({ close: true }, event);
    } else if (targetRel === 'primary' && !this.get('isNotValid')) {
      this._triggerCallbackAndDestroy({ primary: true }, event);
    } else if (targetRel === 'secondary') {
      this._triggerCallbackAndDestroy({ secondary: true }, event);
    }
    return false;
  },

  _appendBackdrop: function() {
    var parentLayer = this.$().parent();
    this._backdrop = jQuery(modalPaneBackdrop).appendTo(parentLayer);
  },

  _setupDocumentKeyHandler: function() {
    var cc = this,
        handler = function(event) {
          cc.keyPress(event);
        };
    jQuery(window.document).bind('keyup', handler);
    this._keyUpHandler = handler;
  },

  _removeDocumentKeyHandler: function() {
    jQuery(window.document).unbind('keyup', this._keyUpHandler);
  },

  _triggerCallbackAndDestroy: function(options, event) {
    var destroy;
    if (this.callback) {
      destroy = this.callback(options, event);
    }
    if (destroy === undefined || destroy) this.destroy();
  }
});

Bootstrap.ModalPane.reopenClass({
  rootElement: ".ember-application",
  popup: function(options) {
    var modalPane, rootElement;
    if (!options) options = {};
    modalPane = this.create(options);
    rootElement = get(this, 'rootElement');
    modalPane.appendTo(rootElement);
    return modalPane;
  }
});
