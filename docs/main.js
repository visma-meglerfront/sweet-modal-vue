import Vue from 'vue'
import SweetModal from '../src/plugin'

import MainView from './views/Main'

Vue.use(SweetModal)

const app = new Vue({
	components: {
		MainView
	},

	mounted() {
		this.$el.className = 'loaded'
	}
}).$mount('#app')