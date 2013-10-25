var get = Ember.get, set = Ember.set;

Bootstrap.TabContainerView = Ember.View.extend({
});

Bootstrap.TabView = Ember.View.extend({
  tagName: 'li',
  classNameBindings: ['isActive:active'],

  tabsContainer: Ember.computed(function () {
    return this.nearestOfType(Bootstrap.TabContainerView);
  }).property(),

  mouseUp: function () {
    set(this, 'tabsContainer.currentView', get(this, 'value'));
  },

  isActive: function() {
    return this.get('value') === this.get('tabsContainer.currentView');
  }.property('tabsContainer.currentView')
});

Bootstrap.TabPaneView = Ember.View.extend({
  tabsContainer: Ember.computed(function () {
    return this.nearestOfType(Bootstrap.TabContainerView);
  }).property(),

  isVisible: Ember.computed(function () {
    return get(this, 'viewName') === get(this, 'tabsContainer.currentView');
  }).property('tabsContainer.currentView')
});



Bootstrap.Tabs = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-tabs'],
  classNameBindings: ['isStacked:nav-stacked'],
  tagName: 'ul',
  itemViewClass: Bootstrap.PillItem,
  selection: null
});

Bootstrap.TabItem = Ember.View.extend({
    tagName: 'li',
    classNameBindings: [/*'isActive:active'*/'active'],
    
    init: function() {
      this._super();
      
      Ember.deprecate("Bootstrap.TabItem is deprecated. Use nested linkTo instead!");
    },
    
    /*isActive: function() {
        return this.get('childViews.firstObject.active');
    }.property('item', 'controller.selectedTab').cacheable()*/
    
    activeChanged: function () {
      var self = this;
      Ember.run.next(this, function () { //delay
        if (!self.isDestroyed) {
          self.set('active', self.get('childViews.firstObject.active'));
        }
      });
    }.observes('childViews.firstObject.active') //get the active state from the linkTo helper
});
