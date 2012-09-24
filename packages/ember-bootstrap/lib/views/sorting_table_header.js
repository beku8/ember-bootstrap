var Bootstrap = window.Bootstrap;
Bootstrap.SortingTableHeader = Ember.View.extend({
    tagName: 'th',

    template: Ember.Handlebars.compile('{{view.text}} <i {{bindAttr class="view.icon"}}></i>'),

    classNames: ['pointerCursor'],

    icon: function () {
        var controller = this.get('controller');
        var sortProps = controller.get('sortProperties');
        if (Ember.isArray(sortProps) && sortProps.contains(this.get('property'))) {
            if (controller.get('sortAscending'))
                return 'icon-sort-up';
            else
                return 'icon-sort-down';
        }
        return 'icon-sort';
    } .property('controller.sortProperties', 'controller.sortAscending'),

    click: function (evt) {
        var controller = this.get('controller');
        var sortProps = controller.get('sortProperties');
        if (Ember.isArray(sortProps) && sortProps.contains(this.get('property'))) {
            controller.toggleProperty('sortAscending');
        }
        controller.set('sortProperties', Ember.makeArray(this.get('property'))); //sortProperties triggers the sort
    }
});
