// ==UserScript==
// @name        UnipaForFI
// @namespace   https://twitter.com/akameco
// @description ユニットの達成状況を追加
// @include     https://portal.sa.dendai.ac.jp/up/faces/up/jg/Jga00201A.jsp
// @include     https://portal.sa.dendai.ac.jp/up/faces/up/co/Com02501A.jsp
// @version     1
// @grant       none
// ==/UserScript==

(function ($) {
    var units = {
      cg: {
        count: 0,
        list: ['CGモデリングおよび演習',
          'CGレンダリングおよび演習']
      },
      vs: {
        count: 0,
        list: ['画像処理',
          '画像処理演習',
          '音声・音響情報処理',
          'コンピュータ音楽作品制作演習',"データ記述とＸＭＬ"]
      },
      mi: { 
        count: 0,
        list: ['ヒューマンインタラクション及び演習',
          '人間情報システムおよび演習',
          'メディア情報学']
      },
      wi: {
        count: 0,
        list: ['サーバ設計論',
          '情報アクセスと知的処理',
          'サーバプログラミング演習',
          'Web情報システム演習',
          'データベースプログラミング演習',"データ記述とＸＭＬ"]
      },
      st: {
        count: 0,
        list: ['情報セキュリティの基礎と暗号技術',
          'ネットワークプログラミング',
          'ネットワークプログラミング演習']
      },
      sn: {
        count: 0,
        list: ['サーバ設計論',
          'メディア情報学',
          'サーバプログラミング演習',
          'ソフトウェア設計',
          '情報システム論']
      },
      test: {
        count: 0,
        list: ['形式言語とオートマトン']
      },
    };

    // 科目を取得
    var myUnitList = $("td .tdKamokuList");
    // 評価を取得
    var hyokaList = $("td .tdHyokaList");
    // 単位認定可能な評価範囲
    var hyoka = ["S","A","B","C","RS","RA","RB","RC","RN"];

    for(var unitKey in units){
      var unit = units[unitKey];
      var unitList = unit["list"];
      for (var i=0; i < unitList.length; ++i) {
        for(var j=0; j < myUnitList.size(); ++j){
          var myUnitText = myUnitList[j].textContent;
          var myHyokaText = hyokaList[j].textContent;
          if(unitList[i] == myUnitText && (hyoka.indexOf(myHyokaText) >= 0)){
            console.log(hyoka.indexOf(myHyokaText));
            console.log(myHyokaText);
            units[unitKey]["count"] += 1;
          }
        }
      }
    }

    for(var unitKey in units){
      var unit = units[unitKey];
      var unitList = unit["list"];
      var unitCount = unit["count"];
      console.log(unitList);
      console.log(unitCount);
    }

})(jQuery);
