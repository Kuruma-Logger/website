# setup ページの画像・動画 運用ルール

`site/setup/index.md` から参照する写真・動画・図版の管理場所です。
撮り直し・追加でファイル名がカオスにならないよう、下記ルールに従ってください。

## ルール

1. **ファイル名は「役割」だけ**（kebab-case、拡張子は lowercase）
   - 良い例: `gnss-dip-switch.png`、`grove-pin-removal.jpeg`、`wifi-setting.mp4`
   - 悪い例: `step02_dip-switch.png`、`gnss-dip-switch-v2.png`、`gnss-dip-switch-2026-05-08.png`、`analog_meter.JPG`
   - 連番・日付・バージョン・underscore (`_`)・大文字拡張子は使わない。並び替えや差し替え時に名前が腐ります。

2. **撮り直しは同名で上書き**
   - 同じ役割の写真・動画をリプレースする場合、新しいファイルを **同じファイル名** で上書きしてください。
   - 例: `cp ~/Desktop/IMG_9999.jpeg site/setup/images/gnss-dip-switch.png`
   - VitePress がビルド時に hash 付きファイル名 (`gnss-dip-switch.<hash>.png`) を生成するので、ブラウザキャッシュは自動で破棄されます。
   - git 履歴も 1 ファイルにまとまるので、過去のバージョンが追いやすい。

3. **画像 (.jpg/.jpeg/.png/.svg) は md から reference-style で参照**
   - 本文側:
     ```md
     ![GNSS モジュールの DIP スイッチ設定][img-dip]
     ```
   - `index.md` 末尾の URL 一覧:
     ```md
     [img-dip]: ./images/gnss-dip-switch.png
     ```
   - 写真を差し替える場合は URL 行 1 行を書き換えるだけで済みます。本文を触る必要なし。
   - 新しい写真を追加するときは、`[img-<role>]:` 行をテーブルに追記してください。

4. **動画 (.mp4) は `<video>` タグで直接記述**
   - `![alt](video.mp4)` は `<img>` に変換されてしまい再生されないため、HTML タグで書きます。
     ```html
     <video controls width="100%" src="./images/wifi-setting.mp4" title="Wi-Fi の設定の確認"></video>
     ```
   - VitePress のビルドで src は自動的に hash 付きパスにバンドルされます。
   - 動画は数が多くないので URL の reference-style 集約は使わず、そのまま直書きが分かりやすい。

## 画像・動画マニフェスト

### 静止画 (reference-style)

| label                    | file                              | 何の写真か                             |
|--------------------------|-----------------------------------|--------------------------------------|
| `img-cover`              | `m5-cover-removal.jpeg`           | M5Stack CoreS3 SE の裏蓋を外した状態  |
| `img-dip`                | `gnss-dip-switch.png`             | GNSS モジュールの DIP スイッチ設定    |
| `img-grove-pin`          | `grove-pin-removal.jpeg`          | Grove コネクタから外すピンの位置と爪  |
| `img-grove-txd`          | `grove-txd-confirmed.jpeg`        | TXD に配線がないことの確認            |
| `img-harness-connection` | `harness-canunit-connection.jpeg` | 中間ハーネスとミニ CAN ユニットの接続 |
| `img-canunit-connected`  | `canunit-connected.jpeg`          | ミニ CAN ユニットへの接続状態         |

### 動画 (HTML 直書き)

| file               | 何の動画か                       |
|--------------------|--------------------------------|
| `wifi-setting.mp4` | M5Stack 側で Wi-Fi の設定を確認 |
| `phone-setting.mp4`| スマホ側で Wi-Fi に接続         |

## 新しい画像を追加するときの手順

1. 写真の役割を決めて kebab-case のファイル名を考える (`shift-indicator-warning.jpeg` など)
2. このディレクトリ (`site/setup/images/`) に保存
3. このマニフェスト表の末尾に行を追加
4. `index.md` 末尾の URL 一覧に `[img-<label>]: ./images/<file>` を追記
5. 本文の該当箇所に `![alt][img-<label>]` を挿入

## 新しい動画を追加するときの手順

1. 動画の役割を決めて kebab-case のファイル名を考える (`shiftup-warning.mp4` など)
2. このディレクトリに保存
3. このマニフェスト表 (動画) の末尾に行を追加
4. 本文の該当箇所に `<video controls width="100%" src="./images/<file>.mp4" title="..."></video>` を挿入
