import { create } from "zustand";

const useModalStore = create((set) => ({
    modal: null,
    actions: {
        openModal: (type, data) => set({ modal: { type, data } }),
        closeModal: () => set(() => ({ modal: null }))
    }
}));

export const useModal = (type) => 
    useModalStore(state => state.modal?.type === type ? state.modal.data : null);
export const useModalActions = () => useModalStore(state => state.actions);