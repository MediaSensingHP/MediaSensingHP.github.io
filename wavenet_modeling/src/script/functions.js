// ---------------------------------------- //
//  スプレッドシートの読み込みで使いまわせる部分  //
// ---------------------------------------- //

// データの格納部分
function readSpreadsheet(response){
	var data = response.getDataTable(),
        row, col, rowLength, colLength, rowTemp,
        rowData = [];

    // エラーメッセージ
    if (!data || response.isError()) {
        console.log(response.getMessage() + ':' + response.getDetailedMessage());
        return;
    }

    console.log( data.getValue( 1, 5 ) );

    // loop max cache
    rowLength = data.getNumberOfRows();
    colLength = data.getNumberOfColumns();

    console.log('rowLength: ' + rowLength);
    console.log('colLength: ' + colLength);

    // 行データ読み込み,格納
    for ( row = 0; row < rowLength; ++row) {
        rowTemp = [];
        for ( col = 0; col < colLength; ++col) {
        	// row行目のcol列目のデータ: data.getValue(row, col)
        	rowTemp.push( data.getValue(row, col) )
        }
        rowData.push(rowTemp); // 行データ格納
    }

    return rowData;
}



// ----------------------------------- //
//  関数                               //
// ----------------------------------- //

// 行列の転置
function transpose(a){
    return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
}

