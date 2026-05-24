---
version: 0.2.0
name: AltShift Corporate
description: >
  福岡拠点の中小企業向けAI導入支援ブランド「AltShift」のデザインシステム。
  信頼性と先進性を両立させた、プロフェッショナルかつ親しみやすいビジュアルアイデンティティ。
colors:
  primary: "#1B5EBE"
  primary-light: "#4A90D9"
  secondary: "#C8A15A"
  secondary-light: "#E8C97A"
  accent-neon: "#D8FF00"  # アクセント色：使用率10%以下、小要素のみ
  neutral-bg: "#FFFFFF"
  neutral-bg-sub: "#F4F4F4"
  neutral-ink: "#1A1A1A"
  neutral-ink-muted: "#6B6B6B"
  neutral-border: "#E5E5E5"
  line-green: "#06C755"
  error: "#DC2626"
  dark-bg: "#0F1117"
  dark-bg-sub: "#1A1D27"
  dark-ink: "#F0F4FF"
  dark-ink-muted: "#8A92B0"
  dark-border: "#252836"
typography:
  display-hero:
    fontFamily: Inter, Noto Sans JP, sans-serif
    fontSize: clamp(36px, 5vw, 64px)
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter, Noto Sans JP, sans-serif
    fontSize: clamp(28px, 4vw, 40px)
    fontWeight: 800
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Inter, Noto Sans JP, sans-serif
    fontSize: 22px
    fontWeight: 800
    letterSpacing: -0.03em
  headline-sm:
    fontFamily: Inter, Noto Sans JP, sans-serif
    fontSize: 17px
    fontWeight: 700
    letterSpacing: -0.03em
  body-md:
    fontFamily: Noto Sans JP, Inter, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.8
  body-sm:
    fontFamily: Noto Sans JP, Inter, sans-serif
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.9
  label-section:
    fontFamily: Inter, sans-serif
    fontSize: 13px
    fontWeight: 700
    letterSpacing: 0.15em
  label-tag:
    fontFamily: Inter, Noto Sans JP, sans-serif
    fontSize: 12px
    fontWeight: 500
    letterSpacing: 0.02em
  nav-link:
    fontFamily: Inter, Noto Sans JP, sans-serif
    fontSize: 14px
    fontWeight: 500
    letterSpacing: 0.01em
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  section-y: 96px
  container-max: 1152px
components:
  button-cta-line:
    backgroundColor: "{colors.line-green}"
    textColor: "#FFFFFF"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 14px 28px
  button-cta-line-hover:
    backgroundColor: "{colors.line-green}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 10px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-light}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.md}"
    padding: 14px 28px
  button-outline-hover:
    textColor: "{colors.primary}"
  card-standard:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  card-accent:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  tag-primary:
    backgroundColor: rgba(27, 94, 190, 0.06)
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 5px 12px
  icon-box:
    backgroundColor: rgba(27, 94, 190, 0.08)
    rounded: "{rounded.lg}"
    size: 48px
  input-field:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.lg}"
    padding: 12px 16px
---

# AltShift Design System

## Overview

AltShiftは「福岡の中小企業に、AIという選択肢を。」をミッションに掲げるAI導入支援ブランド。デザインは**信頼性（Trustworthy）と先進性（Forward-looking）**の両立を目指す。

ターゲットはITに不慣れなブルーカラー中小企業の経営者。派手さや過度なテック感は避け、「この会社なら安心して任せられる」と感じさせるクリーンで堅実なビジュアルを基調とする。一方で、ブランドカラーのブルーグラデーションとゴールドのアクセントにより、AI時代の先進性と高い専門性を表現する。

全体のトーンは**「高品質な新聞社のデジタル版」** — 情報が整理され、余白が効き、視線誘導が明確。感情的にはプロフェッショナルでありながら、親しみやすさを失わない温度感。

## Colors

カラーシステムはライトモード/ダークモードのデュアルテーマ対応。CSS変数 `--color-*` を通じてテーマ切替を実現する。

- **Primary (#1B5EBE):** ブランドの核。CTAボタン・リンク・アクセントに使用。信頼・誠実を象徴するロイヤルブルー。グラデーション `#1B5EBE → #4A90D9` でセクションラベルやロゴに奥行きを出す。
- **Secondary / Gold (#C8A15A):** プレミアム感を演出するアクセントゴールド。装飾ライン・テキストリンクの下線・ロゴの下部バーに限定使用。グラデーション `#C8A15A → #E8C97A` で繊細な光沢を表現。
- **Neutral Ink (#1A1A1A):** 本文テキストの基本色。深い墨色で最高の可読性。
- **Neutral Ink Muted (#6B6B6B):** サブテキスト・メタ情報・キャプションに使用。
- **Neutral BG (#FFFFFF):** メイン背景。清潔感と広がりを確保。
- **Neutral BG Sub (#F4F4F4):** セクション交互背景。微妙なコントラストでリズムを生む。
- **LINE Green (#06C755):** LINE公式カラー。CTA専用。他の用途には使用しない。
- **Hero Gradient:** テキストに `linear-gradient(135deg, #1B5EBE 0%, #4A90D9 60%, #C8A15A 100%)` を適用し、ブルーからゴールドへの流れでブランドの進化を象徴する。

### Accent Neon

- **Accent Neon (#D8FF00):** 戦略的アクセントカラー。ライムイエロー系。「先進性」「テック感」を表現する小要素に限定使用。
  - 使用率：全UI要素の **10%以下**（目視＋計測で担保）
  - 使用箇所：CTA下線、強調記号、矢印アイコン、小バッジ、注釈マーカー等の **小要素のみ**
  - 禁止：背景色全面、ボタン背景全面、見出し全体、大きな塊での使用
  - 役割分担：信頼性=Primary/Secondary、先進性=Accent Neon

### Dark Mode

`[data-theme="dark"]` でCSS変数を上書き。背景はディープネイビー (#0F1117)、テキストはクールホワイト (#F0F4FF)。Primary はやや明るめの #4A90D9 に変わり、視認性を維持する。

## Typography

書体戦略は**Inter（見出し・英字） + Noto Sans JP（本文・日本語）**のデュアルフォント構成。

- **見出し (h1-h3):** Inter優先。font-weight: 800-900、letter-spacing: -0.03em のタイトな字間で力強い印象。clampによるレスポンシブサイジングで画面幅に追従。
- **本文 (body):** Noto Sans JP優先。font-weight: 300-400 の軽やかなウェイトで長文の可読性を確保。line-height: 1.8-1.9 のゆったりした行間。
- **セクションラベル:** Inter 700 / 13px / letter-spacing: 0.15em / uppercase。`background-clip: text` でブルーグラデーションを適用し、セクションの導入を華やかに演出する。
- **装飾テキスト:** 各セクションの背景に配置される英字大文字（SERVICE, CASE等）。Inter 900 / clamp(60px,10vw,120px) / opacity: 0.04 でゴーストレタリング効果。

## Layout

レイアウトは**固定最大幅 + Fluid Grid**モデル。

- **最大幅:** 1152px (`max-w-6xl`)。左右 padding: 24px で小画面に対応。
- **グリッド:** CSS Grid を多用。メインコンテンツは `grid-cols-1 md:grid-cols-2` または `md:grid-cols-3`。gap は 16px〜24px。
- **セクション間隔:** 上下 padding: 96px で各セクションに十分な呼吸空間。
- **8px ベースグリッド:** すべてのスペーシングは 8px の倍数（4px は微調整用）。
- **Hero:** `min-height: 100vh` のフルスクリーン。左寄せテキスト + 右側に福岡の都市写真。左→右のグラデーションオーバーレイでテキスト可読性を確保。

## Elevation & Depth

フラットデザインを基調とし、深度は**ボーダーと背景色の切替**で表現する。影は控えめ。

- **カード:** `border: 1px solid var(--color-border)` が標準。ホバーで `shadow-md` を追加して軽い浮遊感。
- **アクセントカード:** `border-top: 3px solid var(--color-primary)` で上辺にブルーラインを入れ、重要度を示す。
- **ナビゲーション:** `sticky top-0` + スクロール時に `shadow-sm` を動的追加。
- **モーダル/オーバーレイ:** Hero 背景画像に対して `rgba()` グラデーションで多層レイヤー。

## Shapes

形状言語は**控えめなラウンド（4px〜12px）**。柔らかすぎず、硬すぎないバランス。

- **ボタン:** `border-radius: 6px` — モダンだがカジュアルすぎない。
- **カード:** `border-radius: 8px` — 読みやすさと親しみやすさの両立。
- **ケースカード（画像付き）:** `border-radius: 12px` — 画像を含む大きな要素にはやや大きめの角丸で柔和な印象。
- **アイコンボックス:** `border-radius: 8px` の正方形コンテナ。
- **バッジ/タグ:** `border-radius: 4px-6px` のコンパクトな角丸。

## Components

### Buttons

**LINE CTA（最重要）:** `background: #06C755` / 白テキスト / LINEアイコン付き。ヒーロー・最終CTA・モバイル固定バーの3箇所に配置。hover で opacity: 0.85。

**Primary:** `background: var(--color-primary)` / 白テキスト。サービス詳細リンク等に使用。

**Outline:** 透明背景 + `border: 1.5px solid var(--color-ink)`。hover で border と text が primary カラーに変化。セカンダリアクションに使用。

**Ghost（ダウンロード等）:** `border: 1.5px solid var(--color-primary)` / primary テキスト。hover で `bg-blue-50`。

### Cards

**標準カード:** 白背景 + 1px ボーダー + 8px 角丸。padding: 28px-32px。hover で shadow-md。

**アクセントカード:** 上辺に 3px の primary ボーダーを追加。課題提起セクションで使用。

**ケースカード:** 12px 角丸 + 画像（aspect-ratio: 16/9）+ テキストエリア。画像は hover で scale(1.04) のズーム効果。

### Tags / Badges

`border: 1px solid` + `background: rgba(27,94,190,0.06)` + primary テキスト。font-size: 11-12px。サービスタグ・技術タグに使用。

### Section Labels

`text-transform: uppercase` + Inter 700 + ブルーグラデーション `background-clip: text`。各セクション冒頭に配置し、英語キーワードで視覚的なリズムを作る。

### Navigation

sticky ヘッダー。h-16。左ロゴ + 中央ナビ + 右CTA群。モバイルはハンバーガーメニュー展開。

### FAQ Accordion

ボーダーカード内にボタン + 非表示回答。クリックで展開、chevron アイコンが 180deg 回転。排他制御（1つ開くと他が閉じる）。

## Do's and Don'ts

- Do: LINE Green は LINE CTA ボタンのみに使用する
- Do: セクション間は必ず 96px の余白を確保する
- Do: 見出しは Inter 優先、本文は Noto Sans JP 優先にする
- Do: ゴールド (#C8A15A) は装飾ラインとグラデーションのアクセントに限定する
- Do: WCAG AA コントラスト比（4.5:1以上）を維持する
- Don't: ゴールドを背景色やボタン背景に使用しない
- Don't: 影を多用しない（hover 時の shadow-md のみ許可）
- Don't: font-weight: 800-900 を本文テキストに使用しない
- Don't: ブランドグラデーション以外のグラデーションを UI 要素に適用しない
- Don't: opacity による色の薄め以外でグレー系の中間色を増やさない
- Do: アクセント・ネオン（ライムイエロー）は「先進性」を表す戦略的アクセントとしてのみ使用。使用率10%以下、原則として小要素（バッジ、矢印、下線、強調記号、注釈マーカー）に限定する
- Don't: アクセント・ネオンを背景全面・ボタン背景・大セクションに使用しない
- Don't: アクセント・ネオンを Primary や Secondary より目立たせない（補助役を厳守）
