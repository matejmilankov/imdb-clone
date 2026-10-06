import axios from "axios";
import { useEffect, useState } from "react";

export function useMovieTrailer(movieId) {
    const [trailer, setTrailer] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
                    headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}` }
                });
                const trailers = response.data.results.find(t => t.type === "Trailer" && t.site === "YouTube");
                setTrailer(trailers);
            } catch (err) {
                console.error("Error, couldn't load movies.", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTrailer();
    }, [movieId]);

    return {trailer, error, isLoading}
}