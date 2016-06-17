
// casperモジュールの読み込み、オブジェクト作成
var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

// （編集）トップページのURLを指定
var rootUrl = 'https://example.com/',
    siteMapPath = 'sitemap/';

// 所定のエレメントからリンク先を順番に取得してくる関数
function getLinks() {
  // （編集）リンクの箇所を特定できるセレクタを指定。
  var links = document.querySelectorAll('div.col a');
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href');
  });
}

// 実行スタート
// サイトマップページを開く
casper.start(rootUrl + siteMapPath);

// ページ内のリンクを取得
casper.then(function() {
  // getLinks関数でリンク先の取得
  links = this.evaluate(getLinks);
  // 取得したリンクを一つづつ開く
  Array.prototype.map.call(links, function (link) {
    casper.thenOpen(rootUrl + link, function() {
      // TOPのパスが’/’でキャプチャのファイル名が空白になってしまうので、ファイル名は’TOP’にする
      if(link === '/') {
        link = 'top';
      }
      casper.capture('./capture/' + link + '.png');
    });
  });
});
// 実行
casper.run();
