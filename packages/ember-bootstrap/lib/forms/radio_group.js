var Bootstrap = window.Bootstrap;

Bootstrap.Forms.RadioGroup = Bootstrap.Forms.Field.extend({
  itemLabelProperty: 'description',
  itemValueProperty: 'id',

  inputField: Bootstrap.RadioGroup.extend({
    valueBinding: 'parentView.value',
    contentBinding: 'parentView.content',
    itemLabelPropertyBinding: 'parentView.itemLabelProperty',
    itemValuePropertyBinding: 'parentView.itemValueProperty'
  })
});
