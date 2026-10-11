import styles from './MovieCard.module.css'
import { WatchlistButton } from '../WatchlistButton/WatchlistButton';
import { MovieRating } from '../MovieRating/MovieRating';
import { RatePicker } from '../RatePicker/RatePicker';
import { SmallPlayIcon, InfoIcon } from '../Icons/Icons';
import { useMovieDetailsModal } from '../../contexts/MovieDetails/MovieDetailsContext';
import { useModalActions } from '../../stores/Modal/modalStore';
import clsx from 'clsx';

export function MovieCard({ movie, variant }) {
    const { openModal } = useModalActions();
    const { openMovieDetailsModal } = useMovieDetailsModal();

    return (
        <div className={styles.moviCardWrapper}>
            <div className={styles.movieCardPoster}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                <WatchlistButton movie={movie} />
            </div>

            <div className={styles.moviCardDesc}>
                <div className={styles.movieCardInfo}>
                    <div className={styles.ratingWrap}>
                        <MovieRating rating={movie.vote_average} />
                        <RatePicker
                            iconHeight="16px"
                            iconWidth="16px"
                            movie={movie}
                            variant="small"
                        />
                    </div>
                    <span>{movie.title}</span>
                </div>

                <div>
                    <WatchlistButton
                        variant='wide'
                        movie={movie}
                    />

                    <div className={clsx(
                        styles.moviCardAction,
                        variant === "reduced" && styles.reduced
                    )}>
                        <button onClick={() => openModal('trailer', movie.id)}>
                            <SmallPlayIcon />
                            <span>Trailer</span>
                        </button>
                        {variant !== "reduced" && (
                            <button onClick={() => openMovieDetailsModal(movie.id)}>
                                <InfoIcon />
                            </button>
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}