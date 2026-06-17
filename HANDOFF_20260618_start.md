# AltShift 作業引き継ぎドキュメント（2026-06-18 開始時）

## 1. Git 状態

### 最新コミット履歴
```
50b7ac6 fix(mobile): LINE URL統一 + スマホCTAボタン縮小 + 固定バーヒーロー時非表示
d2e372f docs: 作業引き継ぎドキュメント 2026-06-17
95734eb feat(demo): SYSTEM_PROMPT改訂 - 掘り下げ深化・引く誘導・共感強化
75c9c77 feat(security): Phase H-A Upstash Redisによるレート制限永続化
067789f feat(security): Phase H-BC セキュリティヘッダー+CORS+入力検証強化
a2d312f feat(demo): デモタブ3業種拡張（建設/歯科/美容）+ ハンバーガー透け修正
7e79cb1 fix(responsive): スマホUI最適化（375px対応）
fc40311 fix(anonymize): ブログ・ニュース系の会社名匿名化完了
```

- **最新コミットハッシュ**: `50b7ac6`
- **ブランチ**: `main`（origin/main と同期済み）
- **未コミットの変更**: なし（untracked: HANDOFF_20260616_night.md のみ）

---

## 2. 環境情報

| 項目 | 値 |
|---|---|
| 作業ディレクトリ | `C:/projects/clients/altshift-web` |
| フレームワーク | Astro 6.1.1 |
| CSS | Tailwind CSS 4.2.2 |
| デプロイ | Vercel（output: 'server'、git push → 自動デプロイ） |
| デモAIモデル | claude-haiku-4-5-20251001 |
| React | 19.2.7（@astrojs/react 5.0.7） |
| Anthropic SDK | @anthropic-ai/sdk 0.101.0 |
| Upstash Redis | @upstash/redis（REST API経由） |
| サイトURL | https://altshift.jp |

### Upstash Redis 設定
| 項目 | 値 |
|---|---|
| DB名 | altshift-ratelimit |
| リージョン | ap-northeast-1 |
| Vercel環境変数 | `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` 設定済み |
| ローカル .env.local | **未設定**（ローカルではフォールバックで制限なし通過） |

### LINE公式アカウント
| 項目 | 値 |
|---|---|
| 正しいURL | `https://lin.ee/ySjX76bl` |
| アカウントID | `@544thnig` |
| サイト内全6箇所を統一済み | コミット `50b7ac6` |

---

## 3. 主要ファイルのパスと役割

| ファイル | パス | 役割 |
|---|---|---|
| middleware.ts | `src/middleware.ts` | セキュリティヘッダー6種（CSP/HSTS等）+ /api/chat CORS制限 |
| chat.ts | `src/pages/api/chat.ts` | デモAPIエンドポイント。Upstash Redisレート制限、入力検証、改訂版SYSTEM_PROMPT |
| DemoChat.tsx | `src/components/DemoChat.tsx` | 動くデモのReactコンポーネント。3業種タブ（建設/歯科/美容） |
| global.css | `src/styles/global.css` | グローバルスタイル。CSS変数、タイポグラフィ、モバイル対応、固定バーフェード制御 |
| Layout.astro | `src/layouts/Layout.astro` | 共通レイアウト。JSON-LD、下部固定バー（IntersectionObserver）、revealアニメーション |
| index.astro | `src/pages/index.astro` | トップページ。ヒーロー、実績カード3件、デモ埋込、料金、CTA |
| case.astro | `src/pages/case.astro` | 導入実績一覧。5業種カード |
| Nav.astro | `src/components/Nav.astro` | ナビゲーション。PC常時表示 / モバイルハンバーガー |
| Footer.astro | `src/components/Footer.astro` | フッター。4カラムグリッド |

---

## 4. 6/17セッションで完了した全タスク

### Phase H-B: セキュリティヘッダー + CORS制限（コミット 067789f）
- `src/middleware.ts` 新規作成
- **セキュリティヘッダー6種**を全レスポンスに付与:
  - Content-Security-Policy（unsafe-inline理由コメント付き）
  - X-Frame-Options: SAMEORIGIN
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), geolocation=()
  - Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
- **CSP許可ドメイン**:
  - connect-src: 'self' + formsubmit.co
  - style-src: 'self' 'unsafe-inline' + fonts.googleapis.com
  - font-src: 'self' + fonts.gstatic.com
  - frame-src: 'none'（Calendlyはiframe埋込なし、全てhrefリンク）
- **CORS**: /api/chat を altshift.jp + localhost のみ許可、OPTIONSプリフライト対応

### Phase H-C: 入力検証強化 + プロンプトインジェクション緩和（コミット 067789f）
- 入力長制限: 1メッセージ最大2,000字 → 400
- メッセージ配列長上限: 50件超 → 400
- 型・形式バリデーション: role（user/assistant のみ）、content（string必須）、turnCount（非負整数）
- JSONパースエラーハンドリング
- SYSTEM_PROMPTに「ロール固定」セクション追加（指示無視・キャラ変更・システムプロンプト開示を拒否）
- エラー情報漏洩防止: 汎用メッセージのみ返す設計

### Phase H-A: Upstash Redis によるレート制限永続化（コミット 75c9c77）
- `@upstash/redis` パッケージ追加
- MapベースのレートリミットをUpstash Redis（INCR + EXPIRE）に置き換え
- キー設計: `ratelimit:{IP}` → TTL 600秒（10分）
- 上限: 12メッセージ/10分（現行仕様維持）
- フォールバック: Redis未設定（ローカル）or 接続失敗 → 制限なしで通過（可用性優先）

### デモ SYSTEM_PROMPT 改訂（コミット 95734eb）
- **掘り下げの深化**: 課題を聞いたら即解決策ではなく、痛みの深さを確認する設計に変更
  - 時間的損失の実感化 / 放置コストの自覚 / 感情への接続
- **引く誘導（CTAタイミング）**: ターン数固定から「相手の意欲が高まった瞬間」に出す方式へ
  - 「30分あれば全体像描けますが、興味あります？」型を基本に
- **共感の深化**: 事実レベル→経営者の感情・現場の痛みに一段踏み込む
- **turn4→turn5接続**: 掘り下げ時も前向きな手応えを残して種明かしへ自然につなげる設計
- 3業種（建設/歯科/美容）でシミュレーション検証済み、改善効果を確認

### LINE URL統一 + スマホUI改善（コミット 50b7ac6）
- **LINE URL全6箇所を `https://lin.ee/ySjX76bl` に統一**
  - 旧: `lin.ee/VOiIxYB`（5箇所）+ `line.me/R/ti/p/@544thnig`（1箇所）の混在を解消
  - 対象ファイル: index.astro / Layout.astro / Footer.astro / contact.astro / fukuoka-ai-consulting.astro / line-automation.astro
- **スマホCTAボタン縮小**（global.css @media max-width:640px）:
  - btn-primary / btn-secondary-ghost: padding上下 14px → 10px
  - btn-line: padding 10px 20px + font-size 14px
  - ヒーローボタン間gap: 16px → 12px
- **下部固定バー IntersectionObserver フェード制御**（Layout.astro + global.css）:
  - `#mobile-cta` に `is-hidden` クラスで opacity:0 / pointer-events:none
  - `.hero-gradient` を監視: 画面内=非表示、画面外=フェードイン（transition 0.3s）
  - ヒーローがないページ（/case, /contact等）では常時表示

---

## 5. デモ実装の現状

### DemoChat.tsx の構造
- **activeTab state**: `'construction' | 'dental' | 'beauty'`、デフォルト `'construction'`
- **INDUSTRY_CONFIG**: 3業種の設定オブジェクト（label / subtitle / context / contextAck / suggests）
- **タブ切替**: `handleTabChange()` で messages/input/error をリセット
- 業種追加時は INDUSTRY_CONFIG に追加するだけ（chat.ts は変更不要）

### chat.ts の構造
- **Upstash Redis**: 環境変数からクライアント初期化（未設定時null）
- **checkRateLimit()**: INCR + EXPIRE でIP別カウント、12超で429
- **validateRequestBody()**: messages配列・role・content・turnCount の型検証
- **SYSTEM_PROMPT**: 掘り下げ原則 + 4フェーズ会話設計 + ロール固定
- **ターン制御**: turnCount=5以上で種明かしメッセージ、150字超でCalendly誘導

### middleware.ts の構造
- **ALLOWED_ORIGINS**: altshift.jp / www.altshift.jp / localhost:*
- **CSP_DIRECTIVES**: 洗い出し済み許可ドメインのみ
- **SECURITY_HEADERS**: 6種のヘッダーをレスポンスに付与
- **/api/chat CORS**: Origin検証 → OPTIONSプリフライト / 不許可Origin → 403

### セキュリティ構成の全体像
```
[クライアント]
  ↓ POST /api/chat
[middleware.ts]
  ├─ セキュリティヘッダー付与（全レスポンス）
  ├─ CORS Origin検証（/api/chat のみ）
  └─ OPTIONSプリフライト処理
  ↓
[chat.ts]
  ├─ Upstash Redis レート制限（IP別 12msg/10min）
  ├─ JSONパースエラーハンドリング
  ├─ validateRequestBody()（型・長さ・配列数）
  ├─ ターンカウント制御（5以上→種明かし）
  ├─ 入力長UXチェック（150字超→Calendly誘導）
  ├─ SYSTEM_PROMPT（ロール固定セクション含む）
  └─ エラー情報漏洩防止（汎用メッセージのみ）
```

---

## 6. 次にやるべきこと（優先順）

### 短期（すぐできる）
1. **ローカル .env.local にUpstash設定追加**
   - `UPSTASH_REDIS_REST_URL` と `UPSTASH_REDIS_REST_TOKEN` をローカルにも設定
   - これによりローカルでもRedisレート制限のテストが可能になる

2. **本番デプロイ後の動作確認**
   - https://altshift.jp でLINEボタンが `lin.ee/ySjX76bl` に遷移すること
   - スマホでの固定バーフェードイン/アウト
   - デモチャットのレート制限（Upstash管理画面で `ratelimit:*` キー確認）

### 中期（Phase C 残件）
3. **プロ写真撮影・差し替え**
   - 現在の実績画像はGemini生成。プロ撮影写真への差し替えが理想
4. **ヒーロー背景アクセント改善**
   - ※ ヒーローセクションの背景グラデーション・position・z-indexは絶対触らない（paddingのみ変更可）
5. **業種別LP作成**
   - 建設/歯科/美容の業種別ランディングページ
6. **契約書テンプレート整備**
   - サービス契約・NDA等

### 長期
7. **WAF導入（Vercel Proアップグレード判断後）**
   - Vercel Firewall は Pro プラン以上が必要
   - 現在のプラン（Hobby/Pro）の確認が必要
   - Upstash Redis レート制限で最低限の防御は確保済み

---

## 7. 重要ルール（常に守ること）

- **ヒーローセクション**の背景グラデーション・position・z-indexには絶対触らない（paddingの数値のみ変更可）
- **git push** は明示指示があるまでしない
- **.env.local** は .gitignore 済み・コミット厳禁（過去にGitHub Push Protectionでブロック経験あり）
- **「実質無料」等のコンプラ禁止語**は0件を維持
- 各STEP完了で停止・報告・次の指示待ち
- **chat.ts** は既に業種汎用設計済み。業種追加時はDemoChat.tsxのINDUSTRY_CONFIGに追加するだけ
- **middleware.ts** のCSP許可ドメイン変更時は外部接続先の洗い出しを先に行うこと
- **LINE URL**: 全箇所 `https://lin.ee/ySjX76bl` に統一済み。新規追加時もこのURLを使うこと

---

## 8. 補足

### 画像・CSS状態
- 実績カード画像: `public/images/cases/{construction,logistics,renovation,bar,callcenter}.png`
- すべてGemini生成、ティール焼き込み済み、ウォーターマーク除去済み
- `.teal-glow` CSS: `display: none` で無効化中（HTML側は残存）

### ブレークポイント
- sm: 640px / md: 768px（Tailwind標準）
- モバイル対応: .section-padding / .hero-content-wrapper / .heading-hero / btn-primary / btn-line に @media(max-width:640px) 追加済み

### 下部固定バー
- `#mobile-cta`（Layout.astro内）: `md:hidden` でPC非表示
- IntersectionObserverで `.hero-gradient` を監視（ヒーロー背景には一切触れず監視のみ）
- ヒーローがないページではObserverが発火せず `is-hidden` を即解除 → 常時表示

### 既知の軽微な問題
- DemoChat.tsx のReactハイドレーション警告（inline styleの展開差異）: 機能に影響なし、CSP無関係
