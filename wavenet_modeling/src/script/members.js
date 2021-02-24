// --------------------------------- //
// トップページ MEMBER 用のテンプレート
// --------------------------------- //

// members に要素があれば表示される
Vue.component('member-style', {
	props: ['title', 'members'],

	template: `
		<div v-if="members.length > 0">
			<div class="member-title">
				{{ title }}
			</div>

			<div class="member-box">
				<div v-for="member in members" class="member-box-items">
					{{ member }}
				</div>
			</div>
		</div>
	`
})

var members = new Vue({
	el: '#member',

	data: {
		d3: {
			title: '博士3回生',
			// members: いないときは要素は空で
			members: [
				// '', 
			]
		},

		d2: {
			title: '博士2回生',
			// members: いないときは要素は空で
			members: [
				// '', 
			]
		},

		d1: {
			title: '博士1回生',
			// members: いないときは要素は空で
			members: [
				// '', 
			]
		},

		m2: {
			title: '修士2回生',
			members: [
				'高橋　悠希', '松浦　功一郎', '山本　宏哉', 'Yao Sai'
			]
		},

		m1: {
			title: '修士1回生',
			members: [
				'吉本　健人'
			]
		},

		b4: {
			title: '学部4回生',
			members: [
				'河野　翔太', '北村　隆一朗', '五味　若菜', '阪　大樹', '佐々木　裕生', 
				'少路　春希', '高倉　一輝', '田中　弘樹', '田村　海渡'
			]
		},

		b3: {
			title: '学部3回生',
			// members: B3がいないときは要素は空で
			members: [
	            '中川　遥貴', '李　瑭'
			]
		},


	}
})