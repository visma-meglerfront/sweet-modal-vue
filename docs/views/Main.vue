<template>
	<div id="main">
		<project-navigation>
			<li><label>Projects:</label></li>
			<li><a href="#" class="active">SweetModal for Vue.js</a></li>
			<li><a href="http://sweet-modal.adepto.as/">SweetModal for jQuery</a></li>
			<li><a href="http://sweet-dropdown.adepto.as/">SweetDropdown for jQuery</a></li>
		</project-navigation>

		<header>
			<div class="meta">
				<div class="logo">
					<img src="images/logo.svg" class="main" />
					<img src="images/for-vue.svg" class="for" />
				</div>

				<div class="action">
					<a href="https://github.com/adeptoas/sweet-modal-vue">
						View on

						<span class="github">
							<svg viewBox="0 0 24 24">
								<path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
							</svg>

							GitHub
						</span>
					</a>
				</div>
			</div>

			<div class="pitch">
				<h2>
					The sweetest library to happen to modals.<br />
					Now available for Vue.js.
				</h2>
			</div>
		</header>

		<div class="header-decoration"></div>

		<content-section title="Examples" class="examples">
			<p class="grey">
				Please note that <code>&lt;sweet-button&gt;</code> is an implementation
				specific to these examples.<br />
				You need to implement your own buttons for use with SweetModal.
			</p>

			<br /><br />

			<h3>Alerts</h3>

			<example action-title="Regular Alert" v-on:action="openExample('regularAlert')" :code="examples.regularAlert" language="xml">
				<sweet-modal ref="regularAlert">
					This is an alert.
					</sweet-modal>
			</example>

			<example action-title="Success Alert" v-on:action="openExample('successAlert')" :code="examples.successAlert" language="xml">
				<sweet-modal ref="successAlert" icon="success">
					This is a success!
					</sweet-modal>
			</example>

			<example action-title="Warning Alert" v-on:action="openExample('warningAlert')" :code="examples.warningAlert" language="xml">
				<sweet-modal ref="warningAlert" icon="warning">
					This is a warning!
				</sweet-modal>
			</example>

			<example action-title="Alert with Error and Button" v-on:action="openExample('errorAndButtonAlert')" :code="examples.errorAndButtonAlert" language="xml">
				<sweet-modal ref="errorAndButtonAlert" icon="error" title="Oh noes…">
					This is an error…

					<sweet-button slot="button">That's fine!</sweet-button>
				</sweet-modal>
			</example>

			<example action-title="Dark with Blocking Error" v-on:action="openExample('darkWithBlockingError')" :code="examples.darkWithBlockingError" language="xml">
				<sweet-modal ref="darkWithBlockingError" icon="error" hide-close-button blocking overlay-theme="dark" modal-theme="dark">
					This is an error…

					<sweet-button slot="button" color="red" v-on:click="closeExample('darkWithBlockingError')">Press this Button</sweet-button>
				</sweet-modal>
			</example>

			<example action-title="Dark with HTML Content" v-on:action="openExample('darkWithHTMLContent')" :code="examples.darkWithHTMLContent" language="xml">
				<sweet-modal ref="darkWithHTMLContent" modal-theme="dark" overlay-theme="dark">
					This is <b>HTML</b>-<i>Content</i>.
					<br /><br />

					<iframe width="560" height="315" src="https://www.youtube.com/embed/4xgx4k83zzc" frameborder="0" allowfullscreen></iframe>
				</sweet-modal>
			</example>

			<example action-title="Additional Window Controls" v-on:action="openExample('additionalWindowControls')" :code="examples.additionalWindowControls" language="xml">
				<sweet-modal ref="additionalWindowControls" title="Alert">
					This is an alert.

					<template slot="box-action">
						<a href="#">Action 1</a> &nbsp;
						<a href="#">Action 2</a>
					</template>
				</sweet-modal>
			</example>

			<example action-title="Ultra Wide" v-on:action="openExample('ultraWide')" :code="examples.ultraWide" language="xml">
				<sweet-modal ref="ultraWide" title="Ultra Wide" width="100%">
					This is a very wide modal.
				</sweet-modal>
			</example>

			<h3>Tabbed Content</h3>

			<example action-title="Tabbed Modal" v-on:action="openExample('tabbedModal')" :code="examples.tabbedModal" language="xml">
				<sweet-modal ref="tabbedModal">
					<sweet-modal-tab title="Tab 1" id="tab1">Contents of Tab 1</sweet-modal-tab>
					<sweet-modal-tab title="Tab 2" id="tab2">Contents of Tab 2</sweet-modal-tab>
					<sweet-modal-tab title="Tab 3" id="tab3" disabled>Tab 3 is disabled</sweet-modal-tab>
				</sweet-modal>
			</example>

			<example action-title="Tabbed Modal with Icons" v-on:action="openExample('tabbedModalWithIcons')" :code="examples.tabbedModalWithIcons" language="xml">
				<sweet-modal ref="tabbedModalWithIcons">
					<sweet-modal-tab title="Tab 1" id="tab1" :icon="icons.hexagon">Contents of Tab 1</sweet-modal-tab>
					<sweet-modal-tab title="Tab 2" id="tab2" :icon="icons.flower">Contents of Tab 2</sweet-modal-tab>
					<sweet-modal-tab title="Tab 3" id="tab3" :icon="icons.compare" disabled>Tab 3 is disabled</sweet-modal-tab>
					<!-- icons is an object containing SVG strings -->
				</sweet-modal>
			</example>

			<example action-title="Tabbed Modal with Title" v-on:action="openExample('tabbedModalWithTitle')" :code="examples.tabbedModalWithTitle" language="xml">
				<sweet-modal ref="tabbedModalWithTitle" title="This is a Tabbed Modal">
					<sweet-modal-tab title="Tab 1" id="tab1" :icon="icons.hexagon">Contents of Tab 1</sweet-modal-tab>
					<sweet-modal-tab title="Tab 2" id="tab2" :icon="icons.flower">Contents of Tab 2</sweet-modal-tab>
					<sweet-modal-tab title="Tab 3" id="tab3" :icon="icons.compare" disabled>Tab 3 is disabled</sweet-modal-tab>
					<!-- icons is an object containing SVG strings -->
				</sweet-modal>
			</example>

			<example action-title="Tabbed Modal with Icons and Buttons" v-on:action="openExample('tabbedModalWithIconsAndButtons')" :code="examples.tabbedModalWithIconsAndButtons" language="xml">
				<sweet-modal ref="tabbedModalWithIconsAndButtons">
					<sweet-modal-tab title="Tab 1" id="tab1" :icon="icons.hexagon">Contents of Tab 1</sweet-modal-tab>
					<sweet-modal-tab title="Tab 2" id="tab2" :icon="icons.flower">Contents of Tab 2</sweet-modal-tab>
					<sweet-modal-tab title="Tab 3" id="tab3" :icon="icons.compare" disabled>Tab 3 is disabled</sweet-modal-tab>
					<!-- icons is an object containing SVG strings -->

					<sweet-button slot="button" color="light-grey">Action 2</sweet-button>
					<sweet-button slot="button">Action 1</sweet-button>
				</sweet-modal>
			</example>

			<example action-title="Nested" v-on:action="openExample('nested')" :code="examples.nested" language="xml">
				<sweet-modal ref="nested">
					This is the parent modal.

					<sweet-button slot="button" v-on:click="$refs.nestedChild.open()">Open Child Modal</sweet-button>
				</sweet-modal>

				<sweet-modal ref="nestedChild">
					This is the child modal.
				</sweet-modal>
			</example>

			<example action-title="Very Long Modal" v-on:action="openExample('longModal')" :code="examples.longModal" language="xml">
				<sweet-modal ref="longModal">
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

					Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 

					Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.

					Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.

					Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.

					At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.

					Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.

					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

					Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

					Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.

					Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.

					Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.
				</sweet-modal>
			</example>
		</content-section>

		<content-section title="Install Globally" class="install">
			<p class="grey">If you want convenience.</p>

			<ol>
				<li>
					Install sweet-modal-vue using npm: <code>npm install sweet-modal-vue</code>
				</li>

				<li>
					Import sweet-modal-vue globally:<br />

					<sweet-code light><code class="javascript">import SweetModal from 'sweet-modal-vue/plugin.js'<br />Vue.use(SweetModal)</code></sweet-code>
				</li>
			</ol>
		</content-section>

		<content-section class="or"><h3><span>OR</span></h3></content-section>

		<content-section title="Install per Component" class="install">
			<p class="grey">If you don't want to install SweetModal globally.</p>

			<ol>
				<li>
					Install sweet-modal-vue using npm: <code>npm install sweet-modal-vue</code>
				</li>

				<li>
					Import sweet-modal-vue into your component:<br />

					<sweet-code light><code class="javascript">import { SweetModal, SweetModalTab } from 'sweet-modal-vue'</code></sweet-code>
				</li>

				<li>
					Tell Vue that your component uses SweetModal:<br />

					<sweet-code light><code class="javascript">{
	components: {
		SweetModal,
		SweetModalTab
	}

	...
}</code></sweet-code>
				</li>
			</ol>
		</content-section>

		<content-section title="Usage" class="install usage">
			<ol>
				<li>
					Create your modal using one of the examples above.
				</li>

				<li>
					Give your modal a ref, i.e. <sweet-code inline light><code language="xml">ref="modal"</code></sweet-code>.
				</li>

				<li>
					Open your modal by calling <sweet-code inline light><code language="javascript">this.$refs.modal.open()</code></sweet-code>.<br />
					If your modal has tabs and you want to open a specific tab, supply the tab's ID as the first argument:
					<sweet-code inline light><code language="javascript">this.$refs.modal.open('tab1')</code></sweet-code>
				</li>
			</ol>
		</content-section>

		<content-section title="Attributes: SweetModal" class="attributes">
			<table class="doc">
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Default</th>
					<th>Description</th>
				</tr>

				<tr>
					<td>title</td>
					<td>String</td>
					<td>null</td>
					<td>Title of the modal, shown at the top</td>
				</tr>

				<tr>
					<td>blocking</td>
					<td>Boolean</td>
					<td>false</td>
					<td>If true, user cannot close the modal by clicking on the overlay.</td>
				</tr>

				<tr>
					<td>pulse-on-block</td>
					<td>Boolean</td>
					<td>true</td>
					<td>
						<span class="version">v1.1+</span>
						If false, disabled pulse effect when user clicks outside a blocking modal.
					</td>
				</tr>

				<tr>
					<td>icon</td>
					<td>String</td>
					<td>null</td>
					<td>
						Animated icon to show upon opening the modal. One of these values:<br />
						- success<br />
						- info<br />
						- warning</br />
						- error<br />
					</td>
				</tr>

				<tr>
					<td>hide-close-button</td>
					<td>Boolean</td>
					<td>false</td>
					<td>If true, close button is hidden.</td>
				</tr>

				<tr>
					<td>width</td>
					<td>String, Number</td>
					<td>null</td>
					<td>
						<span class="version">v2.0+</span>
						Set the width of the modal. By default this is a "clever" width depending on
						browser width.<br />
						Numbers are interpreted as pixels, string are interpreted as-is.
					</td>
				</tr>

				<tr>
					<td>enable-mobile-fullscreen</td>
					<td>Boolean</td>
					<td>true</td>
					<td>
						<span class="version">v2.0+</span>
						If true, modal becomes fullscreen on mobile devices for better legibility.
					</td>
				</tr>

				<tr>
					<td>overlay-theme</td>
					<td>String</td>
					<td>light</td>
					<td>Theme of the overlay; light or dark.</td>
				</tr>

				<tr>
					<td>modal-theme</td>
					<td>String</td>
					<td>light</td>
					<td>Theme of the modal; light or dark.</td>
				</tr>
			</table>
		</content-section>

		<content-section title="Slots: SweetModal" class="slots">
			<table class="doc">
				<tr>
					<th>Name</th>
					<th>Description</th>
				</tr>

				<tr>
					<td>box-action</td>
					<td>An action to be displayed next to the close button.</td>
				</tr>

				<tr>
					<td>title</td>
					<td>Title of the modal, if not given via the title attribute.</td>
				</tr>

				<tr>
					<td>button</td>
					<td>Button or Action to be displayed underneath the modal.</td>
				</tr>

				<tr>
					<td>default</td>
					<td>Content of the Modal.</td>
				</tr>
			</table>
		</content-section>

		<content-section title="Events: SweetModal" class="events">
			<table class="doc">
				<tr>
					<th>Name</th>
					<th>Description</th>
				</tr>

				<tr>
					<td>open</td>
					<td>When the modal is being opened.</td>
				</tr>

				<tr>
					<td>close</td>
					<td>When the modal is being closed.</td>
				</tr>
			</table>
		</content-section>

		<content-section title="Attributes: SweetModalTab" class="attributes">
			<table class="doc">
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Default</th>
					<th>Description</th>
				</tr>

				<tr>
					<td>id*</td>
					<td>String</td>
					<td>–</td>
					<td>ID of the tab, required</td>
				</tr>

				<tr>
					<td>title*</td>
					<td>String</td>
					<td>–</td>
					<td>Title displayed in the navigation, required</td>
				</tr>

				<tr>
					<td>icon</td>
					<td>String</td>
					<td>null</td>
					<td>
						An SVG string of an icon to be displayed in the navigation.<br />
						All fills will be overridden so make sure to use a mono-color icon.
					</td>
				</tr>

				<tr>
					<td>disabled</td>
					<td>Boolean</td>
					<td>false</td>
					<td>If true, user cannot navigate to this tab.</td>
				</tr>
			</table>
		</content-section>

		<content-section title="License &amp; Copyright">
			<pre>&lt;!--
	SweetModal for Vue.js
	Sweet, easy and powerful modals and dialogs

	Copyright (c) {{ year }} Adepto.as AS · Oslo, Norway
	Dual licensed under the MIT and GPL licenses.

	See LICENSE-MIT.txt and LICENSE-GPL.txt
--&gt;</pre>
		</content-section>

		<footer>
			<div class="copyright">
				&copy; {{ year }} <img src="https://assets.adepto.as/images/adepto/branding/logo_grey.svg" /> &nbsp;
				This plugin is dual-licensed under the MIT- and GPLv2-licenses.<br />
				For help, visit <a href="https://github.com/adeptoas/sweet-modal-vue/issues">the issues section</a> of this repository.
			</div>

			<div class="links">
				<a href="https://github.com/adeptoas">
					<svg viewBox="0 0 24 24">
						<path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
					</svg>

					GitHub
				</a>
			</div>
		</footer>
	</div>
</template>

<script>
	import SweetButton from '../components/Button'
	import SweetCode from '../components/Code'
	import ProjectNavigation from '../components/ProjectNavigation'
	import ContentSection from '../components/ContentSection'
	import Example from '../components/Example'

	export default {
		name: 'MainView',

		components: {
			SweetButton,
			SweetCode,
			ProjectNavigation,
			ContentSection,
			Example,
		},

		computed: {
			year() {
				return new Date().getFullYear()
			},

			icons() {
				return {
					hexagon: '<svg viewBox="0 0 24 24"><path fill="#000000" d="M10.25,2C10.44,2 10.61,2.11 10.69,2.26L12.91,6.22L13,6.5L12.91,6.78L10.69,10.74C10.61,10.89 10.44,11 10.25,11H5.75C5.56,11 5.39,10.89 5.31,10.74L3.09,6.78L3,6.5L3.09,6.22L5.31,2.26C5.39,2.11 5.56,2 5.75,2H10.25M10.25,13C10.44,13 10.61,13.11 10.69,13.26L12.91,17.22L13,17.5L12.91,17.78L10.69,21.74C10.61,21.89 10.44,22 10.25,22H5.75C5.56,22 5.39,21.89 5.31,21.74L3.09,17.78L3,17.5L3.09,17.22L5.31,13.26C5.39,13.11 5.56,13 5.75,13H10.25M19.5,7.5C19.69,7.5 19.86,7.61 19.94,7.76L22.16,11.72L22.25,12L22.16,12.28L19.94,16.24C19.86,16.39 19.69,16.5 19.5,16.5H15C14.81,16.5 14.64,16.39 14.56,16.24L12.34,12.28L12.25,12L12.34,11.72L14.56,7.76C14.64,7.61 14.81,7.5 15,7.5H19.5Z" /></svg>',
					flower: '<svg viewBox="0 0 24 24"><path fill="#000000" d="M12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16M18.7,12.4C18.42,12.24 18.13,12.11 17.84,12C18.13,11.89 18.42,11.76 18.7,11.6C20.62,10.5 21.69,8.5 21.7,6.41C19.91,5.38 17.63,5.3 15.7,6.41C15.42,6.57 15.16,6.76 14.92,6.95C14.97,6.64 15,6.32 15,6C15,3.78 13.79,1.85 12,0.81C10.21,1.85 9,3.78 9,6C9,6.32 9.03,6.64 9.08,6.95C8.84,6.75 8.58,6.56 8.3,6.4C6.38,5.29 4.1,5.37 2.3,6.4C2.3,8.47 3.37,10.5 5.3,11.59C5.58,11.75 5.87,11.88 6.16,12C5.87,12.1 5.58,12.23 5.3,12.39C3.38,13.5 2.31,15.5 2.3,17.58C4.09,18.61 6.37,18.69 8.3,17.58C8.58,17.42 8.84,17.23 9.08,17.04C9.03,17.36 9,17.68 9,18C9,20.22 10.21,22.15 12,23.19C13.79,22.15 15,20.22 15,18C15,17.68 14.97,17.36 14.92,17.05C15.16,17.25 15.42,17.43 15.7,17.59C17.62,18.7 19.9,18.62 21.7,17.59C21.69,15.5 20.62,13.5 18.7,12.4Z" /></svg>',
					compare: '<svg viewBox="0 0 24 24"><path fill="#000000" d="M19,3H14V5H19V18L14,12V21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10,18H5L10,12M10,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H10V23H12V1H10V3Z" /></svg>',
				}
			},

			examples() {
				return {
					regularAlert: `<sweet-modal>This is an alert.</sweet-modal>`,

					successAlert: `<sweet-modal icon="success">
						This is a success!
					</sweet-modal>`,

					warningAlert: `<sweet-modal icon="warning">
						This is a warning!
					</sweet-modal>`,

					errorAndButtonAlert: `<sweet-modal icon="error" title="Oh noes…">
						This is an error…

						<sweet-button slot="button">That's fine!</sweet-button>
					</sweet-modal>`,

					darkWithBlockingError: `<sweet-modal icon="error" hide-close-button blocking overlay-theme="dark" modal-theme="dark">
						This is an error…

						<sweet-button slot="button" color="red" v-on:click="closeExample('darkWithBlockingError')">Press this Button</sweet-button>
					</sweet-modal>`,

					darkWithHTMLContent: `<sweet-modal modal-theme="dark" overlay-theme="dark">
						This is <b>HTML</b>-<i>Content</i>.
						<br /><br />

						<iframe width="560" height="315" src="https://www.youtube.com/embed/4xgx4k83zzc" frameborder="0" allowfullscreen></iframe>
					</sweet-modal>`,

					additionalWindowControls: `<sweet-modal title="Alert">
						This is an alert.

						<template slot="box-action">
							<a href="#">Action 1</a> &nbsp;
							<a href="#">Action 2</a>
						</template>
					</sweet-modal>`,

					ultraWide: `<sweet-modal title="Ultra Wide" width="100%">
						This is a very wide modal.
					</sweet-modal>`,

					tabbedModal: `<sweet-modal>
						<sweet-modal-tab title="Tab 1" id="tab1">Contents of Tab 1</sweet-modal-tab>
						<sweet-modal-tab title="Tab 2" id="tab2">Contents of Tab 2</sweet-modal-tab>
						<sweet-modal-tab title="Tab 3" id="tab3" disabled>Tab 3 is disabled</sweet-modal-tab>
					</sweet-modal>`,

					tabbedModalWithIcons: `<sweet-modal>
						<sweet-modal-tab title="Tab 1" id="tab1" :icon="icons.hexagon">Contents of Tab 1</sweet-modal-tab>
						<sweet-modal-tab title="Tab 2" id="tab2" :icon="icons.flower">Contents of Tab 2</sweet-modal-tab>
						<sweet-modal-tab title="Tab 3" id="tab3" :icon="icons.compare" disabled>Tab 3 is disabled</sweet-modal-tab>
						<!-- icons is an object containing SVG strings -->
					</sweet-modal>`,

					tabbedModalWithTitle: `<sweet-modal title="This is a Tabbed Modal">
						<sweet-modal-tab title="Tab 1" id="tab1" :icon="icons.hexagon">Contents of Tab 1</sweet-modal-tab>
						<sweet-modal-tab title="Tab 2" id="tab2" :icon="icons.flower">Contents of Tab 2</sweet-modal-tab>
						<sweet-modal-tab title="Tab 3" id="tab3" :icon="icons.compare" disabled>Tab 3 is disabled</sweet-modal-tab>
						<!-- icons is an object containing SVG strings -->
					</sweet-modal>
					`,

					tabbedModalWithIconsAndButtons: `<sweet-modal>
						<sweet-modal-tab title="Tab 1" id="tab1" :icon="icons.hexagon">Contents of Tab 1</sweet-modal-tab>
						<sweet-modal-tab title="Tab 2" id="tab2" :icon="icons.flower">Contents of Tab 2</sweet-modal-tab>
						<sweet-modal-tab title="Tab 3" id="tab3" :icon="icons.compare" disabled>Tab 3 is disabled</sweet-modal-tab>
						<!-- icons is an object containing SVG strings -->

						<sweet-button slot="button" color="light-grey">Action 2</sweet-button>
						<sweet-button slot="button">Action 1</sweet-button>
					</sweet-modal>`,

					nested: `<sweet-modal>
						This is the parent modal.

						<sweet-button slot="button" v-on:click="$refs.nestedChild.open()">Open Child Modal</sweet-button>
					</sweet-modal>

					<sweet-modal ref="nestedChild">
						This is the child modal.
					</sweet-modal>`,

					longModal: `<sweet-modal>
						Lorem ipsum [...]
					</sweet-modal>`
				}
			}
		},

		methods: {
			openExample(ref) {
				if (this.$refs[ref]) {
					this.$refs[ref].open()
				} else {
					throw new Error('Example Ref not defined: ' + ref)
				}
			},

			closeExample(ref) {
				if (this.$refs[ref]) {
					this.$refs[ref].close()
				} else {
					throw new Error('Example Ref not defined: ' + ref)
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../styles/colors';
	@import '../styles/mixins';

	nav.project-navigation {
		background: darken(color(header), 4%);

		ul li {
			$color: hsl(hue(color(header)), 12%, 40%);

			label {
				color: $color;
			}

			a {
				color: $color;

				&:hover {
					color: #fff;
				}

				&.active {
					background: color(header);
				}
			}
		}
	}

	a {
		color: color(pink);
	}

	header {
		background: color(header);
		color: #fff;

		padding: {
			top: 64px;
		}

		.meta,
		.pitch {
			@include max-width;
		}

		.meta {
			display: flex;
			align-items: flex-end;

			.logo {
				width: 64%;

				img {
					vertical-align: bottom;

					&.main {
						height: 28px;
					}

					&.for {
						margin-bottom: -4px;
						margin-left: 4px;
					}
				}
			}

			.action {
				width: 36%;
				text-align: right;

				a {
					color: color(pink);
					font-size: 16px;
					font-weight: 500;

					svg {
						vertical-align: middle;
						margin-top: -4px;

						width: 24px;
						height: 24px;
					}

					span.github {
						display: inline-block;
						vertical-align: middle;
						margin-left: 6px;

						font-size: 20px;
						font-weight: 600;

						color: #fff;
					}

					&:hover {
						color: #fff;
					}
				}
			}
		}

		.pitch {
			margin-top: 48px;

			h2 {
				@include mp0;
				font-weight: 400;
			}
		}
	}

	.header-decoration {
		height: 64px;
		background: linear-gradient(to top left, transparent 50%, color(header) 51%);

		margin: {
			bottom: 36px;
		}
	}

	p.grey {
		color: color(light-grey);
	}

	.content-section {

		&.install {
			background: color(light-background);

			padding: {
				top: 64px;
				bottom: 64px;
			}

			margin: {
				top: 32px;
				bottom: 32px;
			}

			> .content p:first-child {
				margin-top: -24px;
				margin-bottom: 56px;
			}
		}

		&.or {
			padding: 0;

			margin: {
				top: -24px;
				bottom: -24px;
			}

			.content {

				h3 {
					@include mp0;

					display: block;
					text-align: center;

					position: relative;

					&::before {
						content: '';
						display: block;

						background: color(border);

						height: 1px;
						width: 100%;

						position: absolute;
						top: calc(50% - 1px);
						left: 0;
						z-index: 2;
					}

					span {
						position: relative;
						z-index: 3;

						display: inline-block;
						background: #fff;
						color: color(accent);

						padding: 2px 8px;
					}
				}
			}
		}
	}

	footer {
		background: color(light-background);
		color: color(light-grey);
		font-size: 13px;

		display: flex;
		align-items: center;

		padding: {
			left: 32px;
			right: 32px;
			top: 20px;
			bottom: 20px;
		}

		.copyright {
			width: 60%;

			img {
				height: 16px;
				vertical-align: middle;
				margin-top: -1px;
			}
		}

		.links {
			width: 40%;
			text-align: right;

			a {
				display: inline-block;
				font-size: 14px;

				svg {
					width: 22px;
					height: 22px;

					vertical-align: middle;

					margin: {
						top: -3px;
						right: 4px;
					}
				}
			}
		}
	}
</style>
