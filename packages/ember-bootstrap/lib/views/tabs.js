var Bootstrap = window.Bootstrap;
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
	
	isActive: function() {
    	return this.get('value') === this.get('tabsContainer.currentView');
  	}.property('tabsContainer.currentView').cacheable()
});

Bootstrap.TabItem = Ember.View.extend({
    tagName: 'li',
    classNameBindings: ['isActive:active'],
    
    isActive: function() {
        return this.get('item') === this.get('controller.selectedTab');
    }.property('item', 'controller.selectedTab').cacheable()
});
