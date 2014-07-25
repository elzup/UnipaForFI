// ==UserScript==
// @name        UnipaForFI
// @namespace   https://twitter.com/akameco
// @description ユニットの達成状況を追加
// @include     https://portal.sa.dendai.ac.jp/up/faces/up/jg/Jga00201A.jsp
// @include     https://portal.sa.dendai.ac.jp/up/faces/up/co/Com02501A.jsp
// @include     https://portal.sa.dendai.ac.jp/up/faces/up/po/Poa00601A.jsp 
// @version     1
// @grant       none
// ==/UserScript==

(function ($) {
    var units = {
      cg: {
        now: 0,
        complete: 0,
        count: 0,
        list: ['CGモデリングおよび演習',
          'CGレンダリングおよび演習']
      },
      vs: {
        now: 0,
        complete: 0,
        count: 0,
        list: ['画像処理',
          '画像処理演習',
          '音声・音響情報処理',
          'コンピュータ音楽作品制作演習',"データ記述とＸＭＬ"]
      },
      mi: { 
        now: 0,
        complete: 0,
        count: 0,
        list: ['ヒューマンインタラクション及び演習',
          '人間情報システムおよび演習',
          'メディア情報学']
      },
      wi: {
        now: 0,
        complete: 0,
        count: 0,
        list: ['サーバ設計論',
          '情報アクセスと知的処理',
          'サーバプログラミング演習',
          'Web情報システム演習',
          'データベースプログラミング演習',"データ記述とＸＭＬ"]
      },
      st: {
        now: 0,
        complete: 0,
        count: 0,
        list: ['情報セキュリティの基礎と暗号技術',
          'ネットワークプログラミング',
          'ネットワークプログラミング演習','情報ネットワーク']
      },
      sn: {
        now: 0,
        complete: 0,
        count: 0,
        list: ['サーバ設計論',
          'メディア情報学',
          'サーバプログラミング演習',
          'ソフトウェア設計',
          '情報システム論']
      },
    };

    // 科目を取得
    var myUnitList = $("td .tdKamokuList");
    // 評価を取得
    var hyokaList = $("td .tdHyokaList");
    // 単位を習得
    var taniList = $("td .tdTaniList");
    // 単位認定可能な評価範囲
    var hyoka = ["S","A","B","C","RS","RA","RB","RC","RN"];


    for(var unitKey in units){
      var unit = units[unitKey];
      var unitList = unit["list"];
      for (var i=0; i < unitList.length; ++i) {
        for(var j=0; j < myUnitList.size(); ++j){
          var myUnitText = myUnitList[j].textContent;
          var myHyokaText = hyokaList[j].textContent;
          if(unitList[i] == myUnitText){
            // 取得済み単位
            if(hyoka.indexOf(myHyokaText) >= 0){
              console.log(hyoka.indexOf(myHyokaText));
              console.log(myHyokaText);
              units[unitKey]["complete"] += 1;
              // 履修中の単位
            }else if(myHyokaText == ""){
              units[unitKey]["now"] += 1;
            }
          }
        }
      }
    }

    for(var unitKey in units){
      var unit = units[unitKey];
      var unitList = unit["list"];
      var unitComplete = unit["complete"];
      var unitNow = unit["now"];
      console.log(unitList);
      console.log(unitComplete);
      console.log(unitNow);
    }



    // 要素の追加
    var table = $("table.outline tbody")[0];
    // unipaは本当に最悪なのでtdを追加しなくちゃレイアウトが崩れる
    var titleText = "<tr><td></td><td class='subTitleArea'>ユニット達成度</td><td></td><tr>";
    var tableText = "\
    <tr>\
    <td></td>\
    <td>\
    <table class='singleTableLine'>\
    <tbody>\
    <tr>\
    <th class='headTaniShutoku'>ユニット分類</th>\
    <td class='dataTaniShutokuKamoku'>CG</th>\
    <td class='dataTaniShutokuKamoku'>VS</th>\
    <td class='dataTaniShutokuKamoku'>MI</th>\
    <td class='dataTaniShutokuKamoku'>WI</th>\
    <td class='dataTaniShutokuKamoku'>ST</th>\
    <td class='dataTaniShutokuKamoku'>SN</th>\
    </tr>\
    <tr>\
    <th class='headTaniShutoku'>履修済単位</th>\
    <td class='dataTaniShutokuKamoku'>CG</th>\
    <td class='dataTaniShutokuKamoku'>VS</th>\
    <td class='dataTaniShutokuKamoku'>MI</th>\
    <td class='dataTaniShutokuKamoku'>WI</th>\
    <td class='dataTaniShutokuKamoku'>ST</th>\
    <td class='dataTaniShutokuKamoku'>SN</th>\
    </tr>\
    <tr>\
    <th class='headTaniShutoku'>履修中単位</th>\
    <td class='dataTaniShutokuKamoku'>CG</th>\
    <td class='dataTaniShutokuKamoku'>VS</th>\
    <td class='dataTaniShutokuKamoku'>MI</th>\
    <td class='dataTaniShutokuKamoku'>WI</th>\
    <td class='dataTaniShutokuKamoku'>ST</th>\
    <td class='dataTaniShutokuKamoku'>SN</th>\
    </tr>\
    <tr>\
    <th class='headTaniShutoku'>ユニット合計</th>\
    <td class='dataTaniShutokuKamoku'>CG</th>\
    <td class='dataTaniShutokuKamoku'>VS</th>\
    <td class='dataTaniShutokuKamoku'>MI</th>\
    <td class='dataTaniShutokuKamoku'>WI</th>\
    <td class='dataTaniShutokuKamoku'>ST</th>\
    <td class='dataTaniShutokuKamoku'>SN</th>\
    </tr>\
    </tbody>\
    </table>\
    </td>\
    <td></td>\
    </tr>\
    ";
    $(table).append(titleText);
    $(table).append(tableText);

    console.log("ok");

})(jQuery);
