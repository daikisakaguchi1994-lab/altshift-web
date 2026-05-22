# Phase B/C 引き継ぎメモ

## Phase A 完了内容（fix/phase-a-critical-issues）

### 修正1: ヒーローコピー
- 確認の結果、既に正しい状態（「現場に入り、AIを動かす。」＋FDEサブコピー＋強調行）
- 変更不要だった

### 修正2: AI導入コンサル価格
- ai-consulting.astro: 月額3〜8万円 → 3段階構造（戦略診断30〜50万円/月額顧問20〜50万円/Embedded CAIO 50万円〜）
- 補助金訴求バナー追加（ものづくり・IT導入・省力化投資補助金対応）
- pricing.astro: AIコンサルティング顧問の価格同期更新
- index.astro FAQ: 料金回答を新価格体系に更新
- Layout.astro JSON-LD: priceRange更新（3万円〜50万円）
- ai-consulting.astro meta description: 旧価格削除、新価格記載
- ai-consulting.astro FAQ: 費用体系の質問を新価格に更新

### 修正3: クライアントロゴウォール
- BAR Kar's除外、TYDロジスティクス株式会社追加
- 並び順: TYDロジスティクス → 三栄リフォーム → 伸明 → BEGINS

---

## Phase Bで対応すべき残課題

### 旧価格「月額3万円〜8万円」の残存箇所
以下のファイルに旧コンサル価格が残っています：

| ファイル | 行 | 内容 | 優先度 |
|---|---|---|---|
| fukuoka-ai-consulting.astro | L10,15,21,36,82 | meta description/JSON-LD/本文に旧価格 | 高 |
| Layout.astro | L13 | デフォルトdescription「月額3万円〜」 | 中 |
| blog/ai-introduction-cost-2026.md | L26,74,76 | ブログ記事内の旧価格 | 中 |
| blog/seo-geo-ai-search-2026.md | L42 | AI Overview引用文の旧価格 | 低 |
| service.astro | L42 | meta description「月額3万円〜」 | 中 |
| pricing.astro | L61,80 | meta description | 中 |
| industry/reform.astro | L102 | 月額3万円〜（これはWeb制作の価格なのでOKか要確認） |
| industry/restaurant.astro | L102,121 | 同上 |
| roi.astro | L108 | 月額プラン表記 | 低 |

### Phase B タスクリスト（優先順）
1. タスク6: ベネフィット表現書き換え（テキスト変更のみ、独立）
2. タスク8b: ライト基調移行（global.css全面改修）
3. 旧価格残存箇所の一括修正（上記テーブル）
4. タスク1: 無限ループ導線（Nav DLボタン、フローティングCTA等）

### Phase C タスクリスト
5. タスク4: 1画面1メッセージ（余白設計）
6. タスク7: ロゴウォール画像化
7. タスク2: SEO構造化データ補完
8. タスク5: 資料DLフォーム新設
9. ダーク帯セクション削除
10. ライム色使用箇所の制限
11. 代表者写真の更新

## 次タスクの最初の一手
タスク6（ベネフィット表現書き換え）:
1. index.astro L68-69（サブコピー）、L137（About見出し）、L144（About本文）を開く
2. 翻訳調→断言調にテキスト差し替え
3. service/*.astroのdesc/サブコピーも対象
