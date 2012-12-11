var Bootstrap = window.Bootstrap;

Bootstrap.Icon = Ember.View.extend({
	tagName: 'i',
	attributeBindings: ['style'],
  	classNames: ['icon']
});
