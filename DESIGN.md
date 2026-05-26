---
version: 0.3.0
name: AltShift Corporate
description: >
  福岡拠点の中小企業向けAI導入支援ブランド「AltShift」のデザインシステム。
  信頼性と先進性を両立させた、ライトファーストのプロフェッショナルデザイン。
---

# AltShift Design System v0.3.0

## Overview

AltShiftは「福岡の中小企業に、AIという選択肢を。」をミッションに掲げるAI導入支援ブランド。デザインは**信頼性（Trustworthy）と先進性（Forward-looking）**の両立を目指す。

ターゲットはITに不慣れなブルーカラー中小企業の経営者。派手さや過度なテック感は避け、「この会社なら安心して任せられる」と感じさせるクリーンで堅実なビジュアルを基調とする。

全体のトーンは**「高品質な新聞社のデジタル版」** — 情報が整理され、余白が効き、視線誘導が明確。

---

## Color Usage Rules（60-30-10則）

Kelley Gordon (NN/g) の配色原則に準拠。

| 色 | 配分 | 用途 |
|---|---|---|
| Primary #1B5EBE | 60% | 主要素、CTAメイン、リンク、見出し下線、ナビCTA |
| Neutral / White | 30% | 背景、カード、余白 |
| Secondary #C8A15A | 10% | 補助金関連バナー、Layer 3表示、プレミアム装飾 |
| Accent Lime #D8FF00 | **5%以下** | 最重要バナーの装飾、マイクロインタラクション。**CTAボタンには使用しない** |

## Color Tokens（CSS変数）

```css
@theme {
  --color-primary: #1B5EBE;
  --color-primary-dark: #164C99;
  --color-primary-light: #E8F0FB;
  --color-secondary: #C8A15A;
  --color-secondary-light: #FAF5E8;
  --color-accent: #D8FF00;     /* 5%以下、最重要バナー装飾のみ。CTAボタン禁止 */
  --color-blue: #1456FB;
  --color-ink: #1A1A1A;
  --color-ink-sub: rgba(26,26,26,0.6);
  --color-ink-dim: rgba(26,26,26,0.3);
  --color-ink-muted: #6B6B6B;
  --color-muted: #6B6B6B;
  --color-border: #E5E5E5;
  --color-line: #E5E5E5;
  --color-border-card: rgba(26,26,26,0.08);
  --color-bg: #FFFFFF;
  --color-bg-soft: #F7F8FA;
  --color-bg-card: #FFFFFF;
  --color-bg-elevated: #F4F4F4;
  --color-bg-cream: #EEE8DF;
  --color-footer-bg: #0F1117;
}
```

### 色の役割分担
- **Primary (#1B5EBE):** ブランドの核。CTA・リンク・セクションラベル。信頼・誠実を象徴するロイヤルブルー。
- **Secondary (#C8A15A):** プレミアム感。補助金セクションのLayer 3（行政書士）、装飾ライン限定使用。
- **Accent Lime (#D8FF00):** btn-accent-lime（補助金最重要バナー限定）とFooterロゴの2箇所のみ。
- **LINE Green (#06C755):** LINE CTA専用。他の用途には使用しない。

---

## Type Scale

| 要素 | サイズ | ウェイト | 行間 | 字間 | CSSクラス |
|---|---|---|---|---|---|
| h1 | clamp(2.5rem, 5vw, 4rem) | 800 | 1.1 | -0.02em | `.heading-hero` |
| h2 | clamp(1.875rem, 3.5vw, 2.5rem) | 700 | 1.2 | -0.015em | `.heading-lg` |
| h3 (large) | 22px | 600 | 1.3 | -0.02em | `.heading-md` |
| h3 (small) | 17px | 600 | 1.3 | normal | `.heading-sm` |
| body-lg | 18px | 400 | 1.8 | normal | `.body-lg` |
| body-md | 16px | 400 | 1.8 | normal | `.body-md` |
| body-sm | 14px | 300 | 1.9 | normal | `.body-sm` |
| eyebrow | 14px | 600 | normal | 0.1em uppercase | `.section-label` |
| caption | 13px | 400 | normal | normal | — |

### フォント構成
- **見出し (h1-h3):** Inter優先、Noto Sans JPフォールバック
- **本文:** Inter + Noto Sans JP

### 日本語専用ルール
- letter-spacing: 0.02em（漢字・かな混在時）
- line-height: 1.75〜1.9（本文）

### ウェイト使い分け
- **800/900:** ヒーローH1、巨大数字（`.number-value`）、ロゴのみ
- **700:** H2、CTAボタン、ナビリンクのアクティブ状態
- **600:** H3、ナビゲーション、eyebrow
- **400:** 本文、説明文
- **300:** body-sm（補足テキスト）
- **「極太一辺倒」を避ける** — Linear Inter Display の軽量感を参考

### 数字専用
```css
.stat-number {
  font-variant-numeric: tabular-nums;
  font-weight: 800;
}
```

---

## Buttons

| クラス | 背景 | テキスト | ボーダー | パディング | 用途 |
|---|---|---|---|---|---|
| `btn-primary` | #1B5EBE | white | none | 14px 28px | メインCTA（無料相談、お問い合わせ、送信） |
| `btn-primary-sm` | #1B5EBE | white | none | 8px 20px | ナビ内CTA |
| `btn-secondary-ghost` | transparent | #1B5EBE | 2px #1B5EBE | 12px 26px | サブCTA（導入事例を見る、詳細資料請求等） |
| `btn-accent-lime` | #D8FF00 | #1A1A1A | none | 12px 24px | **補助金最重要バナー限定**。汎用CTA禁止 |
| `btn-outline` | transparent | #1A1A1A | 1px border | 14px 28px | pricing等の非popular選択肢 |
| `btn-line` | #06C755 | white | none | 14px 28px | LINE CTA専用 |

### ホバー動作
- `btn-primary` / `btn-primary-sm`: background → `--color-primary-dark` (#164C99)
- `btn-secondary-ghost`: background → primary、text → white（反転）
- `btn-accent-lime`: brightness(0.95)
- `btn-outline`: border-color → primary、text → primary

### CTA主従ルール（根拠：Unbounce 18,639LP分析）
- 1画面に**主CTAは1つ**（btn-primary）
- 副アクションは `btn-secondary-ghost`（ゴースト）で視覚的に一段下げる
- **同一ウェイトのCTAを2つ並べない**

---

## Navigation Rules

### PC（≥768px）
- **グローバルナビ常時可視**。ハンバーガー禁止
- 根拠：NN/g 179名定量UT「Discoverability is cut almost in half by hiding navigation」
- ベンチマーク：Stripe・Linear・Notion・ABEJA・ELYZA・PKSHA

### Mobile（<768px）
- ハンバーガー可。アイコンは**標準サイズ（24×24px）**
- 巨大円（旧 menu-btn-neon）は廃止済

### メニュー構成
```
サービス / 補助金活用（/#subsidies） / 導入実績 / 代表・会社情報 / ナレッジ / [無料相談]
```
- 「料金」はメニューから削除（URLは保持、フッターからアクセス可能）
- 「無料相談」は `btn-primary-sm` で右端に配置

---

## Subsidy Section Rules（改正行政書士法対応）

### 三層モデル可視化
- **Layer 1（情報提供）:** Primary色。AltShiftが担当
- **Layer 2（適合診断）:** Primary色。AltShiftが担当
- **Layer 3（申請実務）:** **Secondary色**。提携行政書士が担当

### 表現ルール
- **全廃:** 「申請代行」「申請サポート無料」「申請を伴走」
- **必須免責文:**
  > AltShift は申請書類の作成・代理提出を行いません。申請実務は提携行政書士が担当します（改正行政書士法第19条遵守）
- 採択率を表示する場合は「事務局公表値・採択保証なし」と併記
- DX推進センター連携は「準備中」の表現（「連携済」「登録済」は虚偽になるため禁止）

### 福岡県補助金の強調
- テーブル最上段 + 背景色ハイライト + 「★最優先」「福岡限定」バッジ
- 独立ハイライトカード（primary-light背景 + primary枠）

---

## Imagery

### 代表者顔写真
- 現在: `/images/daiki_profile.jpg`（大学卒業写真を暫定使用）
- 将来: プロ撮影、自然光、ジャケット着用、軽い笑顔、1500×1500px以上
- ヒーロー右側（64×64 rounded-full）と会社情報ページで使用

### クライアントロゴ
- **フルカラー表示**（グレースケール化禁止）
- 白背景カード上、min-height 120px
- 根拠：「グレースケール化はB2C SaaSの慣習。福岡の中小企業ターゲットには具体感が重要」
- ロゴ画像なし時はテキスト表示（color:#595959、コントラスト比5.91:1）
- 「※ロゴ掲載は各社の許諾を得ています」注記を必ず付記

### 写真フィルター
- 彩度-10%、コントラスト+5% で「新聞社のデジタル版」トーン統一

### AI生成画像
- **使用禁止**。すべて実写または許諾済み素材を使用

---

## Do's and Don'ts

### Do's
- LINE Green は LINE CTA ボタンのみに使用する
- セクション間は 96px の余白を確保する
- 見出しは Inter 優先、本文は Noto Sans JP 優先
- WCAG AA コントラスト比（4.5:1以上）を全テキストで維持する
- 1画面に主CTAは1つ（btn-primary）、副はゴーストで一段下げる
- 数字には tabular-nums を適用する
- 補助金セクションには必ず三層モデルと免責文を表示する

### Don'ts
- **CTAに btn-accent-lime を汎用使用しない**（補助金最重要バナー限定）
- **PCグローバルナビにハンバーガーを使用しない**（≥768pxは常時可視）
- **「申請代行」「申請サポート無料」表現を使用しない**（行政書士法違反）
- **「DX推進センター連携済」「登録済」と書かない**（準備中のため虚偽）
- ゴールドを背景色やボタン背景に使用しない
- 影を多用しない（hover 時の shadow-md のみ許可）
- font-weight 800-900 を h2/h3/本文に使用しない（h1・巨大数字・ロゴのみ）
- 「!」を多用しない（B2Bの信頼性に反する。「。」または削除）
- ブランドグラデーション以外のグラデーションを UI 要素に適用しない
- アクセント・ネオンを Primary や Secondary より目立たせない

---

## Layout

- **最大幅:** 1280px（ヒーロー）/ 1152px（コンテンツ）/ 1024px（補助金セクション）
- **グリッド:** CSS Grid。ヒーローは12col（左7+右5）、サービスは4col
- **セクション間隔:** padding: 96px（section-padding）/ 60px（section-padding-sm）
- **8px ベースグリッド:** すべてのスペーシングは 8px の倍数
- **Hero:** min-height: 100vh。左7col（コピー+CTA）+ 右5col（代表者カード+数字グリッド）
- **Footer:** ダーク維持（#0F1117）。ロゴの `.ai` は #D8FF00（唯一の意図的ライム使用箇所）

---

## Changelog

### v0.3.0 (2026-05-26) — Phase B リサーチ反映
- 60-30-10則の導入（Kelley Gordon, NN/g）
- Type Scale 階層化（h1=800/h2=700/h3=600）
- ボタン体系の再設計（btn-primary/secondary-ghost/accent-lime）
- btn-neon 完全廃止（ライム使用率5%以下達成）
- PCグローバルナビ常時可視化（NN/g 179名UT根拠）
- 補助金活用セクション新設（/#subsidies、三層モデル）
- ヒーロー右側に代表者カード+数字グリッド追加
- クライアントセクションのカード型レイアウト化
- 問い合わせフォームにご相談内容セレクト追加
- Subsidy Section Rules（改正行政書士法対応）追記
- Imagery Rules（AI生成画像禁止、グレースケール禁止）追記

### v0.2.0 (2026-05-23) — Phase A
- ライトファースト配色システム導入
- Primary #1B5EBE / Secondary #C8A15A 確定
- テーマトグル廃止

### v0.1.0 (2026-05-22) — Initial
- ダークテーマベースの初期デザイン
