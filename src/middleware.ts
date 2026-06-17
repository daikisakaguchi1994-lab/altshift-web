import { defineMiddleware } from 'astro:middleware';

// --- CORS設定 ---
const ALLOWED_ORIGINS = [
  'https://altshift.jp',
  'https://www.altshift.jp',
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // localhost開発用（任意ポート）
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
  return false;
}

// --- CSPポリシー ---
// unsafe-inline理由:
//   script-src: Astro 6のReactハイドレーション（client:visible等）がインラインスクリプトを生成
//   style-src: Astroスコープドスタイル + Tailwind CSS
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://formsubmit.co",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formsubmit.co",
].join('; ');

// --- セキュリティヘッダー ---
const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': CSP_DIRECTIVES,
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
  const isApiChat = url.pathname === '/api/chat';

  // --- /api/chat CORS処理 ---
  if (isApiChat) {
    const origin = request.headers.get('origin');

    // OPTIONSプリフライト
    if (request.method === 'OPTIONS') {
      if (!isAllowedOrigin(origin)) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin!,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // POST等: Origin検証（same-originリクエストはoriginヘッダーが無い場合がある）
    if (origin && !isAllowedOrigin(origin)) {
      return new Response(
        JSON.stringify({ error: 'アクセスが許可されていません。' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } },
      );
    }
  }

  // --- 通常のリクエスト処理 ---
  const response = await next();

  // セキュリティヘッダーを全レスポンスに付与
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // /api/chat のCORSレスポンスヘッダー
  if (isApiChat) {
    const origin = request.headers.get('origin');
    if (origin && isAllowedOrigin(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
  }

  return response;
});
