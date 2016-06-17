# Capture From Sitemap

## 動作環境

* [phantom.js](http://phantomjs.org/)
* [caspter.js](http://casperjs.org/)

それぞれ、zipをダウンロード/展開して`C:\`直下等に設置して下さい。
PATHも通す必要があります。

## 使い方

### capture-from-sitemap.jsの編集

* `rootUrl`に起点となるURLを設定。

```
var rootUrl = 'https://example.com/',
    siteMapPath = 'sitemap/';
```

* 取得対象のリンクを特定できるセレクタを指定

```
var links = document.querySelectorAll('div.xxx a');
```

### caspterjsの実行

```
$ caspterjs capture-from-sitemap.js
```

キャプチャが`capture`以下に保存されれば成功です。
