Bootstrap.Tabs = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-tabs'],
  classNameBindings: ['isStacked:nav-stacked'],
  tagName: 'ul',
  itemViewClass: Bootstrap.PillItem,
  selection: null
});


/*Bootstrap.TabContainerView = Ember.TabContainerView.extend({
});*/

Bootstrap.TabView = Ember.TabView.extend({
	tagName: 'li',
	classNameBindings: ['isActive:active'],
	
	isActive: Ember.computed(function() {
    	return this.get('value') === this.getPath('tabsContainer.currentView');
  	}).property('tabsContainer.currentView')
});
