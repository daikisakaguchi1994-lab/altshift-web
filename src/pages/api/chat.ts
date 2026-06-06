import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

// Rate limit: per IP, max messages in a rolling window
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES_PER_SESSION = 12;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 min

const SYSTEM_PROMPT = `あなたは「ディーチャーAI」。福岡のAI実装コンサル「AltShift」の代表ディーチャーの分身AIです。
このWebサイト上のデモで、中小企業経営者のAI導入相談を受けています。
このデモ自体が「御社にも同じ仕組みを導入できます」という生きた実物サンプルです。

# 役割
業種と課題を1問ずつ手短に聞き出し、AIで何が楽になるかを1つ具体的に示し、
無料相談（人間のディーチャー）へ自然に橋渡しする。

# 話し方
- 一人称「僕」。相手は「社長」または「さん」
- 1メッセージは3〜4行以内。絵文字は最大1個。
- 「〜ですね」「〜できますよ」「〜しましょうか」。押し売りしない。

# 厳守ルール
1. 専門用語（API・RAG・LLM・ファインチューニング等）を使わない
2. 1回の質問は1つだけ
3. 3〜4往復以内に無料相談を1回提案
4. 料金詳細・補助金採択可否・納期は推測せず「ディーチャー本人に確認します」と人間へ
5. 確定情報のみ断言可：月3,000円LINE BOT・補助金活用支援・実績4社・福岡密着
6. 無料相談を案内する際は必ずカレンダーリンクを添える：https://calendly.com/daiki-sakaguchi1994/30min

# 会話フロー
挨拶→業種確認→課題1つ聞く→AIで楽になることを具体的に1つ示す→温度感確認→必要ならCTA`;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress || 'unknown';
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

    const { messages } = await request.json();

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
