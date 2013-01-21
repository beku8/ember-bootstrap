var Bootstrap = window.Bootstrap;
Bootstrap.SortingTableHeader = Ember.View.extend({
  tagName: 'th',

  template: Ember.Handlebars.compile('{{view.text}} <i {{bindAttr class="view.icon"}}></i>'),

  classNames: ['pointerCursor'],

  sortableArrayBinding: 'controller', //default the controller //'bindingContext.content'

  icon: function () {
    var sortableArray = this.get('sortableArray');
    if (!Ember.isEmpty(sortableArray)) {
      var sortProps = sortableArray.get('sortProperties');
      if (Ember.isArray(sortProps) && sortProps.contains(this.get('property'))) {
        if (sortableArray.get('sortAscending')) {
          return 'icon-sort-up';
        } else {
          return 'icon-sort-down';
        }
      }
    }
    return 'icon-sort';
  } .property('sortableArray.sortProperties', 'sortableArray.sortAscending'),

  click: function (evt) {
    var sortableArray = this.get('sortableArray');
    var sortProps = sortableArray.get('sortProperties');
    if (Ember.isArray(sortProps) && sortProps.contains(this.get('property'))) {
      sortableArray.toggleProperty('sortAscending');
    }
    sortableArray.set('sortProperties', Ember.makeArray(this.get('property'))); //sortProperties triggers the sort
  }
});
