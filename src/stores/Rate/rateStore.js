import { create } from "zustand";

const savedMovies = localStorage.getItem('grades');

const useRateStore = create((set) => ({
    ratedMovies: savedMovies ? JSON.parse(savedMovies) : [],
    actions: {
        rateMovie: (movie, grade) => set(state => {
            const exists = state.ratedMovies.some(e => e.movie.id === movie.id);
            return {
                ratedMovies: exists
                    ? state.ratedMovies.map(e => e.movie.id === movie.id ? { movie, grade} : e)
                    : [...state.ratedMovies, { movie, grade }]
            }
        }),
        removeRate: (movieId) => set(state => ({
            ratedMovies: state.ratedMovies.filter(e => e.movie.id !== movieId)
        }))
    }
}));

useRateStore.subscribe(state => {
    localStorage.setItem('grades', JSON.stringify(state.ratedMovies));
});
export const useRatedMovies = () => useRateStore(state => state.ratedMovies);
export const useRateActions = () => useRateStore(state => state.actions);
export const useRating = (id) => useRateStore(state => (
    state.ratedMovies.find(e => e.movie.id === id)?.grade ?? 0
));