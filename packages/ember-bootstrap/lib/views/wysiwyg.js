require("ember-bootstrap/mixins/focus_support");

var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Wysiwyg = Ember.View.extend(Ember.TextSupport, Bootstrap.FocusSupport, {
  template: Ember.Handlebars.compile([
	'<div id="alerts"></div>',
	'<div class="btn-toolbar" data-role="editor-toolbar" data-target="#editor">',
	'  <div class="btn-group">',
	'    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font"><i class="icon-font"></i>&nbsp;<span class="caret"></span></a>',
	'    <ul class="dropdown-menu">',
	'    </ul>',
	'  </div>',
	'  <div class="btn-group">',
	'    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font Size"><i class="icon-text-height"></i>&nbsp;<span class="caret"></span></a>',
	'    <ul class="dropdown-menu">',
	'      <li><a data-edit="fontSize 5"><font size="5">Huge</font></a></li>',
	'      <li><a data-edit="fontSize 3"><font size="3">Normal</font></a></li>',
	'      <li><a data-edit="fontSize 1"><font size="1">Small</font></a></li>',
	'    </ul>',
	'  </div>',
	'  <div class="btn-group">',
	'    <a class="btn" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i class="icon-bold"></i></a>',
	'    <a class="btn" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i class="icon-italic"></i></a>',
	'    <a class="btn" data-edit="strikethrough" title="Strikethrough"><i class="icon-strike"></i></a>',
	'    <a class="btn" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i class="icon-underline"></i></a>',
	'  </div>',
	'  <div class="btn-group">',
	'    <a class="btn" data-edit="insertunorderedlist" title="Bullet list"><i class="icon-list-bullet"></i></a>',
	'    <a class="btn" data-edit="insertorderedlist" title="Number list"><i class="icon-list-numbered"></i></a>',
	'    <a class="btn" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i class="icon-indent-left"></i></a>',
	'    <a class="btn" data-edit="indent" title="Indent (Tab)"><i class="icon-indent-right"></i></a>',
	'  </div>',
	'  <div class="btn-group">',
	'    <a class="btn" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)"><i class="icon-align-left"></i></a>',
	'    <a class="btn" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i class="icon-align-center"></i></a>',
	'    <a class="btn" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)"><i class="icon-align-right"></i></a>',
	'    <a class="btn" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i class="icon-align-justify"></i></a>',
	'  </div>',
	'  <div class="btn-group">',
	'    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i class="icon-link"></i></a>',
	'    <ul class="dropdown-menu">',
	'      <li>',
	'        <div class="input-append">',
	'          <input placeholder="URL" type="text" data-edit="createLink"/>',
	'          <button class="btn" type="button">Add</button>',
	'        </div>',
	'      </li>',
	'    </ul>',
	'    <a class="btn" data-edit="unlink" title="Remove Hyperlink"><i class="icon-scissors"></i></a>',
	'  </div>',
	'  <div class="btn-group">',
	'    <a class="btn" title="Insert picture (or just drag & drop)" id="pictureBtn"><i class="icon-picture"></i></a>',
	'    <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" />',
	'  </div>',
	'  <div class="btn-group">',
	'    <a class="btn" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i class="icon-ccw"></i></a>',
	'    <a class="btn" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i class="icon-cw"></i></a>',
	'  </div>',
	'  <input type="text" data-edit="inserttext" id="voiceBtn" x-webkit-speech="">',
	'</div>',
	'<div id="editor" contenteditable="true">',
	'</div>'].join("\n")),
	
    editor: null,

    _elementValueDidChange: function() {
        var editor = this.get('editor'),
            editorValue = editor.html(),
            value = this.get('value');
        if (!Ember.isEqual(value, editorValue)) {
            this.set('value', editorValue);
        }
    },

	didInsertElement: function() {
        this._super();
        var self = this,
            editor = this.$().find('#editor');
        this.set('editor', editor);
        Ember.run.schedule('actions', this, function() {
        	var value = self.get('value'),
            	editor = self.get('editor');
        	self.initToolbarBootstrapBindings();
            editor.wysiwyg({
                //fileUploadError: self.showErrorAlert 
            });
            editor.html(value);
        });
    },
    
	willDestroyElement: function() {
		this._super(); 
        var editor = this.get('editor');
        editor.wysiwyg_destroy();
        this.destroyToolbarBootstrapBindings();
	},
    
  	valueChanged: function () {
        var value = this.get('value');
            editor = this.get('editor'),
            editorValue = editor.html();
        if (!Ember.isEqual(value, editorValue)) {
            editor.html(value);
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
            fontTarget = this.$().find('[title=Font]').siblings('.dropdown-menu');
        $.each(fonts, function (idx, fontName) {
            fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
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

        this.$().find('[data-role=magic-overlay]').each(function () {
            var overlay = $(this),
                target = $(overlay.data('target'));
            overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
        });
        if ("onwebkitspeechchange"  in document.createElement("input")) {
            var editorOffset = this.$().find('#editor').offset();
            this.$().find('#voiceBtn').css('position', 'absolute').offset({ top: editorOffset.top, left: editorOffset.left + $('#editor').innerWidth() - 35 });
        } else {
            this.$().find('#voiceBtn').hide();
        }
    },

    showErrorAlert: function (reason, detail) {
        var msg='';
        if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
        else {
            console.log("error uploading file", reason, detail);
        }
        $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
         '<strong>File upload error</strong> '+msg+' </div>').prependTo(this.$().find('#alerts'));
    }
});
