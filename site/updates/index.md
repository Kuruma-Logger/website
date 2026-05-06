---
title: 更新情報
description: Kuruma-Logger のファームウェア配信状況、更新履歴、RaceChrono 転送変数をまとめています。
---

# 更新情報

ここではファームウェアの更新状況をまとめます。

## 配信ステータス（2026-05-06 時点）

::: info サービス全体は beta 提供中
Kuruma-Logger は現在 **beta** として運用しており、機能追加・仕様変更が継続的に入ります。GitHub Release は prerelease としてマークされています。
:::

| 車種 | 新規インストール | 更新インストール | ステータス |
| --- | --- | --- | --- |
| Roadster ND | v1.0.3 (beta) | v1.0.3 (beta) | 配信中 |
| Civic FL5 | v1.0.3 (beta) | v1.0.3 (beta) | 配信中 |

## WEB インストーラ

ブラウザからファームウェア書き込みを行う場合は、以下から開始してください。

- [WEB インストーラを開く](https://app.kuruma-logger.com/portal/)

## 更新履歴

| バージョン | 日付 | 主な変更点 |
| --- | --- | --- |
| v1.0.3 (beta) | 2026-05-06 | UI 桁固定 (tabular numerics) でメーター値の桁ジッターを解消、Maintenance dialog に MODE タイル追加 (Light/Dark 切替)、SD 容量表示を free / total GB に拡張。 |
| v0.2.3 | 2026-03-07 | ビルド時のデフォルト車種設定を Roadster ND（ND5RC）に切り替え。 |
| v0.2.2 | 2026-03-07 | Shift-up インジケータの閾値を車種ごとに設定可能化し、FL5 / ND で表示色とビープ条件を最適化。 |
| v0.2.1 | 2026-03-07 | FL5 のブレーキ表示値を補正。Shift-up インジケータの閾値と配色を調整し、FL5 の Shift-up ビープに対応。 |
| v0.2.0 | 2026-03-07 | Live Monitor 導入、GUI 統合と FL5 表示改善、Shift-up 表示 / ビープ応答性改善、前回画面の復元に対応。 |
| v0.1.2 | 2026-02-21 | バージョン情報を修正。 |
| v0.1.1 | 2026-02-20 | GMonitor に対応。 |
| v0.0.3.0 | 2026-02-05 | CAN のデコード情報を修正。VBO ファイルへの変換ロジックを修正。 |

## RaceChrono 転送変数リスト

RaceChrono の Analog1 から Analog15 に転送している項目です。

### ND5RC（Roadster ND）

| Analog | 変数名 | 単位 |
| --- | --- | --- |
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

### FL5（Civic FL5）

| Analog | 変数名 | 単位 |
| --- | --- | --- |
| Analog1 | 車速 | km/h |
| Analog2 | アクセルペダル開度 | % |
| Analog3 | ブレーキ圧 | MPa |
| Analog4 | スロットル開度 | % |
| Analog5 | 水温 | ℃ |
| Analog6 | 吸気温 | ℃ |
| Analog7 | 油温 | ℃ |
| Analog8 | 油圧 | kPa |
| Analog9 | ブースト圧 | 100kPa 単位 |
| Analog10 | 外気温 | ℃ |
| Analog11 | 左前輪ホイール速度 | km/h |
| Analog12 | 右前輪ホイール速度 | km/h |
| Analog13 | 左後輪ホイール速度 | km/h |
| Analog14 | 右後輪ホイール速度 | km/h |
| Analog15 | 燃料残量 | % |
