// global
// 記事のある年度を指定（昇順）
glYears              = [
	2013, 2014, 2015, 2016, 2017, 2018, 2019
];
glStartYear          = 2013; // 記事のある最初の年度．自動生成の場合使用．
glDiaryContentsPath  = 'src/diary/diary-contents-'; // 各年度のhtmlのパス
glDiaryContentsPath2 = 'diary-contents-'; // 各年度のhtmlのパス（階層が同じ場合）

// 操作
// 手動指定の場合
glYears = glYears.reverse(); // 降順に並び替える
// 自動生成の場合
// glYears = glGenerateYears( glStartYear );

// glStartYear から現在の年度までを格納した配列を返す
function glGenerateYears(startYear){
	var now   = new Date();       
	var year  = now.getFullYear(); // 年
	var month = now.getMonth();    // 月 0~11
	var fiscalYear, yearsLength;

	// 年度を求める
	if( month >= 3 )
		fiscalYear = year;
	else
		fiscalYear = year - 1;

	yearsLength = fiscalYear - startYear + 1;
	return [...Array( yearsLength ).keys()].map(i => i + startYear).reverse();
}

function glGenerateLink(year, path){
	return path + String(year) + '.html';
};


// vue
// 共通部分のテンプレート //
// タイトル部分
Vue.component('diary-header-component', {
	template: `
		<div>
			<!-- トップコンテンツ -->
			<div id="top">
				<div class="top-back"></div>
				<div class="top-container">
					<!-- タイトルはここだけコピペ -->
					<div class="content-titles">
				 		Diary
					</div>
					<div class="content-subtitles">
						研究室日誌
					</div>
				</div>
			</div>
			<!-- トップコンテンツ -->
		</div>
	`
})

// footer
Vue.component('diary-footer-component', {
	template: `
		<div>
			<div id="credit">
		  		Copyright Media Sensing Lab. All Rights Reserved.
			</div>
		</div>
	`
})

// diary-contents-xxxx.html 用
Vue.component('diary-contents-component', {
	props: ['year', 'contents', 'path'],

	data: function(){
		return{
			baseID: 'article-',
			years: glYears, 
			baseLink: glDiaryContentsPath2,
			givenContents: [],
			storageKey: 'diaryReverse',
			storageVal: null
		}
	},

	methods: {
		generateImgClass: function(length){
			var result;

			if( length == 1 )
				result = 'diary-contents-item-images-item1';
			else if( length < 5 )
				result = 'diary-contents-item-images-item2';
			else
				result = 'diary-contents-item-images-item3';

			return result;
		},

		// 改行に対する処理．
		// ダサいけど許して
		transformText: function(text){
			var newText = text.replace(/\t/g, '').replace(/\n\n/g, '\n');
			var result  = newText.split('\n');
			if(result.length < 3)
				return result;
			else
				return result.slice(1, result.length - 1);
		},

		contentsReverse: function(){
			this.givenContents = this.givenContents.reverse();
			this.storageVal    = !this.storageVal;
			localStorage.setItem( this.storageKey, JSON.stringify(this.storageVal) );
		}
	},

	computed: {
		titleList: function(){
			var titles = [];
			for( var i = 0; i < this.givenContents.length; ++i )
				titles.push( this.givenContents[i].title );
			return titles;
		},

		idList: function(){
			var ids = [];
			for( var i = 0; i < this.givenContents.length; ++i )
				ids.push( this.baseID + String( i + 1 ) );
			return ids;
		},

		imgClasses: function(){
			var result = [];

			for( var i = 0; i < this.givenContents.length; ++i )
				result.push( this.generateImgClass( this.givenContents[i].images.length ) );

			return result;
		},

		nextData: function(){
			var result = [ 0, '#' ]; // [ リンク先年度, リンク先URL ]
			var id = this.years.indexOf( this.year );
			if( id > 0 ){
				result[0] = this.years[id - 1];
				result[1] = glGenerateLink( result[0], this.baseLink );
			}
			console.log(result);
			return result;
		},

		previousData: function(){
			var result = [ '', '#' ]; // [ リンク先年度, リンク先URL ]
			var id = this.years.indexOf( this.year );
			if( id < this.years.length - 1 ){
				result[0] = this.years[id + 1];
				result[1] = glGenerateLink( result[0], this.baseLink );
			}
			console.log(result);
			return result;
		}
	},

	created: function(){
		this.storageVal = JSON.parse( localStorage.getItem(this.storageKey) );
		console.log(this.storageVal);
		if( this.storageVal == null || !this.storageVal ){
			this.givenContents = this.contents;
			this.storageVal = false;
		}
		else if( this.storageVal == true )
			this.givenContents = this.contents.reverse();
	},

	template: `
		<div>
			<div id="diary-contents-top">
			    <div class="breadcrumbs-box diary-container">
			    	<div class="breadcrumbs-box-btn" @click="contentsReverse()">Reverse</div>
			    	<a class="breadcrumbs-item" href="../../Diary.html">Diary</a>
			    	<a class="breadcrumbs-item" href="#">{{ year }}年度</a>
			    </div>
			    <div class="diary-contents-top-box diary-container">
			    	<a v-for="(title, index) in titleList" class="diary-contents-top-box-item" :href="'#'+idList[index]">
			    		{{ title }}
		    		</a>
			    </div>
			</div>
			<div id="diary-contents-box" class="diary-container">
			    <div v-for="(content, index) in givenContents" :id="idList[index]" class="diary-contents-item">
			    	<div class="diary-contents-item-date">{{ content.date }}</div>
			    	<div class="diary-contents-item-title">{{ content.title }}</div>
			      	<div class="diary-contents-item-text">
			      		<p v-for="line in transformText(content.text)">{{ line }}</p>
			      	</div>
			      	<div v-if="content.link.length > 0" class="diary-contents-item-link">
			      		<a v-for="link in content.link" class="diary-contents-item-link-item" :href="link.url">
			      			{{ link.name }}
			      		</a>
			      	</div>
			      	<div v-if="content.images.length > 0" class="diary-contents-item-images">
			        	<img v-for="image in content.images" :class="imgClasses[index]" :src="path + image">
			      	</div>
			    </div>
			</div>
			<div class="diary-contents-footer diary-container">
				<div v-if="previousData[0]!=0" class="diary-contents-footer-previous">
					<a :href="previousData[1]">{{ previousData[0] }}年度</a>
				</div>
				<div v-if="nextData[0]!=0" class="diary-contents-footer-next">
					<a :href="nextData[1]">{{ nextData[0] }}年度</a>
				</div>
			</div>
		</div>
	`
})

var diaryHeader = new Vue({
	el: '#diary-header'
})

var diaryFooter = new Vue({
	el: '#diary-footer'
})

// Diary.html 年度のリスト用
var diaryMain = new Vue({
	el: '#diary-top',

	data: {
		years: glYears,
		baseLink: glDiaryContentsPath,
		storageKey: 'diaryContentsYear'
	},

	methods: {
		initialize: function(){

		},

		generateLink: function(year){
			return glGenerateLink( year, this.baseLink );
		},

		// 使わない
		setYear: function(year){
			localStorage.setItem(this.storageKey, year);
		}
	},

	created: function(){
		this.initialize();
	}
})


var diaryScript = new Vue({
	el: '#diary-contents',

	data: {
		year    : diaryYear,
		contents: diaryContents,
		basePath : '../img/diary/'
	},

	computed: {
		imgPath: function(){
			return this.basePath + String(this.year) + '/';
		}
	}
})