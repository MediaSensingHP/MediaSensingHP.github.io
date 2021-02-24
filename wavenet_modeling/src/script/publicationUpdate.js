// ----------------------------------------------------------------------------- //
// publication.html 用
// テンプレートと関数
//
// [必須事項]
// <script src="https://cdn.jsdelivr.net/npm/vue"></script>
// <script type="text/javascript" src="http://www.google.com/jsapi"></script>
// <script type="text/javascript">google.load("visualization", "1");</script>
// <script src="src/script/functions.js"></script>
// [参考]
// https://qiita.com/ms32/items/0d52120ebca3e775f747
// [strictモード]
// https://qiita.com/miri4ech/items/ffcebaf593f5baa1c112
// ----------------------------------------------------------------------------- //

var publications = new Vue({
    el: '#book',
    data: {
        // 論文リスト用スプレッドシート
        sheetUrl: 'https://docs.google.com/spreadsheets/d/1VDZ3UVoOXoiGHRp5JXsnCSZqhlhBuneW5qc8TQ6HkAk/edit#gid=0', // URL
        sheetData: [], // 読み込み結果を格納する
    },
    methods: {
        // シート読み込み
        main: function(){
            var query = new google.visualization.Query(this.sheetUrl);
            query.send( this.sheetCallback ); 
        },

        // コールバック
        sheetCallback: function(response){
            "use strict";

            // データの格納
            var rowData = readSpreadsheet(response);

            // データの整形
            this.sheetData = this.dataShaping(rowData);
            console.log('loaded');
        },

        // データの整形
        dataShaping: function(sheet){
            // 整形した結果
            var shapedData = []; 

            // [7]にアップデート用のメッセージが入ってる
            var messages = transpose(sheet)[6]

            // 空白のデータを除外
            shapedData = messages.filter(function(element){
                return element != null;
            });
            console.log(shapedData.length);

            // シートでは下に行くほど新しい論文なので逆順にする
            shapedData = shapedData.reverse();

            return shapedData;
        }
    },

    created: function(){
        this.main();
    }
})


// publication-list
Vue.component('publication-update-messages', {
    props: ['contents'], // contents: sheetDataでバインドしてください
    data: function(){
        return{
            max: 5, // 表示するメッセージの上限数
        }
    },

    computed: {
        messages: function(){
            var result = [];

            // 上限だけデータを格納
            for(var i = 0; i < this.max && i < this.contents.length; ++i){
                result.push( this.contents[i] );
            }

            return result;
        }
    },

    // 表示データ数を増やす場合，class に book-update-box を追加すればスクロールボックスになります．
    template: `
        <div class="content-textbox book-update-box">
            <div v-for="message in messages">{{ message }}</div>
        </div>
    `
})

