var Bootstrap = window.Bootstrap;

Bootstrap.AlertBox = Bootstrap.ModalPane.extend({
	primary: 'OK',
	primaryIcon: ['icon-ok', 'icon-white'],
	closeOnEscape: false,
	showCloseButton: false,
	
	bodyViewClass: Ember.View.extend({
		tagName: 'p',
		template: Ember.Handlebars.compile([
			'{{#if view.parentView.icon}}',
			'<div class="span2" style="height: 100px;">',
			'	{{view view.parentView.iconViewClass}}',
			'</div>',
			'{{/if}}',
			'<div>{{{view.parentView.message}}}</div>'
			].join("\n")),
	}),
	
	icon: null,
	iconViewClass: function() {
		var icon = this.get('icon');
		return Bootstrap.Icon.extend({ classNames: [icon, "icon-thumbnail"], styleBinding: "parentView.parentView.iconStyle" });
	}.property('icon')
});
