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


var popup = new Vue({
	el: '#popup',

	data: {
		path: '', // index.html のフォルダへのパス．created で設定してる．

		// ---- ここだけ編集すればいい ---- //
		links: [
			{ name: 'TOP', url: 'index.html' },
			{ name: 'ABOUT', url: 'index.html#about' },
			{ name: 'PUBLICATIONS', url: 'index.html#book' },
			{ name: 'RESEARCH', url: 'index.html#research' },
			{ name: 'PROFESSORS', url: 'index.html#teacher' },
			{ name: 'MEMBERS', url: 'index.html#member' },
			{ name: 'ACCESS', url: 'index.html#info' },
			{ name: 'LECTURES', url: 'index.html' },
			{ name: 'DIARY', url: 'Diary.html' },
			// { name: '', url: '' },
		]
		// ---- ここまで ---- //
	},

	created: function(){
		if( glPopupPath != undefined )
			this.path = glPopupPath;
	}
})
