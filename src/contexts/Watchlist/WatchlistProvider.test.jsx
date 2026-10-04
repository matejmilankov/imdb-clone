import { renderHook, act } from "@testing-library/react";
import { WatchlistProvider } from "./WatchlistProvider";
import { useWatchlist } from "./WatchlistContext";

const wrapper = ({ children }) => (
    <WatchlistProvider>
        {children}
    </WatchlistProvider>
)

describe('WathclistProvider', () => {
    const testMovie = { id: 1, title: 'Test Movie'}

    beforeEach(() => {
        localStorage.clear();
    });

    test('add movie to watchlist and update localstorage', () => {
        // renderHook kreira neku komponentu u koju ubacuje custom hook useWatchlist
        // a zatim to obavije u wrapper komponentu
        // tako da sad custom hook se nalazi u komponenti koja se nalazi u provideru (uslovi da bi hook mogao da se koristi)
        const { result } = renderHook(() => useWatchlist(), { wrapper });

        expect(result.current.watchlist).toHaveLength(0);
        expect(result.current.isInWatchlist(testMovie.id)).toBe(false);

        act(() => result.current.toggleWatchlist(testMovie));

        expect(result.current.watchlist).toHaveLength(1);
        expect(result.current.isInWatchlist(testMovie.id)).toBe(true);

        const savedMovies = JSON.parse(localStorage.getItem('watchlist'));
        expect(savedMovies).toEqual([testMovie]);
    });

    test('remove existing movie on second toggle and update localstorage', () => {
        const { result } = renderHook(() => useWatchlist(), { wrapper });

        expect(result.current.watchlist).toHaveLength(0);
        expect(result.current.isInWatchlist(testMovie.id)).toBe(false);

        act(() => result.current.toggleWatchlist(testMovie));
        act(() => result.current.toggleWatchlist(testMovie));

        expect(result.current.watchlist).toHaveLength(0);
        expect(result.current.isInWatchlist(testMovie.id)).toBe(false);

        const savedMovies = JSON.parse(localStorage.getItem('watchlist'));
        expect(savedMovies).toEqual([]);
    });
});