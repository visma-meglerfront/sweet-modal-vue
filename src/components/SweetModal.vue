<template>
	<!--
		SweetModal for Vue.js
		Sweet, easy and powerful modals and dialogs

		Copyright (c) 2017 Adepto.as AS · Oslo, Norway
		Dual licensed under the MIT and GPL licenses.

		See LICENSE-MIT.txt and LICENSE-GPL.txt
	-->
	<div :class="overlay_classes" v-show="is_open" v-on:click="_onOverlayClick">
		<div :class="modal_classes" :style="modal_style">
			<div class="sweet-box-actions">
				<!-- Custom Actions -->
				<slot name="box-action"></slot>

				<!-- Close Button -->
				<div class="sweet-action-close" v-on:click="close" v-if="!hideCloseButton">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#292c34" /></svg>
				</div>
			</div>

			<!-- Title: Housing the title and tabs, if no title is present -->
			<div class="sweet-title" v-if="has_title || has_tabs">
				<!-- Tabs but no title -->
				<template v-if="has_tabs && !has_title">
					<ul class="sweet-modal-tabs">
						<li v-for="tab in tabs" :class="_getClassesForTab(tab)">
							<a href="#" v-on:click.prevent="_changeTab(tab)">
								<div class="sweet-modal-valign">
									<span v-if="tab.icon" v-html="tab.icon" class="sweet-modal-tab-icon" />
									<span class="sweet-modal-tab-title">{{ tab.title }}</span>
								</div>
							</a>
						</li>
					</ul>
				</template>

				<!-- Title -->
				<template v-if="has_title">
					<h2 v-if="title" v-html="title"></h2>
					<slot name="title"></slot>
				</template>
			</div>

			<!-- Tabs: If title AND tabs are present -->
			<ul class="sweet-modal-tabs" v-if="has_title && has_tabs">
				<li v-for="tab in tabs" :class="_getClassesForTab(tab)">
					<a href="#" v-on:click.prevent="_changeTab(tab)">
						<div class="sweet-modal-valign">
							<span v-if="tab.icon" v-html="tab.icon" class="sweet-modal-tab-icon" />
							<span class="sweet-modal-tab-title">{{ tab.title }}</span>
						</div>
					</a>
				</li>
			</ul>

			<!-- Content: Wrapper -->
			<div class="sweet-content" ref="content">
				<!-- Icon: Error -->
				<div class="sweet-modal-icon sweet-modal-error" v-if="icon == 'error'" ref="icon_error">
					<span class="sweet-modal-x-mark">
						<span class="sweet-modal-line sweet-modal-left"></span>
						<span class="sweet-modal-line sweet-modal-right"></span>
					</span>
				</div>

				<!-- Icon: Warning -->
				<div class="sweet-modal-icon sweet-modal-warning" v-if="icon == 'warning'" ref="icon_warning">
					<span class="sweet-modal-body"></span>
					<span class="sweet-modal-dot"></span>
				</div>

				<!-- Icon: Info -->
				<div class="sweet-modal-icon sweet-modal-info" v-if="icon == 'info'" ref="icon_info"></div>

				<!-- Icon: Success -->
				<div class="sweet-modal-icon sweet-modal-success" v-if="icon == 'success'" ref="icon_success">
					<span class="sweet-modal-line sweet-modal-tip"></span>
					<span class="sweet-modal-line sweet-modal-long"></span>
					<div class="sweet-modal-placeholder"></div>
					<div class="sweet-modal-fix"></div>
				</div>

				<!-- Actual Content -->
				<div class="sweet-content-content" v-if="$slots.default">
					<slot></slot>
				</div>
			</div>

			<!-- Buttons -->
			<div class="sweet-buttons" v-if="$slots.button">
				<slot name="button"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SweetModal',

		props: {
			title: {
				type: String,
				required: false,
				default: ''
			},

			overlayTheme: {
				type: String,
				required: false,
				default: 'light'
			},

			modalTheme: {
				type: String,
				required: false,
				default: 'light'
			},

			blocking: {
				type: Boolean,
				required: false,
				default: false
			},

			pulseOnBlock: {
				type: Boolean,
				required: false,
				default: true
			},

			icon: {
				type: String,
				required: false,
				default: ''
			},

			hideCloseButton: {
				type: Boolean,
				required: false,
				default: false
			},

			enableMobileFullscreen: {
				type: Boolean,
				required: false,
				default: true
			},

			width: {
				type: [Number, String],
				required: false,
				default: null
			}
		},

		mounted() {
			this.tabs = this.$children.filter(c => c.cmpName && c.cmpName == 'tab')

			if (this.has_tabs) {
				this.currentTab = this._changeTab(this.tabs[0])
			}

			document.addEventListener('keyup', this._onDocumentKeyup)
		},

		beforeDestroy() {
			document.removeEventListener('keyup', this._onDocumentKeyup)
		},

		data() {
			return {
				visible: false,
				is_open: false,
				is_bouncing: false,
				tabs: [],

				backups: {
					body: {
						height: null,
						overflow: null
					}
				}
			}
		},

		computed: {
			has_title() {
				return this.title || this.$slots.title
			},

			has_tabs() {
				return this.tabs.length > 0
			},

			has_content() {
				return this.$slots.default
			},

			current_tab() {
				return this.tabs.filter(t => t.active === true)[0]
			},

			overlay_classes() {
				return [
					'sweet-modal-overlay',
					'theme-' + this.overlayTheme,
					'sweet-modal-clickable',
					{
						'is-visible': this.visible,
						blocking: this.blocking
					}
				]
			},

			modal_classes() {
				return [
					'sweet-modal',
					'theme-' + this.modalTheme,
					{
						'has-title': this.has_title,
						'has-tabs': this.has_tabs,
						'has-content': this.has_content,
						'has-icon': this.icon,
						'is-mobile-fullscreen': this.enableMobileFullscreen,
						'is-visible': this.visible,
						'is-alert': (this.icon && !this.has_tabs) || (!this.icon && !this.title && !this.$slots.title),
						bounce: this.is_bouncing,
					}
				]
			},

			modal_style() {
				let width = this.width
				let maxWidth = null

				if (width !== null) {
					if (Number(width) == width) {
						width = width + 'px'
					}

					maxWidth = 'none'
				}

				return {
					width,
					maxWidth
				}
			}
		},

		methods: {
			/**
			 * Open the dialog
			 * Emits an event 'open'
			 *
			 * @param tabId string     Optional id or index of initial tab element.
			 */
			open(tabId = null) {
				if (tabId && this.has_tabs) {
					// Find tab with wanted id.
					let openingTabs = this.tabs.filter((tab) => {return tab.id === tabId})
					if (openingTabs.length > 0) {
						// Set current tab to first match.
						this.currentTab = this._changeTab(openingTabs[0])
					} else {
						// Try opening index instead of id as an alternative.
						let openingTab = this.tabs[tabId]
						if (openingTab) {
							this.currentTab = this._changeTab(openingTab)
						}
					}
				}

				this.is_open = true
				this._lockBody()
				this._animateIcon()

				setTimeout(() => this.visible = true, 30)
				this.$emit('open')
			},

			/**
			 * Close the dialog
			 * Emits an event 'close'
			 */
			close() {
				this.visible = false
				this._unlockBody()

				setTimeout(() => this.is_open = false, 300)
				this.$emit('close')
			},

			/**
			 * Bounce the modal.
			 */
			bounce() {
				this.is_bouncing = true

				setTimeout(() => this.is_bouncing = false, 330)
			},

			/**********************
			    INTERNAL METHODS
			 **********************/

			_lockBody() {
				this.backups.body.height = document.body.style.height
				this.backups.body.overflow = document.body.style.overflow

				document.body.style.height = '100%'
				document.body.style.overflow = 'hidden'
			},

			_unlockBody() {
				document.body.style.height = this.backups.body.height
				document.body.style.overflow = this.backups.body.overflow
			},

			_onOverlayClick(event) {
				if (!event.target.classList || event.target.classList.contains('sweet-modal-clickable')) {
					if (this.blocking) {
						if (this.pulseOnBlock) this.bounce()
					} else {
						this.close()
					}
				}
			},

			_onDocumentKeyup(event) {
				if (event.keyCode == 27) {
					if (this.blocking) {
						if (this.pulseOnBlock) this.bounce()
					} else {
						this.close()
					}
				}
			},

			_changeTab(tab) {
				this.tabs.map(t => t.active = t == tab)
				this.currentTab = tab
			},

			_getClassesForTab(tab) {
				return [
					'sweet-modal-tab',

					{
						active: tab.active,
						disabled: tab.disabled
					}
				]
			},

			_animateIcon() {
				if (!this.icon) return

				switch (this.icon) {
					case 'success':
						setTimeout(() => {
							this._applyClasses(this.$refs.icon_success, {
								'': [ 'animate' ],
								'.sweet-modal-tip': [ 'animateSuccessTip' ],
								'.sweet-modal-long': [ 'animateSuccessLong' ]
							})
						}, 80)

						break;

					case 'warning':
						this._applyClasses(this.$refs.icon_warning, {
							'': [ 'pulseWarning' ],
							'.sweet-modal-body': [ 'pulseWarningIns' ],
							'.sweet-modal-dot': [ 'pulseWarningIns' ]
						})

						break;

					case 'error':
						setTimeout(() => {
							this._applyClasses(this.$refs.icon_error, {
								'': [ 'animateErrorIcon' ],
								'.sweet-modal-x-mark': [ 'animateXMark' ]
							})
						}, 80)

						break;
				}
			},

			/**
			 * Apply classes from the classMap to $ref or children of $ref, a native
			 * DOMElement.
			 *
			 * ClassMap:
			 * {
			 *     'selector': [ 'class1', 'class2', ... ]
			 * }
			 *
			 * Empty Selector selects $ref.
			 *
			 * @param DOMNode $ref     Element to apply classes to or children of that element
			 * @param Object  classMap Class Map which elements get which classes (see doc)
			 */
			_applyClasses($ref, classMap) {
				for (let cl in classMap) {
					let classes = classMap[cl]
					let $el

					if (cl == '') {
						$el = $ref
					} else {
						$el = $ref.querySelector(cl)
					}

					$el.classList.remove(...classes)
					$el.classList.add(...classes)
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../styles/mixins';
	@import '../styles/colors';
	@import '../styles/animations';
	@import '../styles/icons';

	.sweet-modal-overlay {
		position: fixed;
		top: 0;
		left: 0;

		width: 100vw;
		height: 100vh;

		z-index: 9001;

		font-size: 14px;

		-webkit-font-smoothing: antialiased;

		// Theming
		background: rgba(#fff, 0.9);

		&.theme-dark {
			$color: color(dark-overlay);

			// background: radial-gradient(ellipse at center, rgba($color, 0.9) 0%, rgba($color, 0.96) 100%);
			background: rgba($color, 0.94);
		}

		// Animation
		opacity: 0;
		transition: opacity 0.3s;
		transform: translate3D(0, 0, 0);
		-webkit-perspective: 500px;

		&.is-visible {
			opacity: 1;
		}
	}

	.sweet-modal {
		@include border-box;

		background: #fff;
		box-shadow: 0px 8px 46px rgba(#000, 0.08),
					0px 2px  6px rgba(#000, 0.03);

		position: absolute;
		top: 50%;
		left: 50%;
		// transform: translate(-50%, -50%); // Done by the animation later

		width: 80%;
		max-width: 640px;
		max-height: 100vh;
		overflow-y: auto;

		border-radius: 2px;

		.sweet-box-actions {
			position: absolute;
			top: 12px;
			right: 12px;

			.sweet-action-close {
				display: inline-block;
				cursor: pointer;

				color: color(dark);
				text-align: center;

				width: 42px;
				height: 42px;
				line-height: 42px;

				border-radius: 50%;

				svg {
					width: 24px;
					height: 24px;

					vertical-align: middle;
					margin-top: -2px;

					@include svg-path(true) {
						fill: currentColor;
					}
				}

				&:hover {
					background: color(blue);
					color: #fff;
				}
			}
		}

		.sweet-title {
			@include ellipsis;

			height: 64px;
			line-height: 64px;

			border-bottom: 1px solid color(border);

			padding: {
				left: 32px;
				right: 64px;
			}

			> h2 {
				@include ellipsis;
				@include mp0;

				font-weight: 500;
				font-size: 22px;
			}
		}

		ul.sweet-modal-tabs {
			@include ulreset;

			display: flex;
			align-items: center;
			width: calc(100% + 32px);
			height: 100%;

			margin-left: -32px;
			overflow-x: auto;

			li.sweet-modal-tab {
				display: block;
				height: 100%;

				a {
					@include ellipsis;

					display: flex;
					align-items: center;

					padding: {
						left: 20px;
						right: 20px;
					}

					color: color(dark);
					text-decoration: none;
					text-align: center;

					height: 100%;

					span.sweet-modal-tab-title {
						display: block;
					}

					span.sweet-modal-tab-icon {
						display: block;
						line-height: 1.0;

						svg, img {
							width: 16px;
							height: 16px;

							@include svg-path(true) {
								fill: currentColor;
							}
						}
					}

					span.sweet-modal-tab-icon + span.sweet-modal-tab-title {
						line-height: 1.0;
						margin-top: 8px;
					}
				}

				&:first-child a {
					padding-left: 32px;
				}

				&.active a {
					font-weight: 600;
					color: color(blue);
				}

				&.disabled a {
					@include unclickable;
					color: color(light-grey);
				}
			}
		}

		&.has-tabs:not(.has-title) {

			.sweet-title {
				height: 84px;
				line-height: 84px;
			}
		}

		&.has-tabs.has-title {

			ul.sweet-modal-tabs {
				width: 100%;
				height: 48px;

				margin: 0;
				border-bottom: 1px solid color(border);

				li.sweet-modal-tab a {
					margin-top: -4px;

					span.sweet-modal-tab-icon {
						display: inline-block;

						svg, img {
							vertical-align: middle;

							margin: {
								top: -2px;
								right: 8px;
							}
						}
					}

					span.sweet-modal-tab-title {
						display: inline-block;
					}
				}
			}
		}

		.sweet-content {
			display: flex;
			align-items: center;

			padding: {
				left: 32px;
				right: 32px;
				top: 24px;
				bottom: 24px;
			}

			line-height: 1.5;

			.sweet-content-content {
				flex-grow: 1;
			}

			.sweet-modal-tab:not(.active) {
				display: none;
			}

			.sweet-modal-icon {
				margin-bottom: 36px;
			}
		}

		.sweet-buttons {
			text-align: right;

			padding: {
				left: 20px;
				right: 20px;
				top: 12px;
				bottom: 12px;
			}
		}

		.sweet-content + .sweet-buttons {
			border-top: 1px solid color(border);
		}

		// Special Styles
		&.is-alert {

			.sweet-content {
				display: block;

				text-align: center;
				font-size: 16px;

				padding: {
					top: 64px;
					bottom: 64px;
				}
			}
		}

		&.has-tabs.has-icon .sweet-content {
			padding: {
				top: 32px;
				bottom: 32px;
			}

			.sweet-content-content {
				padding-left: 32px;
			}

			.sweet-modal-icon {
				margin-bottom: 0;
			}
		}

		&:not(.has-content) {

			.sweet-modal-icon {
				margin-bottom: 0;
			}
		}

		// Theming
		&.theme-dark {
			$color: color(dark-modal);

			background: $color;
			color: #fff;

			.sweet-box-actions {

				.sweet-action-close {
					color: #fff;
				}
			}

			.sweet-title {
				border-bottom-color: darken($color, 8%);
				box-shadow: 0px 1px 0px lighten($color, 8%);
			}

			ul.sweet-modal-tabs li {

				a {
					color: #fff;
				}

				&.active a {
					color: color(blue);
				}

				&.disabled a {
					color: lighten($color, 20%);
				}
			}

			&.has-tabs.has-title {

				ul.sweet-modal-tabs {
					border-bottom-color: darken($color, 8%);
					box-shadow: 0px 1px 0px lighten($color, 8%);
				}
			}

			.sweet-content + .sweet-buttons {
				border-top-color: lighten($color, 8%);
				box-shadow: 0px -1px 0px darken($color, 8%);
			}
		}

		// Animation
		transform: scale(0.9) translate(calc(-50% - 32px), -50%);
		opacity: 0;

		transition: {
			property: transform, opacity;
			duration: 0.3s;
			delay: 0.05s;
			timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);
		}

		.sweet-buttons,
		.sweet-content {
			opacity: 0;

			transition: {
				property: transform, opacity;
				duration: 0.3s;
				delay: 0.09s;
				timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);
			}
		}

		.sweet-content {
			transform: translateY(-8px);
		}

		.sweet-buttons {
			transform: translateY(16px);
		}

		&.is-visible {
			transform: translate(-50%, -50%);
			opacity: 1;

			.sweet-buttons,
			.sweet-content {
				transform: none;
				opacity: 1;
			}
		}

		&.bounce {
			animation-name: bounce;
			animation-duration: 0.3s;
			animation-iteration-count: 2;
			animation-direction: alternate;
		}

		// Responsiveness
		@include media(desktop) {
			// Bouncing animation
			@keyframes bounce {
				0% {
					transform: scale(1) translate(-50%, -50%);
				}

				50% {
					transform: scale(1.02) translate(calc(-50% + 8px), -50%);
				}

				100% {
					transform: scale(1) translate(-50%, -50%);
				}
			}
		}

		&.is-mobile-fullscreen {
			
			@include media(mobile) {

				& {
					width: 100%;
					height: 100vh;

					left: 0;
					top: 0;

					transform: scale(0.9);

					&.is-visible {
						transform: none;
					}
				}

				.sweet-buttons {
					@include border-box;

					position: absolute;
					bottom: 0;
					left: 0;

					width: 100%;
				}
			}
		}
	}
</style>
