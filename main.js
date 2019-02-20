const APIkey = `3f5bb90aedadb177`;


// コールバックでzipcloudのJSONを受け取る関数
function getZipcloudJSON(json){
    const result = json['results'];
    let message = '見つかりませんでした';
 
    if(result){
        message = `都道府県 : ${result[0]['address1']} 市区町村 : ${result[0]['address2']} 地名 : ${result[0]['address3']}`;
        document.getElementById("id_todou").innerText = `都道府県 :${result[0]['address1']}`;
        document.getElementById("id_sityou").innerText = `市区町村 :${result[0]['address2']}`;
        document.getElementById("id_timei").innerText = `地名　　：${result[0]['address3']}`;
    }else{
        document.getElementById("id_todou").innerText = `都道府県 :`;
        document.getElementById("id_sityou").innerText = `市区町村 :`;
        document.getElementById("id_timei").innerText = `地名　　：`;
        alert(message);
    }
    console.log (result);
    
    console.log(message);
}

// JSONPを利用するためのscriptタグを生成する関数
function addTagJSONP(req){
    // タグを生成する
    const sc = document.createElement('script');
    sc.type = 'text/javascript';
    sc.src = req;
    // タグをbodyに追加する
    // 追加した時点でWebAPIへリクエストが送信される
    document.body.appendChild(sc);
    // 不要になったタグをbodyから削除する
    document.body.removeChild(sc);
}

// 検索ボタンが押された後、郵便番号検索APIへのリクエスト情報を作成する関数
function sendRequest(){
    
    const zipcode = document.getElementById("id_input_zip").value;
    console.log(zipcode);
    if(!isNaN(zipcode)){
        const callbackFuncName = 'getZipcloudJSON';
        const req = `http://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}&callback=${callbackFuncName}`;
        addTagJSONP(req);
    }else{
        alert("正しく入力してください");
    }
    
}

// 検索ボタンが押された後、ホットペッパーAPIへのリクエスト情報を作成する関数
function sendHotpepperRequest(){
    
    const conditions = document.getElementById("id_input_conditions").value;
    console.log(conditions);
    const encode_conditions = encodeURI(conditions);
    console.log(encode_conditions);   
    const callbackFuncName = 'getHotJSON';


    //const req = `http://webservice.recruit.co.jp/hotpepper/shop/v1/?key=${APIkey}&keyword=%E3%82%AA%E3%83%BC%E3%82%AC%E3%83%8B%E3%83%83%E3%82%AF%E3%80%80%E6%9D%B1%E4%BA%AC&format=jsonp&callback=${callbackFuncName}`;
    const req = `http://webservice.recruit.co.jp/hotpepper/shop/v1/?key=${APIkey}&keyword=${encode_conditions}&format=jsonp&callback=${callbackFuncName}`;
    addTagJSONP(req);
}

function getHotJSON(json){
    const results = json['results']
    
    console.log(results);

   
    if(results['error']){
        alert(results['error'][0]['message']);
    }
    const results_returned = results['results_returned'];
    if(results_returned==0){
        alert("検索結果0件");
    }
    var shoplist = [];
    document.getElementById("id_shoplist").innerText = "";
    for(var counta = 0;counta<results_returned;counta++){
        //console.log(results['shop'][counta]);
        shoplist.push(results['shop'][counta]);
        document.getElementById("id_shoplist").innerText +=shoplist[counta]['name'];
        document.getElementById("id_shoplist").innerHTML +="<br>";
    }
    console.log(shoplist);
}
