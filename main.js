const APIkey = `3f5bb90aedadb177`;
function showSum() {
    var num1 = 1;
    var num2 = 2;
    var sum = num1 + num2;
    console.log(sum);
    alert(sum);
}
function readAPI(){
    const request = new XMLHttpRequest();
    request.open("GET",`https://webservice.recruit.co.jp/hotpepper/credit_card/v1/?key=3f5bb90aedadb177`);
    //request.open("GET",`http://zipcloud.ibsnet.co.jp/api/search?zipcode=7830060&callback=zipcallback`);
    request.withCredentials = true;
    request.setRequestHeader('Access-Control-Allow-Headers', '*');
    request.setRequestHeader('Content-type', 'application/ecmascript');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.addEventListener("load", (event) => {
        if (event.target.status !== 200) {
            console.log(`${event.target.status}: ${event.target.statusText}`);
            return;
        }
        console.log(event.target.status);
        console.log(event.target.responseText);
    });
    request.addEventListener("error", () => {
        console.error("Network Error!!!");
    });
    request.send();    
}
/*
gitのuserIDを入力すると情報が返ってくるAPIをたたく関数
*/
function getUserInfo(userId) {
    const request = new XMLHttpRequest();
    
    request.open("GET", `https://api.github.com/users/${userId}`);
    request.addEventListener("load", (event) => {
        if (event.target.status !== 200) {
            console.log(`${event.target.status}: ${event.target.statusText}`);
            return;
        }
        console.log(event.target.status);
        console.log(event.target.responseText);
        
    });
    request.addEventListener("error", () => {
        console.error("Network Error");
    });
    request.send();
}