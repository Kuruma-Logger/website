<script setup lang="ts">
const endpoint = (import.meta.env.VITE_FORMSPREE_ENDPOINT || "").trim();
const siteUrl = (import.meta.env.VITE_SITE_URL || "").trim();
const baseUrl = import.meta.env.BASE_URL || "/";
const nextPath = `${baseUrl}contact/thanks/`;
const nextUrl = siteUrl ? new URL(nextPath, siteUrl).toString() : nextPath;
const isEnabled = endpoint.length > 0;
</script>

<template>
  <div v-if="!isEnabled" class="notice-card notice-warn">
    <p>Formspree の送信先が未設定です。<code>VITE_FORMSPREE_ENDPOINT</code> を設定してください。</p>
    <p>設定後に再ビルドするとフォーム送信が有効になります。</p>
  </div>

  <form v-else class="contact-form" method="POST" :action="endpoint">
    <input type="hidden" name="_subject" value="Kuruma-Logger サポート問い合わせ" />
    <input type="hidden" name="_next" :value="nextUrl" />
    <input type="text" name="_gotcha" class="hidden-field" tabindex="-1" autocomplete="off" />

    <label>
      <span>お名前</span>
      <input type="text" name="name" autocomplete="name" required />
    </label>

    <label>
      <span>メールアドレス</span>
      <input type="email" name="email" autocomplete="email" required />
    </label>

    <label>
      <span>カテゴリ</span>
      <select name="category" required>
        <option value="">選択してください</option>
        <option value="setup">セットアップ</option>
        <option value="connection">接続/連携</option>
        <option value="logging">ログ保存</option>
        <option value="other">その他</option>
      </select>
    </label>

    <label>
      <span>車種</span>
      <select name="vehicle" required>
        <option value="">選択してください</option>
        <option value="nd">Mazda Roadster ND</option>
        <option value="fl5">Honda Civic FL5</option>
        <option value="unknown">不明</option>
      </select>
    </label>

    <label>
      <span>ファームウェアバージョン</span>
      <input type="text" name="firmware_version" placeholder="例: v0.2.3" />
    </label>

    <label>
      <span>発生手順・症状</span>
      <textarea
        name="message"
        required
        placeholder="いつ、どの操作で、何が起きたかを記載してください。"
      />
    </label>

    <label class="consent-row">
      <input type="checkbox" name="consent" value="agreed" required />
      <span>送信内容がサポート対応に利用されることに同意します。</span>
    </label>

    <button class="submit-button" type="submit">送信する</button>
  </form>
</template>
