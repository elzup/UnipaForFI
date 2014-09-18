// ==UserScript==
// @name        UnipaForFI
// @namespace   https://twitter.com/akameco
// @description ユニットの達成状況を追加
// @include     https://portal.sa.dendai.ac.jp/up/faces/up/*
// @version     1
// @grant       none
// ==/UserScript==

(function ($) {
    // 実行ページチェック
    var page_title = $('.titleAreaL').html();
    if (page_title != '成績照会') {
        console.log('skip Unit script');
        return;
    }
    console.log('load Unit script');
    var units = {
      cg: {
        complete: 0,
        count: 0,
        list: [
          'CGモデリングおよび演習',
          'CGレンダリングおよび演習',
          '形状処理および演習',
          'コンピュータアニメーションおよび演習'
        ]
      },
      vs: {
        complete: 0,
        count: 0,
        list: [
          '画像処理',
          '画像処理演習',
          '音声・音響情報処理',
          'コンピュータ音楽作品制作演習',
          'バーチャルリアリティ',
          '音声・音響情報処理'
        ]
      },
      mi: { 
        complete: 0,
        count: 0,
        list: [
          'ヒューマンインタラクション及び演習',
          '人間情報システムおよび演習',
          'メディア情報学',
          'インタラクションデザイン'
        ]
      },
      wi: {
        complete: 0,
        count: 0,
        list: [
          'サーバ設計論',
          '情報アクセスと知的処理',
          'サーバプログラミング演習',
          'Web情報システム演習',
          'データベースプログラミング演習'
        ]
      },
      sn: {
        complete: 0,
        count: 0,
        list: [
          '情報セキュリティの基礎と暗号技術',
          'ネットワークプログラミング',
          'ネットワークプログラミング演習',
          'ネットワークセキュリティおよび演習'
        ]
      },
      st: {
        complete: 0,
        count: 0,
        list: [
          'サーバ設計論',
          'メディア情報学',
          'サーバプログラミング演習',
          'ソフトウェア設計',
          '情報システム論',
          'ソフトウェア分析・モデリング'
        ]
      }
    };

    // 科目を取得
    var myUnitList = $("td .tdKamokuList");
    // 評価を取得
    var hyokaList = $("td .tdHyokaList");
    // 単位を習得
    var taniList = $("td .tdTaniList");
    // 単位認定可能な評価範囲
    var hyoka = ["S","A","B","C","RS","RA","RB","RC","RN"];

    for (var unitKey in units){
      var unit = units[unitKey];
      var unitList = unit.list;
      unitSize = myUnitList.size();
      for (var j=0; j < unitSize; ++j){
        var myUnitText = myUnitList[j].textContent;
        var myHyokaText = hyokaList[j].textContent;
        var i = unitList.indexOf(myUnitText);
        if (i != -1) {
          // 単位数
          var n = taniList[j].textContent ? parseInt(taniList[j].textContent) : 0;
          // 合計単位
          unit.count += n;
          // 取得済み単位
          if (hyoka.indexOf(myHyokaText) >= 0){
            unit.complete += n;
          } 
        }
      }
    }
    console.log(units);

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
    <td class='dataTaniShutokuKamoku'>"
    + units.cg.complete
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.vs.complete
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.mi.complete
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.wi.complete
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.st.complete
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.sn.complete
    + "</th>\
    </tr>\
    <tr>\
    <th class='headTaniShutoku'>履修中単位</th>\
    <td class='dataTaniShutokuKamoku'>"
    + (units.cg.count - units.cg.complete)
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + (units.vs.count - units.vs.complete)
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + (units.mi.count - units.mi.complete)
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + (units.wi.count - units.wi.complete)
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + (units.st.count - units.st.complete)
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + (units.sn.count - units.sn.complete)
    + "</th>\
    </tr>\
    <tr>\
    <th class='headTaniShutoku'>ユニット合計</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.cg.count
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.vs.count
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.mi.count
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.wi.count
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.st.count
    + "</th>\
    <td class='dataTaniShutokuKamoku'>"
    + units.sn.count
    + "</th>\
    </tr>\
    </tbody>\
    </table>\
    </td>\
    <td></td>\
    </tr>\
    ";

    var link = "<tr><td></td><td><a href='http://www.im.dendai.ac.jp/curriculum.html' target='_blank'>ユニット詳細(学科ページ)</a></td></tr>"

    $(table).append(titleText);
    $(table).append(tableText);
    $(table).append(link);
    
    // 動作確認
    var check = function () {
      for(var unitKey in units){
        var unit = units[unitKey];
        var unitList = unit["list"];
        var unitComplete = unit["complete"];
        var unitNow = unit["now"];
        console.log(unitList);
        console.log("履修済み" + unitComplete);
        console.log("履修中" + unitNow);
      }
    };

})(jQuery);
