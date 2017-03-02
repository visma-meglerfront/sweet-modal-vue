<template>
	<pre v-highlightjs :class="['sweet-code', {'theme-light': light, inline}]"><slot></slot></pre>
</template>

<script>
	import Vue from 'vue'
	import VueHighlightJS from 'vue-highlightjs'

	Vue.use(VueHighlightJS)

	export default {
		props: {
			light: {
				type: Boolean,
				required: false,
				default: false
			},

			inline: {
				type: Boolean,
				required: false,
				default: false
			}
		}
	}
</script>

<style lang="scss">

	.sweet-code {
		tab-size: 4;
		-webkit-font-smoothing: auto;

		&.inline {
			display: inline-block;
			padding: 0;
			margin: 0;
		}

		.hljs-name,
		.hljs-keyword {
			color: #F92672;
		}

		.hljs-attr {
			color: #A6E22E;
		}

		.hljs-string {
			color: #E6DB74;
		}

		.hljs-comment {
			color: #5C6273;
		}

		.hljs-selector-class {
			color: #66D9EF;
		}

		&.theme-light {

			.hljs-string {
				color: #F49B0F;
			}

			.hljs-attr {
				color: #88B42C;
			}

			.hljs-selector-class {
				color: #4CA7DD;
			}
		}
	}
</style>