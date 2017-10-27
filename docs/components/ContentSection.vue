<template>
	<section class="content-section">
		<h2 v-if="title">{{ title }}</h2>

		<div class="content">
			<slot></slot>
		</div>
	</section>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: false,
				default: null
			}
		}
	}
</script>

<style lang="scss">
	@import '../styles/mixins';
	@import '../styles/colors';

	.content-section {
		padding: {
			top: 32px;
			bottom: 32px;
		}

		> h2, p, > .content {
			@include mp0;
			@include max-width;
		}

		h2 + .content {
			margin-top: 24px;
		}

		> .content {

			> h3 {
				font-size: 13px;
				font-weight: 600;
				letter-spacing: 4px;
				text-transform: uppercase;
			}

			ol {
				list-style: none;
				counter-reset: item;

				padding: 0;
				margin: 0;

				margin: {
					top: 16px;
					bottom: 16px;
				}

				li {
					position: relative;

					padding-left: 3ch;
					text-indent: 0ch;
					counter-increment: item;

					&::before {
						position: absolute;

						content: counter(item);

						background: color(accent);
						color: #fff;
						border-radius: 100%;

						width: 20px;
						height: 20px;

						font-size: 12px;
						font-weight: 600;

						line-height: 20px;
						vertical-align: middle;
						text-align: center;
						margin-left: -28px;
					}
				}

				li + li {
					margin-top: 36px;
				}
			}

			table {
				width: 100%;
				border-collapse: collapse;

				th {
					color: color(pink);
					border-bottom: 2px solid color(pink);
					text-align: left;
					font-weight: 500;
				}

				td, th {
					padding: {
						left: 10px;
						right: 10px;
						top: 8px;
						bottom: 8px;
					}

					font-size: 14px;
				}

				td {
					vertical-align: top;
				}

				tr:nth-child(2n-1) td {
					background: color(light-background);
				}
			}

			span.version {
				display: inline-block;
				background: darken(color(light-background), 4%);
				color: desaturate(darken(color(light-background), 34%), 20%);

				font-size: 11px;
				font-weight: 600;

				padding: 2px 4px;

				vertical-align: middle;

				margin: {
					top: -2px;
					right: 1px;
				}

				border-radius: 2px;
			}
		}
	}
</style>