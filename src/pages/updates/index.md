---
layout: ../../layouts/DocLayout.astro
title: ファームウェア情報
currentPath: /updates/
---

# 更新情報

ここではファームウェアの更新状況をまとめます。

## 配信ステータス（2026-02-21時点）

| 車種 | 新規インストール | 更新インストール | ステータス |
|---|---|---|---|
| Roadster ND | v0.1.2 | v0.1.2 | 配信中 |
| Civic FL5 | v0.1.2 | v0.1.2 | 配信中 |

## WEBインストーラ

ブラウザからファームウェア書き込みを行う場合は、以下から開始してください。

- [WEBインストーラを開く](https://ik1-117-65350.vs.sakura.ne.jp)

## 更新履歴

| バージョン | 日付 | 主な変更点 |
|---|---|---|
| v0.1.2 | 2026-02-21 | バージョン情報の修正。 |
| v0.1.1 | 2026-02-20 | GMonitor対応。 |
| v0.0.3.0 | 2026-02-05 | CANのデコード情報を修正。VBOファイルへの変換ロジック修正。 |

## RaceChrono 転送変数リスト

RaceChrono の Analog1〜Analog15 に転送している項目です。

### ND5RC (Roadster ND)

| Analog | 変数名 | 単位 |
|---|---|---|
| Analog1 | 車速 | km/h |
| Analog2 | アクセル開度 | % |
| Analog3 | ブレーキ圧 | % |
| Analog4 | ステア角度 | deg |
| Analog5 | ステアトルク | N·m |
| Analog6 | 吸気温度 | ℃ |
| Analog7 | エンジン水温 | ℃ |
| Analog8 | 燃料残量 | L |
| Analog9 | モード | 状態値 |
| Analog10 | 左前輪ホイール速度 | km/h |
| Analog11 | 右前輪ホイール速度 | km/h |
| Analog12 | 左後輪ホイール速度 | km/h |
| Analog13 | 右後輪ホイール速度 | km/h |
| Analog14 | クラッチ状態 | 状態値 |
| Analog15 | パーキングブレーキ状態 | 状態値 |

### FL5 (Civic FL5)

| Analog | 変数名 | 単位 |
|---|---|---|
| Analog1 | 車速 | km/h |
| Analog2 | アクセルペダル開度 | % |
| Analog3 | ブレーキ圧 | MPa |
| Analog4 | スロットル開度 | % |
| Analog5 | 水温 | ℃ |
| Analog6 | 吸気温 | ℃ |
| Analog7 | 油温 | ℃ |
| Analog8 | 油圧 | kPa |
| Analog9 | ブースト圧 | 100kPa単位 |
| Analog10 | 外気温 | ℃ |
| Analog11 | 左前輪ホイール速度 | km/h |
| Analog12 | 右前輪ホイール速度 | km/h |
| Analog13 | 左後輪ホイール速度 | km/h |
| Analog14 | 右後輪ホイール速度 | km/h |
| Analog15 | 燃料残量 | % |
