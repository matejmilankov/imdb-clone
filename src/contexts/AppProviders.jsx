import { WatchlistProvider } from '../contexts/Watchlist/WatchlistProvider';

const providers = [
    WatchlistProvider
]

export function AppProviders({ children }) {
    return providers.reduceRight(
        (acc, Provider) => <Provider>{acc}</Provider>,
        children
    );
}