import { create } from 'zustand';

// 챗봇 API를 거치지 않고 대화창에 꽂아 넣는 질문/답변 쌍(예: 정책 상세의 용어 설명).
// answer가 null이면 답변을 받아오는 중이라 대화창에 "설명하는 중" 표시를 띄운다.
export type ChatExchange = {
  id: string;
  question: string;
  answer: string | null;
};

type ChatPanelState = {
  isOpen: boolean;
  pendingMessage: string | null;
  pendingExchange: ChatExchange | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  ask: (message: string) => void;
  /** 질문을 먼저 대화창에 띄우고(답변 대기) 교환 id를 돌려준다. */
  startExchange: (question: string) => string;
  /** 대기 중인 교환에 답변을 채운다. 그사이 창을 닫았거나 다른 교환이 시작됐으면 무시한다. */
  resolveExchange: (id: string, answer: string) => void;
  clearPendingMessage: () => void;
  clearPendingExchange: () => void;
};

export const useChatPanelStore = create<ChatPanelState>((set) => ({
  isOpen: false,
  pendingMessage: null,
  pendingExchange: null,

  open: () => set({ isOpen: true }),
  close: () =>
    set({ isOpen: false, pendingMessage: null, pendingExchange: null }),
  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
      pendingMessage: state.isOpen ? null : state.pendingMessage,
      pendingExchange: state.isOpen ? null : state.pendingExchange,
    })),
  ask: (message) => {
    const trimmed = message.trim();
    if (!trimmed) return;
    set({ isOpen: true, pendingMessage: trimmed });
  },
  // 정책 상세의 용어 설명처럼 별도 API로 받아오는 질문/답변을 대화창에 보여준다
  // (POST /api/chat/messages로 다시 보내지 않음). 질문은 바로, 답변은 도착하면 채운다.
  startExchange: (question) => {
    const id = `exchange-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    set({ isOpen: true, pendingExchange: { id, question, answer: null } });
    return id;
  },
  resolveExchange: (id, answer) =>
    set((state) =>
      state.pendingExchange?.id === id
        ? { pendingExchange: { ...state.pendingExchange, answer } }
        : {}
    ),
  clearPendingMessage: () => set({ pendingMessage: null }),
  clearPendingExchange: () => set({ pendingExchange: null }),
}));
