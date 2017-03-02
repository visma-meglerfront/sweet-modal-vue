<template>
	<nav class="project-navigation">
		<ul>
			<slot></slot>
		</ul>
	</nav>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	.project-navigation {
		background: #000;
		color: #fff;
		overflow-x: auto;

		ul {
			margin: 0;
			padding: 0;
			list-style-type: none;

			display: flex;

			padding: {
				left: 32px;
				right: 32px;
			}

			li {
				display: block;

				a, label {
					display: block;
					font-size: 14px;

					padding: {
						left: 24px;
						right: 24px;
						top: 14px;
						bottom: 12px;
					}
				}

				label {
					font-weight: 600;
				}

				a {
					color: #999;

					&.active {
						color: #fff;
						font-weight: 600;
					}
				}
			}
		}
	}
</style>