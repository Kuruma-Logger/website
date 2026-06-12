---
title: 使い方ガイド
description: Kuruma-Logger の画面の見方、設定、RaceChrono 連携、microSD ログの使い方をまとめています。
---

# 使い方ガイド

Kuruma-Logger の画面の見方と各機能の使い方をまとめています。

::: info
本ページは M5Stack CoreS3 SE / ファームウェア v1.0.13 時点の情報です。
:::

## 機能紹介動画

<div class="video-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/QdvRFSGkAac" title="【Kuruma-Logger】主な機能の紹介" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

## 本体の画面

画面の更新レートは基本的に 25Hz です。
CAN / GPS 取得およびログ機能を優先させるため、マイコンの負荷状況によっては更新レートが落ちる場合があります。

画面は左右スワイプで切り替えられます。以下の 8 画面を巡回します。

### Web Portal

接続中のアクセスポイント名と QR コード、メンテナンス画面への入口です。

### Preflight

走行前チェック画面です。各機能の状態を走行前に確認できます。

### Dashboard

あらかじめ指定された 4 つの項目をデジタル数字で確認できます。

![4分割デジタルメータ][img-dashboard-screen]

### Roadster Vitals

各種 CAN 情報をアナログメータで確認できます。

表示できるゲージは ND: 12 種類 / FL5: 14 種類です。

![アナログメータ][img-analog-meter]

### Shift Up Indicator

回転数、シフト、ログボタンのシンプルな構成です。
レッドゾーンに入ると警告音が鳴ります。

![シフトアップインジケータ][img-shiftup-indicator]

### Accel / Brake

アクセルとブレーキの操作量を縦バーで確認できます。ブレーキの単位は ND: bar / FL5: MPa です。

### G Monitor

前後左右の G を G-G 図で確認できます。ND ではヨーレートも表示されます（FL5 は CAN にデータがないため非表示）。

### CPU

13 本の診断バーで、回転数・速度・操作量など各信号の動きをまとめて確認できます。

また、System Monitor では CPU LOAD / MEMORY / GPS / CAN / WIFI / SD / TASK の状態を確認できます。何か不具合が起こった時にはこちらを確認いただけると原因がわかる場合があります。

![システムモニタ][img-system-monitor]

## 設定メニュー

M5Stack 上で各種設定を変更できます。
画面下の丸ボタンを長押しすることで、設定画面に入ります。
上から下へスワイプすることで戻ることができます。

![設定画面][img-setting]

### Feature Control

CAN / GPS / SD の機能を絞ることができます。
使わない機能はここで絞っておくことで、マイコンの負荷低減につながります。

GNSS モジュールを使わずに、RaceChrono への転送機能だけを利用する方は、"RC Only" モードを選択してください。転送のプロトコルが切り替わります。

### SD init / Clear Logs

SD カード内のデータを削除できます。

### System Info

MAC アドレスや Wi-Fi の設定情報を確認できます。

### License Info

ライセンスの状態を確認できます。

### OTA Update

アップデートがあれば、こちらを押すと無線でアップデートされます。
あらかじめ設定された、インターネットにつながる Wi-Fi の届く場所で実行してください。

### WiFi ON/OFF

Wi-Fi の機能を ON / OFF できます。
ここでも Wi-Fi の設定情報を確認できます。

### Mode Light/Dark

GUI のライトモード / ダークモードを切り替えることができます。

## WEB-UI

"Kuruma-Logger" の Wi-Fi アクセスポイントに接続できている状態で、"192.168.4.1" にアクセスすると開きます。
スマホやディスプレイオーディオで接続することで、比較的大きな画面で各種設定やダッシュボード機能が利用できます。

| URL | 機能 |
| --- | --- |
| `/` | ポータル。車種切り替え、CAN トランシーバ切り替え、OTA の入口 |
| `/dashboard` | ダッシュボード表示 |
| `/monitor` | リアルタイムモニタ |
| `/wifi` | Wi-Fi 設定の変更 |
| `/ota` | OTA 更新 |

### Dashboard 機能

ディスプレイオーディオやスマホで、ダッシュボードを表示できます。

![dashboard][img-dashboard]

### RealTimeMonitor 機能

CAN で取得したデータをモニタリングできます。確認したい変数を選択してください。

![realtimemonitor][img-realtimemonitor]

### Wi-Fi 設定変更

Wi-Fi の SSID やパスワードを変更できます。

※ 変更すると Wi-Fi の設定はやり直す必要があります。

![WEB-UI:Wi-Fi設定][img-webui-wifi-setting]

### 車両設定切り替え

CAN のデコードを ND Roadster と FL5 Civic Type R で切り替えることができます。
切り替えると、M5Stack が自動的にリセットします。

![WEB-UI:車両設定][img-webui-vehicle-setting]

### CANトランシーバ切り替え

CAN トランシーバを切り替えることができます。

![WEB-UI: CAN トランシーバ設定][img-webui-can-transceiver-setting]

## microSD カードへのログ

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

## RaceChrono へのデータ転送

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
    - ポート: 57752
  - ※ 実際のポート番号は本体の Wi-Fi 設定画面、または WEB-UI の Wi-Fi 設定ページで確認できます。

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

### 転送変数リスト

RC3 プロトコルで RaceChrono に転送する項目の一覧です（ND: 24 項目 / FL5: 23 項目）。RaceChrono 側では a1〜a16 が Analog1〜Analog16 に対応します。

#### ND5RC（Roadster ND）

| # | 変数名 | 説明 | 単位 |
| --- | --- | --- | --- |
| 1 | ax | 加速度 X | G |
| 2 | ay | 加速度 Y | G |
| 3 | az | 加速度 Z | （データなし） |
| 4 | gx | 角速度 X | （データなし） |
| 5 | gy | 角速度 Y | （データなし） |
| 6 | gz | 角速度 Z | deg/s |
| 7 | rpm | エンジン回転数 | rpm |
| 8 | gear | ギア位置 | |
| 9 | a1 | 車速 | km/h |
| 10 | a2 | アクセル開度 | % |
| 11 | a3 | ブレーキ圧 | kPa |
| 12 | a4 | ステア角度 | deg |
| 13 | a5 | ステアトルク | N·m |
| 14 | a6 | 吸気温度 | ℃ |
| 15 | a7 | エンジン水温 | ℃ |
| 16 | a8 | 燃料残量 | L |
| 17 | a9 | iDM モード | （4: 緑, 32: 青） |
| 18 | a10 | 左前ホイール速度 | km/h |
| 19 | a11 | 右前ホイール速度 | km/h |
| 20 | a12 | 左後ホイール速度 | km/h |
| 21 | a13 | 右後ホイール速度 | km/h |
| 22 | a14 | クラッチ状態 | （1: NonPress, 2: Press） |
| 23 | a15 | パーキングブレーキ状態 | （0: OFF, 1: ON） |
| 24 | a16 | 燃料消費量 | L |

#### FL5（Civic FL5）

| # | 変数名 | 説明 | 単位 |
| --- | --- | --- | --- |
| 1 | ax | 加速度 X | G |
| 2 | ay | 加速度 Y | G |
| 3 | az | 加速度 Z | （データなし） |
| 4 | gx | 角速度 X | （データなし） |
| 5 | gy | 角速度 Y | （データなし） |
| 6 | gz | 角速度 Z | （データなし） |
| 7 | rpm | エンジン回転数 | rpm |
| 8 | gear | ギア位置 | |
| 9 | a1 | 車速 | km/h |
| 10 | a2 | アクセルペダル開度 | % |
| 11 | a3 | ブレーキ圧 | MPa |
| 12 | a4 | スロットル開度 | %（解析中） |
| 13 | a5 | 水温 | ℃ |
| 14 | a6 | 吸気温 | ℃ |
| 15 | a7 | 油温 | ℃ |
| 16 | a8 | 油圧 | kPa |
| 17 | a9 | ブースト | 100kPa 単位（解析中） |
| 18 | a10 | 外気温 | ℃ |
| 19 | a11 | 左前ホイール速度 | km/h |
| 20 | a12 | 右前ホイール速度 | km/h |
| 21 | a13 | 左後ホイール速度 | km/h |
| 22 | a14 | 右後ホイール速度 | km/h |
| 23 | a15 | 燃料残量 | %（解析中） |

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

[img-dashboard-screen]:              ./images/digital-meter.jpg
[img-analog-meter]:                  ./images/analog-meter.jpg
[img-shiftup-indicator]:             ./images/shiftup-indicator.jpg
[img-system-monitor]:                ./images/system-monitor.jpg
[img-setting]:                       ./images/setting.jpg
[img-dashboard]:                     ./images/dashboard.jpg
[img-realtimemonitor]:               ./images/realtime-monitor.jpg
[img-webui-wifi-setting]:            ./images/webui-wifi-setting.jpg
[img-webui-vehicle-setting]:         ./images/webui-vehicle-setting.jpg
[img-webui-can-transceiver-setting]: ./images/webui-can-transceiver-setting.jpg
