---
title: セットアップガイド
description: Kuruma-Logger の初回導入に必要な機材と基本手順をまとめています。
---

# セットアップガイド

初回導入時に必要な機材と基本手順をまとめています。

## 必要なもの

- Kuruma-Logger 対応ハードウェア
  - [M5Stack CoreS3 SE][1] または M5Stack Tab5
  - [M5Stack 用 GNSS モジュール 気圧/IMU/地磁気センサ付き][2]
  - CAN トランシーバ
    - ※ 中間ハーネスが用意でき次第、(A) を推奨予定
    - (A) [M5Stack 用 PWRCAN モジュール - 13.2（絶縁型 CAN/RS485）][13]
    - (B) [M5Stack 用ミニ CAN ユニット（TJA1051T/3）][4]
  - [microSD カード][6]
    - 32GB 以下のものを用意してください。
  - 中間ハーネス
    - [ND5RC 用][5]
    - [FL5 用][11]

::: warning 2026/4/11 追記
必要ハードウェアから [M5Stack バッテリーボトム 黒（110mAh）V1.1][3] を削除しました。
Lipo バッテリーの車載は発火事故の危険性があるため非推奨です。
:::

[1]: https://ssci.to/9690
[2]: https://ssci.to/9276
[3]: https://ssci.to/9572
[4]: https://ssci.to/9567
[5]: https://ssci.to/11030
[6]: https://www.amazon.co.jp/KIOXIA-%E3%82%AD%E3%82%AA%E3%82%AF%E3%82%B7%E3%82%A2-microSDHC%E3%82%AB%E3%83%BC%E3%83%89-Amazon-co-jp%E3%83%A2%E3%83%87%E3%83%AB-KLMEA032G/dp/B08PTNWQ6P?ref_=ast_sto_dp&th=1
[11]: https://minkara.carview.co.jp/userid/1653459/car/3573283/8546317/note.aspx
[13]: https://ssci.to/9816

## ハードウェアの組み立て

1. M5Stack CoreS3 SE の裏蓋を外します。
   - 付属の六角レンチでボルト 4 本を緩め、オレンジの蓋を外します。
   - ![M5Stack CoreS3 SE の裏蓋を外す様子][img-cover]
2. M5Stack 用 GNSS モジュールの DIP スイッチを切り替えます。
   - 画像のように下記 3 つのスイッチを ON にしてください。
   - `PS:3` を ON にします。
   - `TX:3` を ON にします。
   - `RX:2` を ON にします。
   - ![GNSS モジュールの DIP スイッチ設定][img-dip]
3. M5Stack CoreS3 SE と M5Stack 用 GNSS モジュール を結合します。
   - ピンが合うように固定してください。
4. Groveコネクタ（ミニCANユニットとM5Stackを繋ぐケーブル）を加工します。
   - ミニ CAN ユニットの TXD の配線は不要であり、意図せぬ車両故障の原因にもなるため取り外します。
   - ピンセットでGroveコネクタの爪を手前に倒します。
   - ![Grove コネクタから外すピンの位置と爪][img-grove-pin]
   - 両側引き抜いて不要な配線は綺麗にとって切除しましょう。
5. M5Stack 用ミニ CAN ユニットを接続します。
   - Grove コネクタでミニ CAN ユニットと CoreS3 SE を接続します。
   - TXDに繋がる配線がコネクタから抜けていることを確認してください。
   - ![TXD には配線がないことの確認][img-grove-txd]

## ソフトウェアのインストール

- 用意するもの
  - インターネットにつながる環境
  - PC
  - USB Type-C ケーブル
  - Google アカウント
  - 通常のブラウザ
    - マイページへのログインは Safari / Chrome / Edge などの通常ブラウザで開いてください。
    - X などのアプリ内ブラウザから直接開くと、Google ログインの画面遷移や認証情報の保存が制限され、エラーになる場合があります。
    - X の投稿から開いた場合は、メニューから「ブラウザで開く」「Safari で開く」「Chrome で開く」などを選んで開き直してください。
    - PC からファームウェアを書き込む場合は、USB 接続に対応した Chrome / Edge などのブラウザを使用してください。

- インストール手順
  - PC / USB Type-C / 対応本体を接続します。
  - [公式インストーラサイト][7]にアクセスします。
  - セットアップページより、Google アカウントでログインします。
  - サイトの誘導に従ってインストールします。
    - 2026/6/21 現在は M5Stack CoreS3 SE / M5Stack Tab5 用のアプリを配布中です。
    - ND Roadster / FL5 Civic Type R からお選びください（後からでも変更できます）。
    - M5Stack を繋げるご自宅または スマホの Wi-Fi を登録してください。初回インストール以降は無線でアップデートできるようになります。

[7]: https://app.kuruma-logger.com/setup/


## 中間ハーネスの取り付け

### ND Roadster (ND5RC) の場合

エンジン OFF で作業してください。

[中間ハーネスの取り付け方法][8] に沿って取り付けます。

ミニ CAN ユニット付属のコネクタと中間ハーネスを接続します。

![中間ハーネスとミニ CAN ユニットの接続][img-harness-connection]

::: warning 注意
最悪の場合、車両が壊れる可能性があります。慎重に作業してください。スイッチサイエンスで中間ハーネスを購入した場合は、写真と同様に配線の色と `H / L / HV / G` が対応するようにミニ CAN ユニットへ接続してください。
:::

コネクタをミニ CAN ユニットに接続してください。

![ミニ CAN ユニットへの接続状態][img-canunit-connected]

[8]: https://note.com/kurumariond/n/nbe64c41a821f

### Civic Type R (FL5) の場合

工事中です。

## 初回起動までの手順

ハードウェア配線を確認してください。

- 中間ハーネスとミニ CAN ユニットの接続を間違えないように、もう一度確認してください。

エンジンを始動します。

- Kuruma-Loggerが起動することを確認してください。
- 起動しない場合は電源が来ていない可能性があります。

通信状態を確認します。

- CAN 通信
  - 画面を右にスワイプして、CAN Frame の確認画面を表示します。
  - 受信できていれば OK です。
  - 受信できない場合は、CAN 配線を確認してください。

- GPS 通信
  - こちらも画面を右にスワイプして、GPS の受信状況を確認します。
  - この作業は空が見える状態で行ってください。初回測位には 10 分ほどかかる場合があります。
  - 衛星数が 10 個程度見えていれば OK です。調子のよい時は 17 個まで上がります。
  - 受信できない場合は、GPS のアンテナ位置やケーブルを確認してください。

Wi-Fi（スマホとの接続）設定を確認します。

- 設定画面を表示します。
  - M5Stack の画面下の丸ボタンを長押しすると設定画面が開きます。
    - 画面上から下にスワイプすることで元の画面に戻ります。
- Wi-Fi: ON のボタンを押します。
  - QR コードと Wi-Fi の設定が表示されます。
  - パスワードを確認してください。

<video controls width="100%" src="./images/wifi-setting.mp4" title="Wi-Fi の設定の確認"></video>

- スマホで "Kuruma-Logger" のアクセスポイントに接続します。
  - M5Stack に表示されているパスワードを入力してください。
- スマホのブラウザで `192.168.4.1` にアクセスします。
  - Kuruma-Logger の WEB-UI にアクセスできたら成功です。
  - WEB-UI で特にやっていただく操作はありません。

<video controls width="100%" src="./images/phone-setting.mp4" title="スマホの Wi-Fi 設定"></video>

## セットアップ完了後

セットアップは以上です。各画面の見方、RaceChrono 連携、microSD ログの使い方は [使い方ガイド](../guide/) を確認してください。

問題が解消しない場合は、[トラブル対応](../troubleshooting/) を確認してください。

<!--
画像 URL 一覧 (reference-style)。
本文から `![alt][img-<role>]` で参照しています。
撮り直し時は URL を変えずに同名ファイルを上書きしてください。
新しい写真を追加する場合は、ここに `[img-<role>]: ./images/<role>.<ext>` を追記し、
本文から `![alt][img-<role>]` で参照してください。
動画 (.mp4) は `![]` では再生されないため `<video controls src="./images/<file>.mp4">` で直接記述しています。
詳細は ./images/README.md を参照。
-->

[img-cover]:               ./images/m5-cover-removal.jpeg
[img-dip]:                 ./images/gnss-dip-switch.png
[img-grove-pin]:           ./images/grove-pin-removal.jpeg
[img-grove-txd]:           ./images/grove-txd-confirmed.jpeg
[img-harness-connection]:  ./images/harness-canunit-connection.jpeg
[img-canunit-connected]:   ./images/canunit-connected.jpeg
