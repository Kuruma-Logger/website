---
title: 更新情報
description: Kuruma-Logger のファームウェア配信状況、更新履歴、RaceChrono 転送変数をまとめています。
---

# 更新情報

ここではファームウェアの更新状況をまとめます。

## 配信ステータス（2026-05-16 時点）

::: info サービス全体は beta 提供中
Kuruma-Logger は現在 **beta** として運用しており、機能追加・仕様変更が継続的に入ります。GitHub Release は prerelease としてマークされています。
:::

| 車種 | 新規インストール | 更新インストール | ステータス |
| --- | --- | --- | --- |
| Roadster ND | v1.0.8 (beta) | v1.0.8 (beta) | 配信中 |
| Civic FL5 | v1.0.8 (beta) | v1.0.8 (beta) | 配信中 |

## WEB インストーラ

ブラウザからファームウェア書き込みを行う場合は、以下から開始してください。

- [WEB インストーラを開く](https://app.kuruma-logger.com/portal/)

## 更新履歴

| バージョン | 日付 | 主な変更点 |
| --- | --- | --- |
| v1.0.8 (beta) | 2026-05-16 | OTA 配信を **AWS IoT Jobs (MQTT 経由)** ベースの新方式に対応 (ADR-013 v2)。起動時の internal RAM 不足で `main_task` / `boot_guard_clear` がスタックオーバーフローしていた問題を構造的に修正 (`MAIN_TASK_STACK` 8K→4K、Wi-Fi static TX buffer 半減)。OTA 書き込み中の cache freeze assert を回避するため worker タスクを internal RAM stack に固定。Portal に「AWS MQTT OTA を実行」エンドポイントを追加 (POC)。 |
| v1.0.7 (beta) | 2026-05-15 | **Chunked OTA** に対応 (ADR-011)。`latest.json` 経由で版番号を引いた後、64 KiB の chunk と署名付き manifest を順次取得することで TLS セッションの長尺接続による mid-stream 失敗を抑止。Manifest を ECDSA P-256 で署名し、デバイス側で公開鍵検証。 |
| v1.0.6 (beta) | 2026-05-13 | SSM_Task のスタック (16K→6K) を整理して boot 時の internal heap を解放。TWAI (CAN) 割り込みフラグを LOWMED に緩和し、boot 後半で intr level1 リソース枯渇に巻き込まれて CAN 初期化に失敗していた回帰を修正。起動時に最後に表示していた画面を復元できるように。Maintenance dialog の Feature Control (FC) 長押しが解除されない不具合を修正。 |
| v1.0.5 (beta) | 2026-05-06 | PWRCAN モジュールに対応 (UnitMiniCAN と AP ポータルから切替可能)。起動時 WiFi AP が dev_mode で落ちる回帰を修正。アナログメータ右上の単位表示の見切れを修正。SystemMonitor に「TASKS」ページを追加し、タスク別 CPU 占有率を確認可能に。NVS に残った旧 AP パスワードのマイグレーション実装。 |
| v1.0.4 (beta) | 2026-05-06 | OTA 配信パスを 3-board (m5stack / m5tab5 / xiao_can) スキーマに統一。M5Tab5 で board code が m5stack 扱いになっていた回帰を修正し、独立に OTA を取得可能に。CI ビルドの ``vX.Y.Z-dirty`` 表記を解消。 |
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
