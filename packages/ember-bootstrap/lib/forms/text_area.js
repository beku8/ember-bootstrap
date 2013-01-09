require("ember-bootstrap/mixins/text_support");
require("ember-bootstrap/mixins/focus_support");
require("ember-bootstrap/mixins/style_support");

var Bootstrap = window.Bootstrap;
Bootstrap.Forms.TextArea = Bootstrap.Forms.Field.extend({

  inputField: Ember.TextArea.extend(Bootstrap.TextSupport, Bootstrap.FocusSupport, Bootstrap.StyleSupport,{
    rowsBinding: 'parentView.rows',
    colsBinding: 'parentView.cols',
    autofocusBinding: 'parentView.autofocus',
    styleBinding: 'parentView.style'
  })
});
