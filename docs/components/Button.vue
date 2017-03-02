<template>
    <a :class="['sweet-button', 'color-' + color ]" v-on:click="onClick">
		<slot></slot>
	</a>
</template>

<script>
    export default {
		name: 'Button',

		props: {
			color: {
				type: String,
				required: false,
				default: 'blue'
			},
		},

		methods: {
			onClick(e) {
				this.$emit('click', e)
			}
		}
    }
</script>

<style lang="scss">
	@import '../styles/mixins';
	@import '../styles/colors';

	.sweet-button {
		@include border-box;
		@include mp0;
		@include unselectable;

		display: inline-block;
		text-decoration: none;
		outline: 0;
		text-align: center;
		position: relative;

		font: {
			size: 14px;
			weight: 600;
		}

		padding: {
			top: 8px;
			bottom: 8px;
			left: 16px;
			right: 16px;
		}

		&, > a {
			color: #fff;
		}

		background: color(blue);

		border: 1px solid darken(color(blue), 12%);
		border-radius: 2px;

		transition: all 0.2s;

		cursor: pointer;

		&.size-big {
			font-size: 16px;
		}

		@each $name, $color in getColors() {

			&.color-#{$name} {
				background-color: $color;
				border-color: darken($color, 12%);

				&:hover {
					background-color: lighten($color, 8%);
				}

				&:active, &.active {
					background-color: darken($color, 5%);
				}
			}
		}

		& + .sweet-button {
			margin-left: 12px;
		}
	}
</style>
