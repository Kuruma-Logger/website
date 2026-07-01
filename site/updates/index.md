---
title: 更新情報
description: Kuruma-Logger のファームウェア配信状況、更新履歴、RaceChrono 転送変数をまとめています。
---

# 更新情報

ここではファームウェアの更新状況をまとめます。既知の不具合と対応状況は[こちら](../known-issues/)をご覧ください。

## 配信ステータス（2026-06-21 時点）

::: warning ⚠️ ご利用中のすべてのお客様へ — PC からの再インストールをお願いします
2026-05-15 以前のファームウェア (v1.0.7 以前) には **OTA 機能をブロックする重大なバグ** がありました。該当バージョンが入っている本体は、**今後の OTA アップデートを受け取ることができません**。詳細は [既知の不具合](../known-issues/#ota-v1-0-7-以前) を参照してください。

**お手数をおかけし大変申し訳ありません。** 一度 PC の Web インストーラから配信中の最新版を **新規インストール (USB 経由)** していただく必要があります。これ以降は OTA で更新可能になります。

- 該当 device の見分け方: バージョン表示が `1.0.7` 以下 / OTA ボタンを押しても進まない / 「Preparing 8%」で止まる
- 再インストール手順: [WEB インストーラを開く](https://app.kuruma-logger.com/setup/) → ログイン → デバイス選択 → USB 接続 → 書き込み
- インストール時に Wi-Fi / 車種 / 設定はリセットされます。ブラウザ上で再度入力してください。
- 再インストール後は [初回起動までの手順](../setup/#初回起動までの手順) に戻って動作を確認してください。
- v1.0.10 以降の本体は **OTA で配信中の最新版に更新可能** です (再インストール不要)。
:::

::: info サービス全体は beta 提供中
Kuruma-Logger は現在 **beta** として運用しており、機能追加・仕様変更が継続的に入ります。GitHub Release は prerelease としてマークされています。
:::

| 本体 | 車種 | 新規インストール | 更新インストール | ステータス |
| --- | --- | --- | --- | --- |
| M5Stack CoreS3 | Roadster ND / Civic FL5 | v1.0.15 (beta) | v1.0.15 (beta) | 配信中 |
| M5Stack Tab5 | Roadster ND / Civic FL5 | v1.0.18 (beta) | v1.0.18 (beta) | 配信中 |

v1.0.14 を利用中で GPS が NoDATA になる場合は、OTA で v1.0.15 以降へ更新してください。更新後に GPS 受信機の設定が自動回復します。

## WEB インストーラ

ブラウザからファームウェア書き込みを行う場合は、以下から開始してください。

- [WEB インストーラを開く](https://app.kuruma-logger.com/setup/)

## 更新履歴

| バージョン | 日付 | 主な変更点 |
| --- | --- | --- |
| v1.0.18 (beta) | 2026-06-21 | **M5Stack Tab5 の Wi-Fi AP 起動と iPhone 接続完了性を改善**。電源再投入や USB 抜き差し後に AP が出ない場合があったため、Tab5 の Wi-Fi モジュール初期化を見直しました。STA 接続に失敗しても AP を維持するようにし、iPhone/スマホの captive network check へ応答するよう WEB インストーラ / OTA を更新しました。 |
| v1.0.17 (beta) | 2026-06-15 | **M5Stack Tab5 の Wi-Fi AP 接続安定性を改善**。一部スマホで "Kuruma-Logger" AP は見えるが接続できない場合があったため、Tab5 の Wi-Fi AP モードをスマホ互換性重視の設定に変更しました。RaceChrono 接続切断後の安定性も改善し、Tab5 向け WEB インストーラ / OTA を更新しました。 |
| v1.0.16 (beta) | 2026-06-14 | **M5Stack Tab5 向けの WEB インストーラ / OTA 配信を開始**。Control Line 画面で走行中でもマークしやすい ARM MARK 操作に変更し、縦スワイプで上位画面へ戻れるようにしました。LapTime 空きスペースの ARM 状態表示、GPS 測位完了時の GPS FIXED 表示、Diff 表示更新、RaceChrono 接続情報の SystemInfo 表示も改善しました。 |
| v1.0.15 (beta) | 2026-06-13 | **GPS が NoDATA になる問題を修正**。電源再投入後に GPS 受信機設定が失われる不具合がありましたが、v1.0.15 以降への OTA 更新で自動回復します。Tab5 の GNSS/CAN ピン配置を変更しました。Tab5 で v1.0.13 以前から配線済みの方は配線確認が必要です（GNSS は M-Bus pin 21/22）。RaceChrono RC3 のアナログチャンネルを仕様上限の 15ch に修正し、ND の a16 燃料消費チャンネルを削除しました。 |
| v1.0.14 (beta) | 2026-06-12 | Tab5 の GNSS/CAN ピン配置を変更しました。v1.0.14 では一部環境で GPS が NoDATA になる問題が確認されたため、v1.0.15 以降への更新を推奨します。 |
| v1.0.13 (beta) | 2026-05-17 | M9.8 HTTPS Jobs poller (ADR-013 v1 設計) を完全削除 (-531 LOC)。AWS IoT mTLS は MQTT 動詞のみサポートで HTTPS Jobs DP は構造的に動作不能なため。2026-05-16/17 の OTA 信頼性改善の知見レポート (`docs/reports/2026-05-17_ota_reliability_lessons.md`) を追加。 |
| v1.0.12 (beta) | 2026-05-17 | **chunked OTA の chunk-0 取得失敗の根本対策**。OTA 中に headless portal の httpd を一時停止して LWIP socket pool の 3 slot を解放、`CONFIG_LWIP_MAX_SOCKETS` を 10→16 に拡大、chunked path の TLS handshake で SNI (`common_name`) を明示セット、`TCP_MSL` を 60s→10s に短縮。実機検証で chunked OTA は 6 attempts 全敗 → legacy fallback だった挙動が 1 attempt で全 42 chunks ダウンロード成功 (~75s) に改善。今までの「Preparing 8% を繰り返した後 8%→100% jump」の挙動は消える。詳細: `docs/reports/2026-05-17_chunked_ota_chunk0_root_cause.md`。 |
| v1.0.11 (beta) | 2026-05-17 | OTA 進捗バーの 0% 固着を解消。chunked OTA で chunk 0 の download が始まる前の catalog/manifest fetch + 署名検証 + flash erase (~15-20s) の間にも進捗 phase (1% Fetching catalog → 3% Fetching manifest → 5% Verifying manifest → 8% Erasing partition) を細かく報告するようにした。 |
| v1.0.10 (beta) | 2026-05-17 | **OTA ボタンを押しても進まない**クリティカルなバグを修正。NVS 累積で boot heap が断片化した個体で `boot_guard_clear` task の spawn が silently 失敗し、起動時の image valid マーキング (`esp_ota_mark_app_valid_cancel_rollback`) が実行されず、現在の image が PENDING_VERIFY 状態のまま居座って後続の `esp_ota_begin()` が `ESP_ERR_OTA_ROLLBACK_INVALID_STATE` で永続的にブロックされていた。spawn 失敗時の inline fallback と OTA 開始時の defensive mark_valid の 2 段で防御。**該当する device は本バージョン以降への USB 再 flash 後、再発しなくなる**。 |
| v1.0.9 (beta) | 2026-05-16 | Web インストーラ Step 3 で **Civic FL5 を選択しても NVS には Roadster ND として保存される**クリティカルなバグを修正。`provisioning_service.cpp` の CFG2 payload parser が `vehicle` 値を `BootstrapRecord.vehicle_code` (provisioning metadata 用) にのみ書き込んでおり、ランタイムで実際に参照される `settings.system.vehicle_kind` (UI / CAN parser / UiBindings の切替に使用) は default のままだった。FL5 ユーザは新規インストール後に必ず本バージョンに更新してください。 |
| v1.0.8 (beta) | 2026-05-16 | OTA 配信を **AWS IoT Jobs (MQTT 経由)** ベースの新方式に対応 (ADR-013 v2)。起動時の internal RAM 不足で `main_task` / `boot_guard_clear` がスタックオーバーフローしていた問題を構造的に修正 (`MAIN_TASK_STACK` 8K→4K、Wi-Fi static TX buffer 半減)。OTA 書き込み中の cache freeze assert を回避するため worker タスクを internal RAM stack に固定。Portal に「AWS MQTT OTA を実行」エンドポイントを追加 (POC)。 |
| v1.0.7 (beta) | 2026-05-15 | **Chunked OTA** に対応 (ADR-011)。`latest.json` 経由で版番号を引いた後、64 KiB の chunk と署名付き manifest を順次取得することで TLS セッションの長尺接続による mid-stream 失敗を抑止。Manifest を ECDSA P-256 で署名し、デバイス側で公開鍵検証。 |
| v1.0.6 (beta) | 2026-05-13 | SSM_Task のスタック (16K→6K) を整理して boot 時の internal heap を解放。TWAI (CAN) 割り込みフラグを LOWMED に緩和し、boot 後半で intr level1 リソース枯渇に巻き込まれて CAN 初期化に失敗していた回帰を修正。起動時に最後に表示していた画面を復元できるように。Maintenance dialog の Feature Control (FC) 長押しが解除されない不具合を修正。 |
| v1.0.5 (beta) | 2026-05-06 | PWRCAN モジュールに対応 (UnitMiniCAN と AP ポータルから切替可能)。起動時 WiFi AP が dev_mode で落ちる回帰を修正。アナログメータ右上の単位表示の見切れを修正。SystemMonitor に「TASKS」ページを追加し、タスク別 CPU 占有率を確認可能に。NVS に残った旧 AP パスワードのマイグレーション実装。 |
| v1.0.4 (beta) | 2026-05-06 | OTA 配信パスをボード別スキーマに統一。CI ビルドの ``vX.Y.Z-dirty`` 表記を解消。 |
| v1.0.3 (beta) | 2026-05-06 | UI 桁固定 (tabular numerics) でメーター値の桁ジッターを解消、Maintenance dialog に MODE タイル追加 (Light/Dark 切替)、SD 容量表示を free / total GB に拡張。 |
| v0.2.3 | 2026-03-07 | ビルド時のデフォルト車種設定を Roadster ND（ND5RC）に切り替え。 |
| v0.2.2 | 2026-03-07 | Shift-up インジケータの閾値を車種ごとに設定可能化し、FL5 / ND で表示色とビープ条件を最適化。 |
| v0.2.1 | 2026-03-07 | FL5 のブレーキ表示値を補正。Shift-up インジケータの閾値と配色を調整し、FL5 の Shift-up ビープに対応。 |
| v0.2.0 | 2026-03-07 | Live Monitor 導入、GUI 統合と FL5 表示改善、Shift-up 表示 / ビープ応答性改善、前回画面の復元に対応。 |
| v0.1.2 | 2026-02-21 | バージョン情報を修正。 |
| v0.1.1 | 2026-02-20 | GMonitor に対応。 |
| v0.0.3.0 | 2026-02-05 | CAN のデコード情報を修正。VBO ファイルへの変換ロジックを修正。 |

## RaceChrono 転送変数リスト

転送変数リストは [使い方ガイド](../guide/#転送変数リスト) に移動しました。
