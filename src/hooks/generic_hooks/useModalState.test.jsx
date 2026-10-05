import { renderHook, act } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useModalState } from "./useModalState";

describe('useModalState hook', () => {
    const testItem = { id: 1 };

    test('opens and closes modal', () => {
        const { result } = renderHook(() => useModalState());

        expect(result.current.clickedItem).toBeNull();

        act(() => result.current.openModal(testItem));
        expect(result.current.clickedItem).toEqual(testItem);

        act(() => result.current.closeModal());
        expect(result.current.clickedItem).toBeNull();
    });

    test('openModal and closeModal stay unchanged across rerenders', () => {
        const { result, rerender } = renderHook(() => useModalState());

        const firstOpenModal = result.current.openModal;
        const firstCloseModal = result.current.closeModal;

        act(() => result.current.openModal(testItem));
        rerender();

        expect(result.current.openModal).toBe(firstOpenModal);
        expect(result.current.closeModal).toBe(firstCloseModal);
    });
});