import { WatchlistProvider } from '../contexts/Watchlist/WatchlistProvider';
import { TrailerProvider } from '../contexts/Trailer/TrailerProvider';
import { MovieDetailsProvider } from '../contexts/MovieDetails/MovieDetailsProvider';

const providers = [
    WatchlistProvider,
    TrailerProvider,
    MovieDetailsProvider
]

export function AppProviders({ children }) {
    return providers.reduceRight(
        (acc, Provider) => <Provider>{acc}</Provider>,
        children
    );
}