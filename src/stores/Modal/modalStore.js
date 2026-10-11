import { create } from "zustand";

const useModalStore = create((set) => ({
    modals: [],
    actions: {
        openModal: (type, data) => set(state => ({
            modals: [...state.modals, { type, data}]
        })),
        closeModal: () => set(state => ({
            modals: state.modals.slice(0, -1)
        }))
    }
}));

export const useModal = (type) => 
    useModalStore(state => state.modals.find(m => m.type === type)?.data ?? null);
export const useModalActions = () => useModalStore(state => state.actions);