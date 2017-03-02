<template>
	<div class="example">
		<div class="interaction">
			<div class="content">
				<h3>{{ actionTitle }}</h3>
				<sweet-button v-on:click="dispatchAction" color="pink">Try out</sweet-button>
			</div>

			<slot></slot>
		</div>

		<div class="code">
			<sweet-code :language="language" v-if="$slots.code">
				<code :class="language"><slot name="code_sanitized"></slot></code>
			</sweet-code>

			<sweet-code :language="language" v-if="code">
				<code v-html="code_sanitized" :class="language"></code>
			</sweet-code>
		</div>
	</div>
</template>

<script>
	import SweetButton from './Button'
	import SweetCode from './Code'

	import unindent from 'unindent'

	export default {
		components: {
			SweetButton,
			SweetCode
		},

		props: {
			actionTitle: {
				type: String,
				required: true
			},

			code: {
				type: String,
				required: false,
				default: null
			},

			language: {
				type: String,
				required: false,
				default: null
			}
		},

		computed: {
			code_sanitized() {
				// return this.escape(this.code).replace(/\t\t/g, '')
				return unindent('\t\t\t\t' + this.escape(this.code))
			}
		},

		methods: {
			dispatchAction() {
				this.$emit('action')
			},

			escape(str) {
				return str.replace(/&/g, '&amp;')
						  .replace(/</g, '&lt;')
						  .replace(/>/g, '&gt;')
						  .replace(/"/g, '&quot;')
						  .replace(/'/g, '&#039;')
			}
		}
	}
</script>

<style lang="scss">
	@import '../styles/colors';
	@import '../styles/mixins';

	.example {
		border: 1px solid color(border);
		border-radius: 3px;

		display: flex;

		.interaction {
			@include border-box;

			width: 360px;

			background: color(light-background);

			padding: {
				top: 32px;
				bottom: 32px;
				left: 24px;
				right: 24px;
			}

			> .content {

				h3 {
					@include mp0;
				}

				h3 + a.sweet-button {
					margin-top: 20px;
				}
			}
		}

		.code {
			width: calc(100% - 360px);

			background: color(code);
			color: #fff;

			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;

			margin: {
				right: -1px;
				top: -1px;
				bottom: -1px;
			}

			pre {
				@include mp0;
				overflow: auto;

				padding: {
					left: 24px;
					right: 24px;
					top: 20px;
					bottom: 20px;
				}
			}

			pre, code {
				font-family: Hack, 'Source Code Pro', monospace;
				font-size: 13px;
				line-height: 1.6;
			}
		}

		& + .example {
			margin-top: 24px;
		}
	}

	.example + h3 {
		margin-top: 64px;
	}

	h3 + .example {
		margin-top: 24px;
	}
</style>