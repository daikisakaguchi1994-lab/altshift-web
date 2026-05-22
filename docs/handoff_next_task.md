# AltShift サイト改善 引き継ぎメモ

## 完了タスク：タスク3 サービス名リネーム

### ブランチ
`refactor/service-rename`（`feat/hero-renewal-and-funnel` から分岐）

### 変更内容
サービス表示名を「手段名」→「目的ベネフィット名」にリネーム。URLパスは変更なし。

| # | 旧表示名 | 新表示名 | URL（変更なし） |
|---|---|---|---|
| 01 | AI導入戦略 | AI導入コンサルティング | /service/ai-consulting |
| 02 | カスタムAIソリューション | カスタムAIシステム開発 | /service/ai-development |
| 03 | Web制作 × SEO/GEO | AI時代の集客基盤構築 | /service/web-seo |
| 04 | LINE自動化 × 業務効率化 | 顧客接点の自動化 | /service/line-automation |

### バグ修正
- index.astro L211: `href: '/service/ai-automation'` → `/service/ai-development`（02番のリンク先が間違っていた）
- Footer.astro: 全サービスリンクが `/service` 一律 → 各個別ページへのリンクに修正

### 変更ファイル（6ファイル）
1. `src/pages/index.astro` — サービスカード4枚のtitle + 02のhref修正
2. `src/components/Footer.astro` — サービスリスト名称 + 個別href化
3. `src/pages/service.astro` — サービス一覧ページのtitle4箇所
4. `src/pages/fukuoka-ai-consulting.astro` — 福岡LPのサービスカード4枚
5. `src/pages/pricing.astro` — 料金ページのプラン名2箇所
6. `src/layouts/Layout.astro` — JSON-LD構造化データのサービス名2箇所

### 未変更（意図的にスコープ外）
- 各サービスページ自体のh1/title（web-seo.astro, line-automation.astro等）
- meta descriptionに含まれるサービス名の自然言語表現
- company.astro のタグクラウド内「AI導入戦略」（タグとしての用語であり表示名ではない）

---

## 残タスク（実行順）

| 順 | タスク | 概要 | 依存 |
|---|---|---|---|
| 1 | **タスク6: ベネフィット表現書き換え** | 翻訳調コピーを断言調に。テキスト変更のみ | なし（即時着手可） |
| 2 | タスク8b: ライト基調移行 | global.css全面改修、orb撤廃、幾何学図形化 | なし |
| 3 | タスク1: 無限ループ導線 | Nav DLボタン、フローティングCTA、パンくず等 | 8b |
| 4 | タスク4: 1画面1メッセージ | 余白拡大、セクション再構成 | 8b |
| 5 | タスク7: ロゴウォール改善 | グリッドセル化、img差し替え準備 | 8b |
| 6 | タスク2: SEO構造化データ | BreadcrumbList、SiteNavigationElement | 1（パンくず） |
| 7 | タスク5: 資料DLフォーム | フォーム新設、フリメ拒否バリデーション | 1（Nav DLボタン） |

## 次タスク（タスク6）の最初の一手

1. `src/pages/index.astro` を開く
2. L68-69（ヒーローサブコピー）、L137（About見出し）、L144（About本文）を確認
3. 前回セッションの書き換えテーブルに従いテキスト差し替え
4. 対象：index.astro + service/*.astro のdesc/サブコピー
5. ヒーローメインコピー「現場に入り、AIを動かす。」は維持
