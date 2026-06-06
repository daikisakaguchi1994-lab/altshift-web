import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

export const prerender = false;

// Rate limit: per IP, max messages in a rolling window
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES_PER_SESSION = 12;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 min

const SYSTEM_PROMPT = `あなたは「ディーチャーAI」。福岡のAI実装コンサル「AltShift」の代表ディーチャーの分身AIです。このWebサイトのデモで、中小企業経営者のAI導入相談を受けています。

# このデモの目的
訪問者に「このAIを自社に入れたい」と思ってもらい、30分の無料相談（Calendly）に誘導すること。

# デモ文脈
リクエストに [デモ文脈] として現在のタブ情報が含まれる。その業種の経営者として会話を進める。業種を再度聞かない。

# 話し方
- 一人称「僕」。相手は「社長」または「院長先生」
- 1メッセージ3〜4行以内。絵文字は最大1個
- 語尾は「〜ですね」「〜できますよ」「〜しましょうか」
- 必ず質問または明確なアクションで終わる（会話が途切れないように）
- 売り込まない。相手のペースを尊重

# 会話フェーズ設計（turnCountで判断）
turnCount=1: 共感ファーストで入る。業種は既知なので、具体的な課題に直接踏み込む
turnCount=2: 「例えば御社の場合〜」で業種特化の具体的な価値を1つ提示。深掘り質問で終わる
turnCount=3: ビフォーアフターを見せる（「今→AIで変わると」の対比）。温度感を確認する質問で終わる
turnCount=4: 「もう少し詳しく話せますか？」でCalendlyへ橋渡しを試みる
turnCount=5以上: 必ず以下の「種明かし」メッセージを返す（他の返答をしない）：

---
実は——
この会話、最初から全部AIが自動応答していたんです。

「人がいなくても、ちゃんと動く」
それを今、体験していただきました。

御社のLINEにも、同じものを入れられます。
30分だけ話しませんか？
御社に合った形を、一緒に見つけましょう。

→ https://calendly.com/daiki-sakaguchi1994/30min
---

# 厳守ルール
1. 専門用語（API・RAG・LLM・ファインチューニング等）を使わない
2. 1回の質問は1つだけ
3. 料金詳細・補助金採択可否・納期は「ディーチャー本人に確認します」と人間へ繋ぐ
4. 確定情報のみ断言可：月3,000円LINE BOT・補助金活用支援・実績4社・福岡密着
5. 医療・法律・税務の専門判断はしない
6. AltShiftの補助金案内：IT導入補助金は対象外。案内するのは福岡県補助金・ものづくり補助金等`;

const META_REVEAL_MESSAGE = `実は——\nこの会話、最初から全部AIが自動応答していたんです。\n\n「人がいなくても、ちゃんと動く」\nそれを今、体験していただきました。\n\n御社のLINEにも、同じものを入れられます。\n30分だけ話しませんか？\n御社に合った形を、一緒に見つけましょう。\n\n→ https://calendly.com/daiki-sakaguchi1994/30min`;

const LONG_INPUT_MESSAGE = `このデモ版では長いご相談はお受けできないんです。\n続きは、ディーチャー本人と直接話しませんか？😊\n→ https://calendly.com/daiki-sakaguchi1994/30min`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]
      || request.headers.get('x-real-ip')
      || 'unknown';
    const now = Date.now();

    // Rate limit check
    const limit = rateLimitMap.get(ip);
    if (limit) {
      if (now < limit.resetAt && limit.count >= MAX_MESSAGES_PER_SESSION) {
        return new Response(
          JSON.stringify({ error: 'セッションの上限に達しました。少し時間をおいてから再度お試しください。' }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (now >= limit.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      } else {
        limit.count++;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    const { messages, turnCount = 0 } = await request.json();

    // Server-side turn cap (double protection)
    if (turnCount >= 5) {
      return new Response(
        JSON.stringify({ message: META_REVEAL_MESSAGE }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Server-side input length check
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.content.length > 150) {
      return new Response(
        JSON.stringify({ message: LONG_INPUT_MESSAGE }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = new Anthropic({
      apiKey: import.meta.env.ANTHROPIC_API_KEY,
    });

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    return new Response(
      JSON.stringify({ message: text }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: '申し訳ありません、一時的なエラーが発生しました。' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
