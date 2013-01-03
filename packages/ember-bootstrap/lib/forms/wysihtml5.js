require("ember-bootstrap/views/wysihtml5");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Wysihtml5 = Bootstrap.Forms.Field.extend({
	fontStyles: true,
	emphasis: true,
	lists: true,
	html: false,
	link: false,
	image: false,
	color: true,

  inputField: Bootstrap.Wysihtml5.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    styleBinding: 'parentView.style',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name', 'style'],
    autofocusBinding: 'parentView.autofocus',
    disabledBinding: 'parentView.disabled',
    
    fontStylesBinding: 'parentView.fontStyles',
    emphasisBinding: 'parentView.emphasis',
    listsBinding: 'parentView.lists',
    htmlBinding: 'parentView.html',
    linkBinding: 'parentView.link',
    imageBinding: 'parentView.image',
    colorBinding: 'parentView.color'
  })
});
