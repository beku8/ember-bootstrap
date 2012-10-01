var Bootstrap = window.Bootstrap;

Bootstrap.AlertBox = Bootstrap.ModalPane.extend({
	primary: 'OK',
	primaryIcon: ['icon-ok', 'icon-white'],
	closeOnEscape: false,
	showCloseButton: false
});
