import { useEffect, useRef, useState } from 'react';
import { useSendChatMessage } from '@pages/chatbot/hooks/useSendChatMessage';
import type { ChatMessage } from '@pages/chatbot/types/chat';
import { buildChatHistory } from '@pages/chatbot/utils/buildChatHistory';
import { getChatErrorMessage } from '@pages/chatbot/utils/getChatErrorMessage';

// ─── 타입 ────────────────────────────────────────────────────────────────────

export type ChatSession = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
};

// ─── 스토리지 유틸 ───────────────────────────────────────────────────────────

const SESSIONS_KEY = 'mozip-chat-sessions';

const loadSessions = (): ChatSession[] => {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? (JSON.parse(raw) as ChatSession[]) : [];
  } catch {
    return [];
  }
};

const saveSessions = (sessions: ChatSession[]) => {
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch {
    // 스토리지 용량 초과 등 무시
  }
};

// ─── ID 생성 ─────────────────────────────────────────────────────────────────

const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const truncateTitle = (text: string, max = 28) =>
  text.length > max ? text.slice(0, max) + '…' : text;

// ─── 훅 ──────────────────────────────────────────────────────────────────────

export const useChatSessions = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(loadSessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    const loaded = loadSessions();
    return loaded.length > 0 ? loaded[loaded.length - 1].id : null;
  });

  const { mutate, isPending } = useSendChatMessage();

  // 세션 목록이 바뀔 때마다 localStorage에 동기화
  useEffect(() => {
    saveSessions(sessions);
  }, [sessions]);

  // activeSessionId → 활성 메시지 목록
  const activeMessages =
    sessions.find((s) => s.id === activeSessionId)?.messages ?? [];

  // sendMessage에서 새 세션 생성 후 onSuccess/onError 클로저가 올바른 id를 참조하도록
  const pendingSessionIdRef = useRef<string | null>(null);

  const sendMessage = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isPending) return;

    const history = buildChatHistory(activeMessages);

    const userMessage: ChatMessage = {
      id: createId('user'),
      role: 'user',
      content: trimmed,
    };

    let targetId = activeSessionId;

    if (!targetId) {
      // 새 채팅 모드 → 첫 메시지를 제목으로 세션 생성
      const newSession: ChatSession = {
        id: createId('session'),
        title: truncateTitle(trimmed),
        messages: [],
        createdAt: Date.now(),
      };
      targetId = newSession.id;
      setActiveSessionId(targetId);
      setSessions((prev) => [...prev, newSession]);
    }

    pendingSessionIdRef.current = targetId;

    // 사용자 메시지 추가
    setSessions((prev) =>
      prev.map((s) =>
        s.id === targetId ? { ...s, messages: [...s.messages, userMessage] } : s
      )
    );

    mutate(
      { message: trimmed, history },
      {
        onSuccess: (data) => {
          const sid = pendingSessionIdRef.current;
          const assistantMessage: ChatMessage = {
            id: createId('assistant'),
            role: 'assistant',
            content:
              data.reply?.trim() ||
              '응답을 받지 못했습니다. 잠시 후 다시 시도해 주세요.',
            matchedPolicies: data.matchedPolicies,
            unresolvedConditions: data.unresolvedConditions,
            blocks: data.blocks,
            followUps: data.followUps,
          };
          setSessions((prev) =>
            prev.map((s) =>
              s.id === sid
                ? { ...s, messages: [...s.messages, assistantMessage] }
                : s
            )
          );
        },
        onError: (error) => {
          const sid = pendingSessionIdRef.current;
          const assistantMessage: ChatMessage = {
            id: createId('assistant'),
            role: 'assistant',
            content: getChatErrorMessage(error),
            isError: true,
          };
          setSessions((prev) =>
            prev.map((s) =>
              s.id === sid
                ? { ...s, messages: [...s.messages, assistantMessage] }
                : s
            )
          );
        },
      }
    );
  };

  /** 새 채팅 모드로 진입 (빈 메시지가 되며, 첫 전송 시 세션 생성) */
  const newChat = () => {
    setActiveSessionId(null);
  };

  /** 사이드바에서 기존 세션 선택 */
  const selectChat = (id: string) => {
    setActiveSessionId(id);
  };

  /** 세션 삭제 */
  const deleteChat = (id: string) => {
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== id);
      saveSessions(next); // effect보다 먼저 저장해 activeSessionId 변경과 동기 맞춤
      return next;
    });
    setActiveSessionId((prev) => {
      if (prev !== id) return prev;
      const remaining = sessions.filter((s) => s.id !== id);
      return remaining.length > 0 ? remaining[remaining.length - 1].id : null;
    });
  };

  return {
    sessions,
    activeSessionId,
    activeMessages,
    sendMessage,
    newChat,
    selectChat,
    deleteChat,
    isSending: isPending,
  };
};
