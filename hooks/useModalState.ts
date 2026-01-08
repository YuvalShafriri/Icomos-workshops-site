import { useState, useCallback } from 'react';

export type ModalName =
  | 'graph'
  | 'graphInput'
  | 'prompt'
  | 'demo'
  | 'principles'
  | 'inventory';

export interface ModalState {
  graph: boolean;
  graphInput: boolean;
  prompt: boolean;
  demo: boolean;
  principles: boolean;
  inventory: boolean;
}

export interface UseModalStateReturn {
  modals: ModalState;
  openModal: (name: ModalName) => void;
  closeModal: (name: ModalName) => void;
  closeAllModals: () => void;
  isAnyModalOpen: boolean;
}

const initialState: ModalState = {
  graph: false,
  graphInput: false,
  prompt: false,
  demo: false,
  principles: false,
  inventory: false,
};

export function useModalState(): UseModalStateReturn {
  const [modals, setModals] = useState<ModalState>(initialState);

  const openModal = useCallback((name: ModalName) => {
    setModals(prev => ({ ...prev, [name]: true }));
  }, []);

  const closeModal = useCallback((name: ModalName) => {
    setModals(prev => ({ ...prev, [name]: false }));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals(initialState);
  }, []);

  const isAnyModalOpen = Object.values(modals).some(Boolean);

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    isAnyModalOpen,
  };
}
