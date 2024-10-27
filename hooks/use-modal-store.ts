import { create } from "zustand";

export type ModalType = "profile" | "createInvoice";

interface ModalData {
  data?: unknown;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: (data = {}) => set({ type: null, isOpen: false, data }),
}));
