var Bootstrap = window.Bootstrap;

Bootstrap.ButtonGroup = Ember.CollectionView.extend({
  classNames: ['btn-group'],

  itemViewClass: Ember.View.extend({
    tagName: 'a',
    template: Ember.Handlebars.compile('{{view.content}}')
  })
});
