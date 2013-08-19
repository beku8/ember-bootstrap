require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Wysiwyg = Ember.View.extend(Ember.TextSupport, Bootstrap.FocusSupport, {
		template: Ember.Handlebars.compile([
			'<div id="alerts"></div>',
			'<div class="btn-toolbar" data-role="editor-toolbar" {{bindAttr data-target="view.childViews.lastObject.elementId"}}>',
			'  <div class="btn-group">',
			'    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Font Style" {{bindAttr disabled="view.disabled"}}><i class="icon-fontsize"></i>&nbsp;<span class="caret"></span></a>',
			'    <ul class="dropdown-menu">',
			'      <li><a data-edit="formatBlock &lt;p&gt;">Normal</a></li>',
			'      <li><a data-edit="formatBlock &lt;p&gt;"><p>Paragraph</p></a></li>',
			'      <li><a data-edit="formatBlock &lt;h1&gt;"><h1>Heading 1</h1></a></li>',
			'      <li><a data-edit="formatBlock &lt;h2&gt;"><h2>Heading 2</h2></a></li>',
			'      <li><a data-edit="formatBlock &lt;h3&gt;"><h3>Heading 3</h3></a></li>',
			'      <li><a data-edit="formatBlock &lt;h4&gt;"><h4>Heading 4</h4></a></li>',
			'      <li><a data-edit="formatBlock &lt;h5&gt;"><h5>Heading 5</h5></a></li>',
      '      <li><a data-edit="formatBlock &lt;h6&gt;"><h6>Heading 6</h6></a></li>',
			'      <li><a data-edit="formatBlock &lt;address&gt;"><address>Address</address></a></li>',
			'      <li><a data-edit="formatBlock &lt;pre&gt;"><pre>Formatted</pre></a></li>',
			'    </ul>',
			'  </div>',			
			'  <div class="btn-group">',
			'    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Font" {{bindAttr disabled="view.disabled"}}><i class="icon-font"></i>&nbsp;<span class="caret"></span></a>',
			'    <ul class="dropdown-menu">',
			'    </ul>',
			'  </div>',
			'  <div class="btn-group">',
			'    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Font Size" {{bindAttr disabled="view.disabled"}}><i class="icon-text-height"></i>&nbsp;<span class="caret"></span></a>',
			'    <ul class="dropdown-menu">',
			'      <li><a data-edit="fontSize 7"><font size="7">Very Huge</font></a></li>',
			'      <li><a data-edit="fontSize 6"><font size="6">Huge</font></a></li>',
			'      <li><a data-edit="fontSize 5"><font size="5">Very Large</font></a></li>',
			'      <li><a data-edit="fontSize 4"><font size="4">Large</font></a></li>',
			'      <li><a data-edit="fontSize 3"><font size="3">Normal</font></a></li>',
			'      <li><a data-edit="fontSize 2"><font size="2">Small</font></a></li>',
			'      <li><a data-edit="fontSize 1"><font size="1">Very Small</font></a></li>',
			'    </ul>',
			'  </div>',
			'  <div class="btn-group">',		
			'    <a class="btn btn-default" title="Text Color" id="forecolorBtn" data-edit="foreColor" data-color-format="hex" data-color="rgb(255, 255, 255)" {{bindAttr disabled="view.disabled"}}><i class="icon-brush"></i></a>',	
			'    <a class="btn btn-default" title="Background Color" id="backcolorBtn" data-edit="backColor" data-color-format="hex" data-color="rgb(0, 0, 0)" {{bindAttr disabled="view.disabled"}}><i class="icon-bucket"></i></a>',				
			'  </div>',			
			'  <div class="btn-group">',
			'    <a class="btn btn-default" data-edit="bold" title="Bold (Ctrl/Cmd+B)" {{bindAttr disabled="view.disabled"}}><i class="icon-bold"></i></a>',
			'    <a class="btn btn-default" data-edit="italic" title="Italic (Ctrl/Cmd+I)" {{bindAttr disabled="view.disabled"}}><i class="icon-italic"></i></a>',
			'    <a class="btn btn-default" data-edit="strikethrough" title="Strikethrough" {{bindAttr disabled="view.disabled"}}><i class="icon-strike"></i></a>',
			'    <a class="btn btn-default" data-edit="underline" title="Underline (Ctrl/Cmd+U)" {{bindAttr disabled="view.disabled"}}><i class="icon-underline"></i></a>',
			'  </div>',
			'  <div class="btn-group">',
			'    <a class="btn btn-default" data-edit="insertunorderedlist" title="Bullet list" {{bindAttr disabled="view.disabled"}}><i class="icon-list-bullet"></i></a>',
			'    <a class="btn btn-default" data-edit="insertorderedlist" title="Number list" {{bindAttr disabled="view.disabled"}}><i class="icon-list-numbered"></i></a>',
			'    <a class="btn btn-default" data-edit="outdent" title="Reduce indent (Shift+Tab)" {{bindAttr disabled="view.disabled"}}><i class="icon-indent-left"></i></a>',
			'    <a class="btn btn-default" data-edit="indent" title="Indent (Tab)" {{bindAttr disabled="view.disabled"}}><i class="icon-indent-right"></i></a>',
			'  </div>',
			'  <div class="btn-group">',
			'    <a class="btn btn-default" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)" {{bindAttr disabled="view.disabled"}}><i class="icon-align-left"></i></a>',
			'    <a class="btn btn-default" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)" {{bindAttr disabled="view.disabled"}}><i class="icon-align-center"></i></a>',
			'    <a class="btn btn-default" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)" {{bindAttr disabled="view.disabled"}}><i class="icon-align-right"></i></a>',
			'    <a class="btn btn-default" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)" {{bindAttr disabled="view.disabled"}}><i class="icon-align-justify"></i></a>',
			'  </div>',
			'  <div class="btn-group">',
			'    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Hyperlink" {{bindAttr disabled="view.disabled"}}><i class="icon-link-ext"></i></a>',
			'    <ul class="dropdown-menu">',
			'      <li>',
			'        <div class="input-group">',
			'          <input placeholder="URL" type="text" data-edit="createLink"/>',			
			'          <div class="input-group-btn">',
			'            <button class="btn" type="button">Add</button>',
			'          </div>',			
			'        </div>',
			'      </li>',
			'    </ul>',
			'    <a class="btn btn-default" data-edit="unlink" title="Remove Hyperlink" {{bindAttr disabled="view.disabled"}}><i class="icon-scissors"></i></a>',
			//'    <a class="btn btn-default" title="Insert picture (or just drag & drop)" id="pictureBtn" {{bindAttr disabled="view.disabled"}}><i class="icon-picture"></i></a>',
			//'    <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" {{bindAttr disabled="view.disabled"}}/>',
			'  </div>',			
      '  <div class="btn-group">',			
			'    <span class="btn btn-default btn-file">', //http://labs.abeautifulsite.net/demos/bootstrap-file-inputs/
      '      <i class="icon-picture"></i><input type="file" data-edit="insertImage" {{bindAttr disabled="view.disabled"}}/>',
			'    </span>',
			'  </div>',
			//'  <div class="btn-group">',
			//'    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Insert Table" {{bindAttr disabled="view.disabled"}}><i class="icon-table"></i></a>',
			//'    <ul class="dropdown-menu">',
			//'      <li>',
			//'        <form class="form-inline">',
			//'          <fieldset>',			
      //'            <input class="form-control" placeholder="Rows" id="nrOfRowsInput" type="text" />',
			//'            <input class="form-control" placeholder="Columns" id="nrOfColumnsInput" type="text" />',
			//'            <button class="btn" type="button" {{action "createTable" target="view"}}>Add</button>',
			//'          </fieldset>',				
			//'        </form>',
			//'      </li>',
			//'    </ul>',			
			//'  </div>',
			'  <div class="btn-group">',
			//'    <a class="btn btn-default" data-edit="cut" title="Cut" {{bindAttr disabled="view.disabled"}}><i class="icon-scissors"></i></a>',
			//'    <a class="btn btn-default" data-edit="copy" title="Copy" {{bindAttr disabled="view.disabled"}}><i class="icon-docs"></i></a>',
			//'    <a class="btn btn-default" data-edit="paste" title="Paste" {{bindAttr disabled="view.disabled"}}><i class="icon-paste"></i></a>',
			'    <a class="btn btn-default" data-edit="undo" title="Undo (Ctrl/Cmd+Z)" {{bindAttr disabled="view.disabled"}}><i class="icon-ccw"></i></a>',
			'    <a class="btn btn-default" data-edit="redo" title="Redo (Ctrl/Cmd+Y)" {{bindAttr disabled="view.disabled"}}><i class="icon-cw"></i></a>',
			'  </div>',
			'  <input type="text" data-edit="inserttext" class="voiceBtn" x-webkit-speech="" {{bindAttr disabled="view.disabled"}}>',
			'</div>',
			'{{view view.editorView}}'].join("\n")),

		editorView: Ember.View.extend({
				classNames: ['wysiwygEditor'],
				attributeBindings: ['contenteditable'],
				contenteditable: function () {
						return this.get('parentView.disabled') ? 'false' : 'true';
				}.property('parentView.disabled'),
		}),

		_elementValueDidChange: function () {
				var editorView = this.get('childViews.lastObject'),
						editorValue = editorView.$().html(),
						value = this.get('value');
				if (!Ember.isEqual(value, editorValue)) {
						this.set('value', editorValue);
				}
		},
	
	  /*createTable: function() {
			debugger;
    },*/

		didInsertElement: function () {
				this._super();

				var self = this;
				Ember.run.schedule('actions', this, function () {
						var value = self.get('value'),
								editorView = self.get('childViews.lastObject');
						self.initToolbarBootstrapBindings();
						editorView.$().wysiwyg({
								//fileUploadError: self.showErrorAlert 
						}).html(value);
						self.$().find('#forecolorBtn').colorpicker().on('showPicker', function(ev){
							var foreColor = document.queryCommandValue('foreColor');
							if (parseInt(foreColor) !== Number.NaN) {
							  foreColor = "rgb("+(foreColor & 0xFF)+","+((foreColor & 0xFF00)>>8)+","+((foreColor & 0xFF0000)>>16)+")";
							}
							$(this).colorpicker('setValue', foreColor);
						}).on('changeColor', function(ev){
							editorView.$().focus();
							document.execCommand('foreColor', 0, ev.color.toHex());
						});
						self.$().find('#backcolorBtn').colorpicker().on('showPicker', function(ev){
							var backColor = document.queryCommandValue('backColor');
							if (parseInt(backColor) !== Number.NaN) {
							  backColor = "rgb("+(backColor & 0xFF)+","+((backColor & 0xFF00)>>8)+","+((backColor & 0xFF0000)>>16)+")";
							}
							$(this).colorpicker('setValue', backColor);							
						}).on('changeColor', function(ev){
							editorView.$().focus();
							document.execCommand('backColor', 0, ev.color.toHex());
						});	
				});
		},

		willDestroyElement: function () {
				this._super();

				this.get('childViews.lastObject').$().wysiwyg_destroy();
				this.destroyToolbarBootstrapBindings();
				this.$().find('#forecolorBtn').colorpicker('destroy');
				this.$().find('#backcolorBtn').colorpicker('destroy');
		},

		valueChanged: function () {
				var value = this.get('value'),
						editorView = this.get('childViews.lastObject'),
						editorValue = editorView.$().html();
				if (!Ember.isEqual(value, editorValue)) {
						editorView.$().html(value);
				}
		}.observes('value'),

		destroyToolbarBootstrapBindings: function () {
				this.$().find('a[title]').tooltip('destroy');
				this.$().find('.dropdown-menu input').off();
		},

		initToolbarBootstrapBindings: function () {
				var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
						'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
						'Times New Roman', 'Verdana'],
						fontTarget = this.$().find('[title=Font]').siblings('.dropdown-menu'),
						self = this;
				$.each(fonts, function (idx, fontName) {
						fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
				});
				this.$().find('a[title]').tooltip({ container: 'body' });
				this.$().find('.dropdown-menu input').click(function () {
						return false;
				}).change(function () {
						$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
				}).keydown('esc', function () {
						this.value = '';
						$(this).change();
				});
				/*this.$().find('[data-role=magic-overlay]').each(function () {
						var overlay = $(this),
								target = self.$().find(overlay.data('target'));
						overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
				});*/
				if ("onwebkitspeechchange" in document.createElement("input")) {
						//var editorOffset = this.$().find('#editor').offset();
						//this.$().find('.voiceBtn').css('position', 'absolute').offset({ top: editorOffset.top, left: editorOffset.left + $('#editor').innerWidth() - 35 });
				} else {
						this.$().find('.voiceBtn').hide();
				}
		}

//	showErrorAlert: function (reason, detail) {
//		var msg='';
//		if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
//		else {
//			console.log("error uploading file", reason, detail);
//		}
//		$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
//	 		'<strong>File upload error</strong> '+msg+' </div>').prependTo(this.$().find('#alerts'));
//	}
});
