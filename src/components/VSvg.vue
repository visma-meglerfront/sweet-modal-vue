<template>
	<span class="svg" v-html="svg" :style="style"></span>
</template>

<script>
	export default {
		name: 'VSvg',

		props: {
			file: {
				type: String,
				required: true
			},

			color: {
				type: String,
				required: false,
				default: 'inherit'
			}
		},

		computed: {
			svg() {
				return require('!svg-inline!../images/icons/' + this.file + '.svg')
			},

			style() {
				return {
					color: this.color
				}
			}
		}
	}
</script>

<style lang="scss">
	@import 'src/styles/mixins';

	.svg {

		@include svg {
			fill: currentColor;
		}
	}
</style>
