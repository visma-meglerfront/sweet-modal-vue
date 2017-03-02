<template>
    <div :class="['sweet-modal-tab', { active }]">
		<slot></slot>
	</div>
</template>

<script>
    export default {
		props: {
			title: {
				type: String,
				required: true,
			},

			id: {
				type: String,
				required: true
			},

			icon: {
				type: String,
				required: false,
				default: null
			},

			disabled: {
				type: Boolean,
				required: false,
				default: false
			}
		},

		data() {
			return {
				active: false
			}
		},

		computed: {
			cmpName() {
				return 'tab'
			}
		}
    }
</script>

<style lang="scss">

</style>
