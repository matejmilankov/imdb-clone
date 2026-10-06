import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { useMovieTrailer } from "./useMovieTrailer";

vi.mock('axios');

describe('useMovieTrailer', () => {
    test('successful fetch and trailer exists', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                results: [
                    { id: '1', key: 'wrong-type', site: 'YouTube', type: 'Teaser' },
                    { id: '2', key: 'wrong-site', site: 'Vimeo', type: 'Trailer' },
                    { id: '3', key: 'correct-one', site: 'YouTube', type: 'Trailer' },
                    { id: '4', key: 'also-correct-but-ignored', site: 'YouTube', type: 'Trailer' },
                ]
            }
        });

        const { result } = renderHook(() => useMovieTrailer('2'));

        // posto useEffect unutar hook se desava tek nakon rendera (hook uradi return)
        // hook vraca inicijalne vrednosti stejtova u objektu
        // koje onda proverim iz ova dva expecta
        expect(result.current.isLoading).toBe(true);
        expect(result.current.trailer).toBeNull();

        // waitFor je asihron jer ceka da se expect postane true
        // a on ce postati true tek kada hook uradi useEffect
        // i vrati novi objekat, cime se updateuje result.current
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
        expect(result.current.trailer.key).toBe("correct-one");
    });

    test('successful fetch and trailer doesnt exists', () => {

    });

    test('handles fetch error', async () => {
        axios.get.mockRejectedValueOnce(new Error('Fetch failed'));

        const { result } = renderHook(() => useMovieTrailer(2));

        expect(result.current.isLoading).toBe(true);
        expect(result.current.trailer).toBeNull();

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.trailer).toBeNull();
        expect(result.current.error).toBeDefined();
    });
});