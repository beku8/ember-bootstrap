var Bootstrap = window.Bootstrap;

Bootstrap.AlertBox = Bootstrap.ModalPane.extend({
	primary: 'OK',
	primaryIcon: ['icon-ok', 'icon-white'],
	closeOnEscape: false,
	showCloseButton: false,
	
	bodyViewClass: Ember.View.extend({
		//tagName: 'p',
		classNames: ['row'],
		template: Ember.Handlebars.compile([
			'{{#if view.parentView.icon}}',
			'  <div class="col-sm-3">',
			'	   {{view view.parentView.iconViewClass}}',
			'  </div>',
			'{{/if}}',
			'<div class="col-sm-9" style="vertical-align: middle; top: 60px;">{{{view.parentView.message}}}</div>'
			].join("\n"))
	}),
	
	icon: null,
	iconViewClass: function() {
		var icon = this.get('icon');
		return Bootstrap.Icon.extend({ classNames: [icon, "icon-thumbnail"], styleBinding: "parentView.parentView.iconStyle" });
	}.property('icon')
});
