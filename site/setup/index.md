---
title: セットアップガイド
description: Kuruma-Logger の初回導入に必要な機材と基本手順をまとめています。
---

# セットアップガイド

初回導入時に必要な機材と基本手順をまとめています。

## 必要なもの

- Kuruma-Logger 対応ハードウェア
  - [M5Stack CoreS3 SE][1]
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

- インストール手順
  - PC / USB Type-C / M5Stack CoreS3 SE を接続します。
  - [公式インストーラサイト][7]にアクセスします。
  - セットアップページより、Google アカウントでログインします。
  - サイトの誘導に従ってインストールします。
    - 2026/5/8 現在は M5Stack CoreS3 SE 用のアプリのみ配布中です。
    - ND Roadster / FL5 Civic Type R からお選びください（後からでも変更できます）。
    - M5Stack を繋げるご自宅または スマホの Wi-Fi を登録してください。初回インストール以降は無線でアップデートできるようになります。

[7]: https://app.kuruma-logger.com/


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

## 機能紹介

### microSD カードへのログ機能

CAN/GPS のデータを統合して、25Hz でログします。

- 画面中央にある "Ready" を長押しすると、SD カードへのログが開始されます。
- 赤色で "Rec..." になっていればロギング中です（GPS/CAN を 25Hz でログします）。
- "Rec..." を長押しすると、ログが停止します。
- ログが停止すると、黄色で "Conv..." になります。これはログデータを変換中の表示です。
  - "Conv..." の時はエンジンを停止しないようにしてください。1 時間の走行で 3 分ほどかかります。
  - 万が一、エンジンを停止してしまった場合でも、次回起動時に "Conv..." となります。
  - 変換が終わり次第、"Ready" に戻ります。

<video controls width="100%" src="./images/sd-logging.mp4" title="microSD カードへのログ機能"></video>

- 変換が終わったデータは、SD カードから取り出して、CircuitTools でデータを分析できます。

### RaceChrono へのデータ転送機能

"Kuruma-Logger" の Wi-Fi アクセスポイントにスマホが接続できている状態で機能します。
CAN/GPS のデータを統合して、20Hz で RaceChrono に転送します。

- RaceChrono との通信設定（初回のみ）
  - RaceChrono の設定画面を開き、"その他のデバイスを追加" を選択します。
  - "RaceChrono DIY" を選択します。
  - "TCP/IP" を選択します。
  - "NMEA 0183"、"RC2/RC3"、"自動的に Wi-Fi に接続する" を選択します。
    - 外部接続の GPS を利用する方は、"NMEA 0183" を選択しないでください。
  - 設定を入力します（参考にデフォルト設定を載せておきます）。
    - SSID: Kuruma-Logger
    - パスワード: ※ M5Stack の Wi-Fi 設定画面で確認し入力してください。
    - IP アドレス: 192.168.4.1
    - ポート: 9000

<video controls width="100%" src="./images/racechrono-setting.mp4" title="RaceChrono への転送設定"></video>

- 転送開始手順
  - スマホで "Kuruma-Logger" の Wi-Fi アクセスポイントに接続します。
  - RaceChrono の開始ボタンを押します。

- 注意点
  - GPS が接続されていないと、ログが開始されません。
  - 外部 GPS を使う場合（GNSS モジュールを利用しない場合）は、機能選択画面で "RC Only" モードにしてください。

<video controls width="100%" src="./images/rconly-setting.mp4" title="RC Only モード設定"></video>

- ご参考
  - RaceChrono の使い方は下記 note にまとめてあります。
    - [RaceChrono のゲージの作り方][9]
    - [RaceChrono を使った動画作成][10]

[9]: https://note.com/kurumariond/n/nadaeebfe7813
[10]: https://note.com/kurumariond/n/n58d5a28a71cb

### メータ UI

画面の更新レートは基本的に 25Hz です。
CAN / GPS 取得およびログ機能を優先させるため、マイコンの負荷状況によっては更新レートが落ちる場合があります。

#### アナログメータ

各種 CAN 情報をアナログメータで確認できます。

![アナログメータ][img-analog-meter]

#### 4 分割デジタルメータ

あらかじめ指定された 4 つの項目をデジタル数字で確認できます。

![4分割デジタルメータ][img-digital-meter]

#### シフトアップインジケータ

回転数、シフト、ログボタンのシンプルな構成です。
レッドゾーンに入ると警告音が鳴ります。

![シフトアップインジケータ][img-shiftup-indicator]

#### 時系列モニタ

時系列データをモニタリングできます。

![時系列モニタ][img-timeseries-monitor]

#### システムメータ

システムの状態を確認できます。
CPU LOAD / MEMORY / GPS / CAN / WIFI / SD / TASK の状態を確認できます。

※ 何か不具合が起こった時にはこちらを確認いただけると原因がわかる場合があります。

![システムモニタ][img-system-monitor]

### 各種設定 UI

M5Stack 上で各種設定を変更できます。
画面下の丸ボタンを長押しすることで、設定画面に入ります。
上から下へスワイプすることで戻ることができます。

![設定画面][img-setting]

#### Feature Control

CAN / GPS / SD の機能を絞ることができます。
使わない機能はここで絞っておくことで、マイコンの負荷低減につながります。

GNSS モジュールを使わずに、RaceChrono への転送機能だけを利用する方は、"RC Only" モードを選択してください。転送のプロトコルが切り替わります。

#### SD init / Clear Logs

SD カード内のデータを削除できます。

#### System Info

MAC アドレスや Wi-Fi の設定情報を確認できます。

#### License Info

ライセンスの状態を確認できます。

#### OTA Update

アップデートがあれば、こちらを押すと無線でアップデートされます。
あらかじめ設定された、インターネットにつながる Wi-Fi の届く場所で実行してください。

#### WiFi ON/OFF

Wi-Fi の機能を ON / OFF できます。
ここでも Wi-Fi の設定情報を確認できます。

#### Mode Light/Dark

GUI のライトモード / ダークモードを切り替えることができます。

### WEB-UI

"Kuruma-Logger" の Wi-Fi アクセスポイントに接続できている状態で、"192.168.4.1"にアクセスすると開きます。
スマホやディスプレイオーディオで接続することで、比較的大きな画面で各種設定やダッシュボード機能が利用できます。

#### Dashboard 機能

ディスプレイオーディオやスマホで、ダッシュボードを表示できます。

![dashboard][img-dashboard]

#### RealTimeMonitor 機能

CAN で取得したデータをモニタリングできます。確認したい変数を選択してください。

![realtimemonitor][img-realtimemonitor]


#### Wi-Fi 設定変更

Wi-Fi の SSID やパスワードを変更できます。

※ 変更すると Wi-Fi の設定はやり直す必要があります。

![WEB-UI:Wi-Fi設定][img-webui-wifi-setting]

#### 車両設定切り替え

CAN のデコードを ND Roadster と FL5 Civic Type R で切り替えることができます。
切り替えると、M5Stackが自動的にリセットします。

![WEB-UI:車両設定][img-webui-vehicle-setting]

#### CANトランシーバ切り替え

CANトランシーバを切り替えることができます。

![WEB-UI: CAN トランシーバ設定][img-webui-can-transceiver-setting]

### その他

他にも機能はあるので、順次更新していきます。

問題が解消しない場合は、[トラブル対応（FAQ 統合）](../troubleshooting/) を確認してください。

<!--
画像 URL 一覧 (reference-style)。
本文から `![alt][img-<role>]` で参照しています。
撮り直し時は URL を変えずに同名ファイルを上書きしてください。
新しい写真を追加する場合は、ここに `[img-<role>]: ./images/<role>.<ext>` を追記し、
本文から `![alt][img-<role>]` で参照してください。
動画 (.mp4) は `![]` では再生されないため `<video controls src="./images/<file>.mp4">` で直接記述しています。
詳細は ./images/README.md を参照。
-->

[img-cover]:                          ./images/m5-cover-removal.jpeg
[img-dip]:                            ./images/gnss-dip-switch.png
[img-grove-pin]:                      ./images/grove-pin-removal.jpeg
[img-grove-txd]:                      ./images/grove-txd-confirmed.jpeg
[img-harness-connection]:             ./images/harness-canunit-connection.jpeg
[img-canunit-connected]:              ./images/canunit-connected.jpeg

[img-analog-meter]:                   ./images/analog-meter.jpg
[img-digital-meter]:                  ./images/digital-meter.jpg
[img-shiftup-indicator]:              ./images/shiftup-indicator.jpg
[img-timeseries-monitor]:             ./images/timeseries-monitor.jpg
[img-system-monitor]:                 ./images/system-monitor.jpg
[img-setting]:                        ./images/setting.jpg
[img-dashboard]:                      ./images/dashboard.jpg
[img-realtimemonitor]:                ./images/realtime-monitor.jpg
[img-webui-wifi-setting]:             ./images/webui-wifi-setting.jpg
[img-webui-vehicle-setting]:          ./images/webui-vehicle-setting.jpg
[img-webui-can-transceiver-setting]:  ./images/webui-can-transceiver-setting.jpg


