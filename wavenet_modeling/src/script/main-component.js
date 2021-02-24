Vue.component('header-component', {
	props: ['path', 'links'],

	template: `
		<div>
			<!-- メニューがここからです -->
			<div id="menu">
				<!-- 画像を変える場合は下のタグのsrcの中のPathを変更してください -->
				<a :href="path + 'index.html'">
					<div id="menu-logo">
						MEDIA SENSING LAB.
					</div>
				</a>

				<div id="menu-name">
					Menu
				</div>

				<div id="menu-btn">
					<div id="menu-btn-bar1"></div>
					<div id="menu-btn-bar2"></div>
					<div id="menu-btn-bar3"></div>
				</div>

				<div id="menu-btnclose">
					<div id="menu-btnclose-bar1"></div>
					<div id="menu-btnclose-bar2"></div>
				</div>
			</div>
			<!-- メニューがここまでです -->

			<!-- ポップアップメニューはここから -->
			<div id="popup">
				<div id="popup-topmargin"></div>

				<!-- 編集する場合はaタグの中のURLとdivタグの中の文字を編集してください -->
				<a  v-for="link in links" :href="path + link.url">
					<div class="popup-items">
						{{ link.name }}
					</div>
				</a>
			</div>
			<!-- ポップアップメニューはここまで -->
		</div>
	`
})

Vue.component('popup-component', {
	props: ['path', 'links'],

	template: `
		<div>
			<div id="popup-topmargin"></div>

			<!-- 編集する場合はaタグの中のURLとdivタグの中の文字を編集してください -->
			<a  v-for="link in links" :href="path + link.url">
				<div class="popup-items">
					{{ link.name }}
				</div>
			</a>

		</div>
	`
})

// footer
Vue.component('footer-component', {
	template: `
		<div>
			<div id="credit">
		  		Copyright Media Sensing Lab. All Rights Reserved.
			</div>
		</div>
	`
})

var topHeader = new Vue({
	el: '#top-header',

	data: {
		path: glPopupPath, // index.html のフォルダへのパス

		// ---- ポップアップはここだけ編集すればいい ---- //
		links: [
			{ name: 'TOP', url: 'index.html' },
			{ name: 'ABOUT', url: 'index.html#about' },
			{ name: 'PUBLICATIONS', url: 'index.html#book' },
			{ name: 'RESEARCH', url: 'index.html#research' },
			{ name: 'PROFESSORS', url: 'index.html#teacher' },
			{ name: 'MEMBERS', url: 'index.html#member' },
			{ name: 'LECTURES', url: 'index.html' },
			{ name: 'DIARY', url: 'Diary.html' },
			{ name: 'ACCESS', url: 'index.html#info' },
			// { name: '', url: '' },
		]
		// ---- ここまで ---- //
	}
})

var topFooter = new Vue({
	el: '#top-footer',
})