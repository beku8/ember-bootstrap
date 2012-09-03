var Bootstrap = window.Bootstrap;

Bootstrap.AlertBox = Bootstrap.ModalPane.extend({
	primary: 'OK',
	primaryIcon: ['icon-ok', 'icon-white'],
	isErroneous: false,
	closeOnEscape: false,
	showCloseButton: false
});
