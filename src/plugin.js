import { SweetModal, SweetModalTab } from './main.js';

export default function install (Vue, options) {
	Vue.component('SweetModal', SweetModal)
	Vue.component('SweetModalTab', SweetModalTab)
}
