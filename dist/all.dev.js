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
// 範例程式2：使用axios套件，抓取林務局步道路況資訊
// 變數dataList的預設值為空值(變數名稱不要用單詞)
var dataList;
var list = document.querySelector(".list");
var data = [];
axios.get('https://recreation.forest.gov.tw/mis/api/BasicInfo/Trail').then(function (response) {
  // 變數dataList的預設值為空值，但當axios從遠端抓到林務局的JSON資料庫時
  // 變數dataList從外部匯入一筆資料，此時的dataList不再是空值
  dataList = response.data; // 

  getTrailInfo();
}); // 功能名稱 getTrailInfo

function getTrailInfo() {
  var str = ''; // 從變數dataList中逐筆搜尋data資料

  dataList.forEach(function (data) {
    // 當data.TR_ADMIN名稱等於'嘉義林區管理處'時
    if (data.TR_ADMIN == '台東林區管理處') {
      var content1 = '<li>' + '編號' + data.TRAILID + '</li>';
      var content2 = '<li>' + data.TR_CNAME + '</li>';
      var content3 = '<li>' + data.GUIDE_CONTENT + '</li>';
      str += content1;
      str += content2;
      str += content3;
      list.innerHTML = str;
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