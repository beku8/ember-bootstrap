require("ember-bootstrap/mixins/text_support");
require("ember-bootstrap/mixins/focus_support");

var Bootstrap = window.Bootstrap;
Bootstrap.Forms.TextArea = Bootstrap.Forms.Field.extend({

  inputField: Ember.TextArea.extend(Bootstrap.TextSupport, Bootstrap.FocusSupport, {
    rowsBinding: 'parentView.rows',
    colsBinding: 'parentView.cols',
    autofocusBinding: 'parentView.autofocus'
  })
});
