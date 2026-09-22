import { create } from 'zustand';

export type ChatExchange = {
  question: string;
  answer: string;
};

type ChatPanelState = {
  isOpen: boolean;
  pendingMessage: string | null;
  pendingExchange: ChatExchange | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  ask: (message: string) => void;
  showExchange: (exchange: ChatExchange) => void;
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
  // 이미 응답을 받아온 질문/답변 쌍을 그대로 대화창에 꽂아 넣는다
  // (예: 정책 상세의 용어 설명 — 다시 POST /api/chat/messages로 보내지 않음).
  showExchange: (exchange) => set({ isOpen: true, pendingExchange: exchange }),
  clearPendingMessage: () => set({ pendingMessage: null }),
  clearPendingExchange: () => set({ pendingExchange: null }),
}));
