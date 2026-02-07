---
layout: ../../layouts/DocLayout.astro
title: セットアップガイド
currentPath: /setup/
---

# セットアップガイド

初回導入時に必要な機材と基本手順をまとめています。

## 必要なもの

- Kuruma-Logger 対応ハードウェア
    - [M5Stack CoreS3 SE][1]
    - [M5Stack用GNSSモジュール 気圧/IMU/地磁気センサ付き][2]
    - [M5Stack バッテリーボトム 黒（110mAh ）V1.1][3]
    - [M5Stack用ミニCANユニット（TJA1051T/3）][4]
    - 中間ハーネス
        - [ND5RC用][5]
        - FL5用(未公開)
    - [microSDカード][6]

- CAN 配線および電源系の接続一式
- GPS アンテナ（必要環境に応じて）
- microSD カード（ログ保存する場合）

[1]:https://ssci.to/9690
[2]:https://ssci.to/9276
[3]:https://ssci.to/9572
[4]:https://ssci.to/9567
[5]:https://note.com/kurumariond/n/ne24bdf3824da
[6]:https://www.amazon.co.jp/KIOXIA-%E3%82%AD%E3%82%AA%E3%82%AF%E3%82%B7%E3%82%A2-microSDHC%E3%82%AB%E3%83%BC%E3%83%89-Amazon-co-jp%E3%83%A2%E3%83%87%E3%83%AB-KLMEA032G/dp/B08PTNWQ6P?ref_=ast_sto_dp&th=1

## 初回起動までの手順

1. ハードウェア配線を確認し、電源投入する
2. 起動後、画面にエラーがないことを確認する
3. Wi-Fi 設定 UI で必要なネットワーク設定を行う
4. GPS 初期化 UI で受信状況を確認する
5. CAN/GPS 値が画面更新されることを確認する

## つまずきやすいポイント

- 車種プロファイル設定が実車と一致していないと値が正しく出ません。
- GPS 受信開始直後は時刻同期まで時間がかかる場合があります。
- SD カードはフォーマット形式によって認識できない場合があります。

問題が解消しない場合は、[トラブル対応（FAQ統合）](../troubleshooting/)を確認してください。
