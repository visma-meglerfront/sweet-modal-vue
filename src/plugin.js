import { SweetModal, SweetModalTab } from './main.js'

module.exports = {
	install(Vue, options) {
		Vue.component('SweetModal', SweetModal);
		Vue.component('SweetModalTab', SweetModalTab);
	}
}