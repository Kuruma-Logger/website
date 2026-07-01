---
layout: home
title: Kuruma-Logger サポートサイト
titleTemplate: false
description: Kuruma-Logger のセットアップ、使い方、トラブル対応、更新情報をまとめたサポートサイトです。
aside: false
hero:
  name: Kuruma-Logger
  text: サポートサイト
  tagline: セットアップ、使い方、トラブル対応、更新情報を一か所にまとめています。
  actions:
    - theme: brand
      text: セットアップを始める
      link: /setup/
    - theme: alt
      text: 使い方ガイド
      link: /guide/
features:
  - title: セットアップ
    details: 必要機材と初回起動までの流れを確認できます。
    link: /setup/
  - title: 使い方ガイド
    details: 画面の見方、RaceChrono 連携、microSD ログの使い方をまとめています。
    link: /guide/
  - title: トラブル対応
    details: 症状別の確認手順と問い合わせ前のチェックリストです。
    link: /troubleshooting/
  - title: 既知の不具合
    details: 現在把握している不具合と対応状況（調査中・回避策あり・修正済み）を確認できます。
    link: /known-issues/
  - title: 更新情報
    details: 配信中のファームウェアと変更内容を確認できます。
    link: /updates/
---

::: warning 重要なお知らせ（2026-06-14）
v1.0.7 以前のファームウェアには OTA 更新を受け取れない不具合があります。該当する方は PC の WEB インストーラから配信中の最新版を再インストールしてください。詳しくは [既知の不具合](./known-issues/) を確認してください。
:::

## Kuruma-Logger とは

対応車種（Roadster ND / Civic Type R FL5）の CAN データと GPS を 25Hz で記録し、メータ表示・RaceChrono 連携・microSD への走行ログ保存ができる車載データロガーです。

<div class="video-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/AuV_nHszgyY" title="Kuruma-Loggerの紹介" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
</div>

- 走行ログを microSD に保存し、CircuitTools などで分析できます。
- RaceChrono へ 20Hz でリアルタイム転送できます。
- スマホやディスプレイオーディオでダッシュボードを表示できます。

::: warning 注意
Kuruma-Logger はソフトウェアとして提供されます。車両本体、配線、電源、センサー、記録媒体などのハードウェアに起因する不具合や損害については、運営者は責任を負いません。
:::
