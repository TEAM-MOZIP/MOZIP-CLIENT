import { create } from 'zustand';

type ChatPanelState = {
  isOpen: boolean;
  pendingMessage: string | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  ask: (message: string) => void;
  clearPendingMessage: () => void;
};

export const useChatPanelStore = create<ChatPanelState>((set) => ({
  isOpen: false,
  pendingMessage: null,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, pendingMessage: null }),
  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
      pendingMessage: state.isOpen ? null : state.pendingMessage,
    })),
  ask: (message) => {
    const trimmed = message.trim();
    if (!trimmed) return;
    set({ isOpen: true, pendingMessage: trimmed });
  },
  clearPendingMessage: () => set({ pendingMessage: null }),
}));
