var Bootstrap = window.Bootstrap;

Bootstrap.Forms.CheckboxGroup = Bootstrap.Forms.Field.extend({
  itemLabelProperty: 'description',
  itemValueProperty: 'id',

  inputField: Bootstrap.CheckboxGroup.extend({
    valueBinding: 'parentView.value',
    contentBinding: 'parentView.content',
    itemLabelPropertyBinding: 'parentView.itemLabelProperty',
    itemValuePropertyBinding: 'parentView.itemValueProperty'
  })
});
