# Zoom 本日の議事スケジュールアプリ

Zoom App 内で「本日の議事スケジュール」を表示する最小サンプルです。

## 1. セットアップ

```bash
npm install
npm start
```

`3000` が使用中の場合は `3001`, `3002`... のように空きポートへ自動で再試行します。
固定したい場合は次のように指定します。

```bash
$env:PORT=3000
npm start
```

起動後に以下へアクセスします。

- ローカル確認: `http://localhost:3000`

## 2. 議事データの編集

`data/schedules.json` に日付ごとの予定を入れてください。

```json
{
  "2026-03-06": [{ "time": "09:30", "title": "キックオフ", "owner": "司会" }]
}
```

## 3. 自分だけで使う設定手順（公開しない）

### Step 1: ローカルアプリを起動

```bash
npm start
```

`http://localhost:3000` が開けることを確認します。

### Step 2: HTTPS 公開 URL を作成

Zoom App から読み込むには `https` URL が必要です。

本番運用では次の URL を利用します。

- `https://zoomapp-lime.vercel.app/`

このプロジェクトでは次のどちらかを使います。

```bash
# 1) localtunnel（このプロジェクトに導入済み）
npx localtunnel --port 3000

# 2) ngrok（別途アカウントと authtoken が必要）
ngrok http 3000
```

ローカル検証する場合は、発行された `https://...` を控えておきます。

### Step 3: Zoom App Marketplace でアプリ作成

1. Zoom App Marketplace にログイン
2. `Build App` → `Zoom App` を選択
3. アプリ名を入力して作成

### Step 4: URL 設定

1. App URL / Home URL に `https://zoomapp-lime.vercel.app/` を設定
2. Domain Allow List に `zoomapp-lime.vercel.app` を追加（プロトコルやパスは不要）
3. 保存

### Step 5: 配布を非公開にする

1. `Distribution` で公開申請は実行しない
2. 公開トグル（Publish 公開）は有効化しない
3. テストユーザー設定がある場合は自分のZoomアカウントだけを追加

### Step 6: Zoom クライアントで起動

1. Zoom デスクトップクライアントの `Apps` を開く
2. 作成したアプリを選択
3. `本日の議事スケジュール` が表示されれば完了

## 4. トラブルシュート

- `npm start` で `EADDRINUSE` が出る: 既存の Node プロセスが `3000` を使用中です（本アプリは自動で `3001` 以降へ再試行します）
- `ngrok` で認証エラー: ngrok ダッシュボードで authtoken 設定が必要です
- `cloudflared` で接続拒否: ネットワーク制限の可能性があります。別ネットワーク（テザリング等）で再試行してください
