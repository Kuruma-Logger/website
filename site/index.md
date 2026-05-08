---
layout: home
title: Kuruma-Logger サポートサイト
titleTemplate: false
description: Kuruma-Logger のセットアップ、トラブル対応、更新情報をまとめたサポートサイトです。
aside: false
hero:
  name: Kuruma-Logger
  text: サポートサイト
  tagline: セットアップ、トラブル対応、更新情報を一か所にまとめています。
  actions:
    - theme: brand
      text: セットアップを確認
      link: /setup/
    - theme: alt
      text: 問い合わせる
      link: /contact/
features:
  - title: セットアップ
    details: 必要機材と初回起動までの流れを確認できます。
    link: /setup/
  - title: トラブル対応
    details: 症状別の確認手順とFAQを1ページにまとめています。
    link: /troubleshooting/
  - title: 更新情報
    details: 配信中のバージョンと変更内容を確認できます。
    link: /updates/
  - title: 特商法表記
    details: ライセンス販売に関する表示事項を確認できます。
    link: /legal/
---

## Kuruma-Logger の機能概要

- 対応車種の CAN データを収集し、SD カードへ走行ログとして保存します。
- セットアップ手順、トラブル対応、更新情報をサポートサイトで一元管理します。
- ライセンス管理により、機能提供とアップデート配布を継続的に運用します。

::: warning 注意
Kuruma-Logger はソフトウェアとして提供されます。車両本体、配線、電源、センサー、記録媒体などのハードウェアに起因する不具合や損害については、運営者は責任を負いません。
:::

## 構成図

<div class="home-diagram-grid">
  <article class="home-diagram-card">
    <h3>ハードウェア構成図</h3>
    <img src="./architecture/hardware.svg" alt="Kuruma-Logger ハードウェア構成図" />
  </article>
  <article class="home-diagram-card">
    <h3>ソフトウェア構成図</h3>
    <img src="./architecture/software.svg" alt="Kuruma-Logger ソフトウェア構成図" />
  </article>
</div>
