import { WatchlistProvider } from '../contexts/Watchlist/WatchlistProvider';
import { MovieDetailsProvider } from '../contexts/MovieDetails/MovieDetailsProvider';

const providers = [
    WatchlistProvider,
    MovieDetailsProvider
]

export function AppProviders({ children }) {
    return providers.reduceRight(
        (acc, Provider) => <Provider>{acc}</Provider>,
        children
    );
}