"use strict";

// 2020/09/07 第四課：AJAX與資料處理
// OpenData裡的地點與資訊會更動，透過AJAX套件可去遠端撈別人的資料
// 範例程式1：使用axios套件，抓取1999網站資訊
// var data;
// var num = 0;
// axios.get('https://soweb.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery?startdate=&enddate=')
//     // 抓到資料後，執行function函式回傳資料
//     // 此處的response是變數，可以改成其他名稱
//     // 使用axios向資料庫要資料，需要花一點時間
//     // 這段期間函式會放在暫存區，待資料回傳後才執行函式
//     .then(function (response) {
//         data = response.data;
//         getZipName();
//     });
// function getZipName() {
//     data.forEach(function (item) {
//         if (item.ZipName_ == '鼓山區') {
//             num += 1;
//             console.log('編號：' + num);
//             console.log((item.ZipName_) + (item.InformDesc_));
//         }
//     });
// }
// 範例程式2：使用axios套件，抓取林務局森林遊樂區資料
// 變數dataList的預設值為空值(變數名稱不要用單詞)
var dataList = []; // 變數select：在HTML檔案裡，選取名為areaId的物件(id)

var select = document.querySelector('.searcharea'); // 變數select：在HTML檔案裡，選取名為TR_Content的物件(class)

var TR_Content = document.querySelector('.TR_Content'); // 監聽變數select，當select改變時，觸發函式getdata

select.addEventListener('change', getData); // 函式getData

function getData() {
  // 使用axios從遠端抓取林務局的JSON資料庫
  axios.get('https://recreation.forest.gov.tw/mis/api/BasicInfo/Trail').then(function (response) {
    // 變數dataList原本為空值，當觸發getData時從外部匯入林務局資料
    var dataList = response.data; // 變數selectArea的內容為areaId.value的值

    var selectArea = areaId.value; // 變數str的預設值為空值

    var str = ''; // 變數len為變數dataList長度的縮寫(給for迴圈使用)

    var len = dataList.length; // 從0開始執行for迴圈，當i值小於dataList時，重複執行以下公式

    for (i = 0; i < len; i++) {
      // 當dataList的TR_ADMIN等於selectArea時，顯示以下內容
      // 備註：此處將的dataList必須加上[i]，表示從第0筆資料開始
      if (dataList[i].TR_ADMIN == selectArea) {
        // 變數content：<li></li>段落內容
        var content = '<li>' + '編號' + dataList[i].TRAILID + '：' + dataList[i].TR_CNAME + '<br>' + dataList[i].GUIDE_CONTENT + '</li>'; // 變數str的預設值為空值，但當觸發for迴圈裡的選擇器時，str會變成content，並不斷累加

        str += content; // 在變數TR_Content中插入str字串
        // 此處的變數TR_Content與HTML頁的class內容相連

        TR_Content.innerHTML = str;
      }
    }
  });
} // 20200908 第五課：非同步、EventQueue、AJAX教學
// JavaScript是一種單線程(Single Thread)語言：一次只能做一件事
// EventQueue是利用時間差，讓JavaScript好像可以同時做很多事情
// 計時器、AJAX、Promise是屬於WebAPIs，不在JS單線程限制範圍內
// console.log('a');
// function run(){
//     console.log('b');
// }
// setTimeout(run, 3000);
// var start = Date.now();
// while(Date.now()-start <= 5000){
// }
// console.log('c');
// 小明與杰倫的對話框

/* <input type="text" id="mingInput">
<button id="mingBtn">小明的按鈕</button>
<div>小名收到的訊息：<span id="mingMsg"></span></div>
<br>
<input type="text" id="jayInput">
<button id="jayBtn">杰倫的按鈕</button>
<div>杰倫收到的訊息：<span id="jayMsg"></span></div>

<script>
    var mingInput = document.querySelector('#mingInput');
    var mingBtn = document.querySelector('#mingBtn');
    var mingMsg = document.querySelector('#mingMsg');
                         //選擇事件、代入匿名function、false
    mingBtn.addEventListener('click',function(e){
        var str = mingInput.value;
        jayMsg.innerHTML = str;
    },false);

    var jayInput = document.querySelector('#jayInput');
    var jayBtn = document.querySelector('#jayBtn');
    var jayMsg = document.querySelector('#jayMsg');
                         //選擇事件、代入匿名function、false
    jayBtn.addEventListener('click',function(e){
        var str = jayInput.value;
        mingMsg.innerHTML = str;
    },false);
</script> */