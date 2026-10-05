import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { RateProvider } from "./RateProvider";
import { useRateModal } from "./RateContext";

const wrapper = ({ children }) => (
    <RateProvider>
        {children}
    </RateProvider>
)

describe('RateProvider', () => {
    const testMovie = { id: 1, title: 'Test movie' };
    const testGrade = 7;

    beforeEach(() => {
        localStorage.clear();
    });

    test('throws error when used out of Provider', () => {
        expect(() => renderHook(() => useRateModal())).toThrow();
    });

    test('rate movie and update localstorage', () => {
        const { result } = renderHook(() => useRateModal(), { wrapper });

        expect(result.current.ratedMovies).toHaveLength(0);
        act(() => result.current.rateMovie(testMovie, testGrade));

        expect(result.current.ratedMovies).toHaveLength(1);
        expect(result.current.ratedMovies).toEqual([{ movie: testMovie, grade: testGrade }]);

        const savedRatedMovie = JSON.parse(localStorage.getItem('grades'));
        expect(savedRatedMovie).toEqual([{ movie: testMovie, grade: testGrade }]);
    });

    test('remove rating and update localstorage', () => {
        const { result } = renderHook(() => useRateModal(), { wrapper });

        expect(result.current.ratedMovies).toHaveLength(0);
        act(() => result.current.rateMovie(testMovie, testGrade));
        expect(result.current.ratedMovies).toHaveLength(1);

        act(() => result.current.removeRate(testMovie.id));
        expect(result.current.ratedMovies).toHaveLength(0);

        const savedRatedMovies = JSON.parse(localStorage.getItem('grades'));
        expect(savedRatedMovies).toEqual([]);
    });

    test('updates existing rating instead of duplicating', () => {
        const { result } = renderHook(() => useRateModal(), { wrapper });

        act(() => result.current.rateMovie(testMovie, testGrade));
        act(() => result.current.rateMovie(testMovie, 9));

        expect(result.current.ratedMovies).toHaveLength(1);
        expect(result.current.getRating(testMovie.id)).toBe(9);
    });

    describe('getRating', () => {
        test('returns correct grade', () => {
            const { result } = renderHook(() => useRateModal(), { wrapper });
        
            expect(result.current.ratedMovies).toHaveLength(0);
            act(() => result.current.rateMovie(testMovie, testGrade));
        
            expect(result.current.ratedMovies).toHaveLength(1);
            expect(result.current.getRating(testMovie.id)).toBe(7);
        });

        test('returns 0 for a movie that is not rated', () => {
            const { result } = renderHook(() => useRateModal(), { wrapper });
            expect(result.current.getRating(testMovie.id)).toBe(0);
        });
    });
});