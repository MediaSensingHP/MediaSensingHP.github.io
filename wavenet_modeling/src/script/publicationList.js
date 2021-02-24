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
    el: '#top',
    data: {
        // 論文リスト用スプレッドシート
        sheetUrl: 'https://docs.google.com/spreadsheets/d/1VDZ3UVoOXoiGHRp5JXsnCSZqhlhBuneW5qc8TQ6HkAk/edit#gid=0', // URL
        sheetData: [ [ [] ] ], // 読み込み結果を格納する
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
        },

        // データの整形
        dataShaping: function(sheet){
            sheet.splice(0, 1); // ヘッダを削除

            // 整形した結果
            var shapedData = []; 

            // 重複消して論文の分類を格納
            var list = transpose(sheet)[0].filter(function (x, i, self) {
                return self.indexOf(x) === i;
            });

            // 論文の分類の数だけ
            for (var i = 0; i < list.length; ++i){
                shapedData.push( [] );
            }

            // シートでは下に行くほど新しい論文なので逆順にする
            sheet = sheet.reverse();

            // データを分類ごとに([i][0]に分類が入ってる)
            for (var i = 0; i < sheet.length; ++i) {
                var index = list.indexOf(sheet[i][0]);
                shapedData[index].push(sheet[i]);
            }

            return shapedData;
        }
    },

    created: function(){
        this.main();
    }
})


// publication-list
// contents[ [ [] ] ] -> content -> info
// 0: top-titles
// 1: top-name
// 2: href
// 3: <a></a>
// 4: top-text
// 5: top-place
// 6: top-date
// 7: update-message <- 使わない

Vue.component('publication-list', {
    props: ['contents'], // contents: sheetDataでバインドしてください
    template: `
        <div>
            <div v-for="content in contents" v-if="content[0][0]!=null">
                <div class="top-titles">
                    {{ content[0][0] }}
                </div>

                <!-- Awards -->
                <div v-if="content[0][0] == 'Awards'">
                    <div v-for="info in content">
                        <div class="top-pub-box">
                            <span v-if="info[5]!=null">{{ info[5] }}</span>: <span v-if="info[1]!=null">{{ info[1] }}</span>, <span v-if="info[4]!=null">{{ info[4] }}</span>
                             <a v-if="info[2] != null && info[3] != null" :href="info[2]">
                                 [{{ info[3] }}] 
                             </a>
                        </div>
                    </div>
                </div>

                <!-- 上記以外 -->
                 <div v-else>
                    <div v-for="info in content">
                        <div class="top-pub-box">
                             <span v-if="info[4]!=null">{{ info[4] }}</span>, "<span v-if="info[1]!=null">{{ info[1] }}</span>," <span v-if="info[5]!=null">{{ info[5] }}</span>.
                             <a v-if="info[2] != null && info[3] != null" :href="info[2]">
                                 [{{ info[3] }}] 
                             </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `
    // 昔の表示形式 ↓↓
    // template: `
    //     <div>
    //         <div v-for="content in contents" v-if="content[0][0]!=null">
    //             <div class="top-titles">
    //                 {{ content[0][0] }}
    //             </div>

    //             <div v-for="info in content">
    //                 <div v-if="info[1]!=null" class="top-name">
    //                     {{ info[1] }}
    //                     <a v-if="info[2] != null && info[3] != null" :href="info[2]">
    //                          [{{ info[3] }}] 
    //                      </a><br>
    //                 </div>
    //                 <div v-if="info[4]!=null" class="top-text">
    //                     {{ info[4] }}
    //                 </div>
    //                 <div v-if="info[5]!=null" class="top-place">
    //                     {{ info[5] }}
    //                 </div>
    //                 <!--
    //                 <div v-if="info[6]!=null" class="top-date">
    //                     {{ info[6] }}
    //                 </div>
    //                 -->
    //             </div>
    //         </div>
    //     </div>
    // `
})

