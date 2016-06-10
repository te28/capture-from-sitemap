
// casperモジュールの読み込み、オブジェクト作成
var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

// トップページのURLを指定
var rootUrl = 'https://example.com/';

// 所定のエレメントからリンク先を順番に取得してくる関数
function getLinks() {
  //リンクの箇所を特定できるセレクタを指定。
  var links = document.querySelectorAll('div.col a');
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href');
  });
}

// スタート
// サイトマップページを開く
casper.start(rootUrl + 'sitemap/');

// ページ内のリンクを取得
casper.then(function() {
  // リンク先の取得
  links = this.evaluate(getLinks);
  // 取得したリンクを一つづつ開く
  Array.prototype.map.call(links, function (link) {
    casper.thenOpen(rootUrl + link, function() {
      // TOPのパスが’/’なので、ファイル名は’TOP’にする
      if(link === '/') {
        link = 'top';
      }
      casper.capture('./capture/' + link + '.png');
    });
  });
});
// 実行
casper.run();
