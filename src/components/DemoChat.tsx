import { useState, useRef, useEffect } from 'react';
import { Bot, Smartphone, Sparkles, Table2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function renderMarkdown(text: string) {
  // Split by **bold** markers, alternating between normal and bold
  const parts = text.split(/\*\*(.+?)\*\*/g);
  const elements: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    // Even indices are normal text, odd indices are bold content
    const textContent = i % 2 === 1 ? <strong key={i}>{part}</strong> : part;
    if (typeof textContent === 'string') {
      // Split by newlines and insert <br/>
      const lines = textContent.split('\n');
      lines.forEach((line, j) => {
        if (j > 0) elements.push(<br key={`${i}-br-${j}`} />);
        if (line) elements.push(<span key={`${i}-${j}`}>{line}</span>);
      });
    } else {
      elements.push(textContent);
    }
  });
  return elements;
}

const SUGGESTS = [
  '予約の問い合わせを自動応答したい',
  'キャンセル連絡の対応を楽にしたい',
  'LINE問い合わせを24時間対応したい',
];

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const userTurnCount = messages.filter(m => m.role === 'user').length;
  const demoEnded = userTurnCount >= 6;

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading || demoEnded) return;

    setError('');
    const userMsg: Message = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const newTurnCount = newMessages.filter(m => m.role === 'user').length;

    // Prepend tab context so the AI knows the industry
    const contextMessages: Message[] = [
      {
        role: 'user' as const,
        content: '[デモ文脈] 現在のタブ: 美容クリニック向けデモ。相手は美容室・美容クリニックの経営者または院長。業種は既知なので再度聞かない。'
      },
      {
        role: 'assistant' as const,
        content: '承知しました。美容クリニックの院長先生とのご相談として進めます。'
      },
      ...newMessages
    ];

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: contextMessages, turnCount: newTurnCount }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'エラーが発生しました。');
        return;
      }

      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch {
      setError('通信エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const started = messages.length > 0;

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid var(--color-border, #E5E7EB)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--color-brand, #1B5EBE)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Bot size={20} color="var(--color-accent, #0E9E96)" />
        </div>
        <div>
          <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '14px', margin: 0, lineHeight: 1.3 }}>
            ディーチャーAI
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', margin: 0 }}>
            美容クリニック向けデモ
          </p>
        </div>
      </div>

      {/* Tab */}
      <div style={{
        borderBottom: '1px solid var(--color-border, #E5E7EB)',
        padding: '0 20px',
        display: 'flex',
      }}>
        <button
          type="button"
          style={{
            padding: '10px 16px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-brand, #1B5EBE)',
            borderBottom: '2px solid var(--color-brand, #1B5EBE)',
            background: 'none',
            border: 'none',
            borderBottomStyle: 'solid',
            borderBottomWidth: '2px',
            borderBottomColor: 'var(--color-brand, #1B5EBE)',
            cursor: 'default',
          }}
        >
          美容クリニック
        </button>
      </div>

      {/* Chat area */}
      <div
        ref={chatRef}
        style={{
          minHeight: '280px',
          maxHeight: '360px',
          overflowY: 'auto',
          padding: '20px',
          background: '#F9FAFB',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {!started && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
            <p style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
              実際のAIが応答します。<br />気になるお悩みを選んでください。
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '320px' }}>
              {SUGGESTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  style={{
                    padding: '12px 16px',
                    fontSize: '13px',
                    background: '#FFFFFF',
                    border: '1px solid var(--color-border, #E5E7EB)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#374151',
                    lineHeight: 1.4,
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand, #1B5EBE)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(27,94,190,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border, #E5E7EB)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              gap: '8px',
              alignItems: 'flex-end',
            }}
          >
            {m.role === 'assistant' && (
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--color-brand, #1B5EBE)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Bot size={14} color="#FFFFFF" />
              </div>
            )}
            <div style={{
              maxWidth: '75%',
              padding: '10px 14px',
              borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: m.role === 'user' ? 'var(--color-brand, #1B5EBE)' : '#FFFFFF',
              color: m.role === 'user' ? '#FFFFFF' : '#1F2937',
              fontSize: '13px',
              lineHeight: 1.6,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {renderMarkdown(m.content)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--color-brand, #1B5EBE)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Bot size={14} color="#FFFFFF" />
            </div>
            <div style={{
              padding: '10px 14px',
              borderRadius: '14px 14px 14px 4px',
              background: '#FFFFFF',
              fontSize: '13px',
              color: '#9CA3AF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              入力中...
            </div>
          </div>
        )}

        {error && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '10px',
            background: '#FEF2F2',
            color: '#DC2626',
            fontSize: '13px',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}
      </div>

      {/* Input form / Demo ended */}
      {demoEnded ? (
        <div style={{
          padding: '20px 16px',
          borderTop: '1px solid var(--color-border, #E5E7EB)',
          background: '#F9FAFB',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '14px', color: '#374151', fontWeight: 600, margin: '0 0 4px 0' }}>
            このデモ体験はここまでです。
          </p>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 12px 0' }}>
            続きはディーチャー本人と話しませんか？
          </p>
          <a
            href="https://calendly.com/daiki-sakaguchi1994/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: 700,
              background: 'var(--color-cta, #EA6A00)',
              color: '#FFFFFF',
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            無料相談を予約する（30分）
          </a>
        </div>
      ) : (
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--color-border, #E5E7EB)',
          display: 'flex',
          gap: '8px',
          background: '#FFFFFF',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={150}
            placeholder="メッセージを入力..."
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: '14px',
              border: '1px solid var(--color-border, #E5E7EB)',
              borderRadius: '10px',
              outline: 'none',
              background: '#F9FAFB',
              color: '#1F2937',
              boxSizing: 'border-box',
            }}
          />
          {input.length > 0 && (
            <span style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '11px',
              color: input.length >= 140 ? '#DC2626' : '#9CA3AF',
            }}>
              {input.length}/150
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          style={{
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: 600,
            background: isLoading || !input.trim() ? '#D1D5DB' : 'var(--color-brand, #1B5EBE)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            cursor: isLoading || !input.trim() ? 'default' : 'pointer',
            transition: 'background 0.2s',
            flexShrink: 0,
          }}
        >
          送信
        </button>
      </form>
      )}

      {/* 3-box flow */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--color-border, #E5E7EB)',
        background: '#F9FAFB',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}>
          {[
            { icon: <Smartphone size={14} color="var(--color-accent, #0E9E96)" />, label: 'LINEで受信' },
            { icon: <Sparkles size={14} color="var(--color-accent, #0E9E96)" />, label: 'Claude AIが判断' },
            { icon: <Table2 size={14} color="var(--color-accent, #0E9E96)" />, label: 'Sheetsに記録' },
          ].map((item, i) => (
            <div key={item.label} style={{ display: 'contents' }}>
              {i > 0 && (
                <span style={{ color: '#9CA3AF', fontSize: '12px' }}>→</span>
              )}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: '#FFFFFF',
                border: '1px solid var(--color-border, #E5E7EB)',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#4B5563',
                fontWeight: 500,
              }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: '16px 20px',
        background: '#FFFFFF',
        borderTop: '1px solid var(--color-border, #E5E7EB)',
        textAlign: 'center',
      }}>
        <a
          href="https://calendly.com/daiki-sakaguchi1994/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            fontSize: '14px',
            fontWeight: 700,
            background: 'var(--color-cta, #EA6A00)',
            color: '#FFFFFF',
            borderRadius: '10px',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
        >
          無料相談（30分）
        </a>
        <p style={{
          fontSize: '11px',
          color: '#9CA3AF',
          marginTop: '10px',
          margin: '10px 0 0 0',
        }}>
          *このデモは実際のAIが応答します。内容はサンプルです。
        </p>
      </div>
    </div>
  );
}
