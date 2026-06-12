# guide ページの画像・動画 運用ルール

`site/guide/index.md` から参照する写真・動画・図版の管理場所です。
撮り直し・追加でファイル名がカオスにならないよう、下記ルールに従ってください。

## ルール

1. **ファイル名は「役割」だけ**（kebab-case、拡張子は lowercase）
   - 良い例: `analog-meter.jpg`、`setting.jpg`、`sd-logging.mp4`
   - 悪い例: `step02_analog-meter.jpg`、`analog-meter-v2.jpg`、`analog_meter.JPG`
   - 連番・日付・バージョン・underscore (`_`)・大文字拡張子は使わない。並び替えや差し替え時に名前が腐ります。

2. **撮り直しは同名で上書き**
   - 同じ役割の写真・動画をリプレースする場合、新しいファイルを **同じファイル名** で上書きしてください。
   - 例: `cp ~/Desktop/IMG_9999.jpeg site/guide/images/analog-meter.jpg`
   - VitePress がビルド時に hash 付きファイル名 (`analog-meter.<hash>.jpg`) を生成するので、ブラウザキャッシュは自動で破棄されます。
   - git 履歴も 1 ファイルにまとまるので、過去のバージョンが追いやすい。

3. **画像 (.jpg/.jpeg/.png/.svg) は md から reference-style で参照**
   - 本文側:
     ```md
     ![アナログメータ][img-analog-meter]
     ```
   - `index.md` 末尾の URL 一覧:
     ```md
     [img-analog-meter]: ./images/analog-meter.jpg
     ```
   - 写真を差し替える場合は URL 行 1 行を書き換えるだけで済みます。本文を触る必要なし。
   - 新しい写真を追加するときは、`[img-<role>]:` 行をテーブルに追記してください。

4. **動画 (.mp4) は `<video>` タグで直接記述**
   - `![alt](video.mp4)` は `<img>` に変換されてしまい再生されないため、HTML タグで書きます。
     ```html
     <video controls width="100%" src="./images/sd-logging.mp4" title="microSD カードへのログ機能"></video>
     ```
   - VitePress のビルドで src は自動的に hash 付きパスにバンドルされます。
   - 動画は数が多くないので URL の reference-style 集約は使わず、そのまま直書きが分かりやすい。

## 画像・動画マニフェスト

### 静止画 (reference-style)

| label                               | file                                | 何の写真か                              |
|-------------------------------------|-------------------------------------|-----------------------------------------|
| `img-dashboard-screen`              | `digital-meter.jpg`                 | Dashboard 画面（4 分割デジタル表示）    |
| `img-analog-meter`                  | `analog-meter.jpg`                  | Roadster Vitals 画面（アナログメータ）  |
| `img-shiftup-indicator`             | `shiftup-indicator.jpg`             | Shift Up Indicator 画面                 |
| `img-system-monitor`                | `system-monitor.jpg`                | CPU 画面（システム診断バー）            |
| `img-setting`                       | `setting.jpg`                       | 設定メニュー画面                        |
| `img-dashboard`                     | `dashboard.jpg`                     | WEB-UI Dashboard 画面                   |
| `img-realtimemonitor`               | `realtime-monitor.jpg`              | WEB-UI RealTimeMonitor 画面             |
| `img-webui-wifi-setting`            | `webui-wifi-setting.jpg`            | WEB-UI Wi-Fi 設定画面                   |
| `img-webui-vehicle-setting`         | `webui-vehicle-setting.jpg`         | WEB-UI 車両設定切り替え画面             |
| `img-webui-can-transceiver-setting` | `webui-can-transceiver-setting.jpg` | WEB-UI CAN トランシーバ切り替え画面     |

### 動画 (HTML 直書き)

| file                     | 何の動画か                       |
|--------------------------|----------------------------------|
| `sd-logging.mp4`         | microSD カードへのログ機能       |
| `racechrono-setting.mp4` | RaceChrono への転送設定          |
| `rconly-setting.mp4`     | RC Only モード設定               |

## 新しい画像を追加するときの手順

1. 写真の役割を決めて kebab-case のファイル名を考える (`g-monitor-sample.jpeg` など)
2. このディレクトリ (`site/guide/images/`) に保存
3. このマニフェスト表の末尾に行を追加
4. `index.md` 末尾の URL 一覧に `[img-<label>]: ./images/<file>` を追記
5. 本文の該当箇所に `![alt][img-<label>]` を挿入

## 新しい動画を追加するときの手順

1. 動画の役割を決めて kebab-case のファイル名を考える (`racechrono-gauge.mp4` など)
2. このディレクトリに保存
3. このマニフェスト表 (動画) の末尾に行を追加
4. 本文の該当箇所に `<video controls width="100%" src="./images/<file>.mp4" title="..."></video>` を挿入
