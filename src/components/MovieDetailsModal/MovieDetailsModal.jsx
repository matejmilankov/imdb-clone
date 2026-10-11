import { useMovie } from "../../hooks/api_calls/useMovie";
import { useModalTransition } from "../../hooks/animations/useModalTransition";
import { CloseIcon } from "../Icons/Icons";
import { MovieRating } from "../MovieRating/MovieRating";
import { RatePicker } from "../RatePicker/RatePicker";
import { MovieHeader } from "../MovieHeader/MovieHeader";
import { Link } from "react-router";
import { WatchlistButton } from "../WatchlistButton/WatchlistButton";
import { useModal, useModalActions } from "../../stores/Modal/modalStore";
import styles from './MovieDetailsModal.module.css';

export function MovieDetailsModal() {
    const clickedMovieDetails = useModal('details');
    const { closeModal } = useModalActions();

    const { movieDetails, isLoading, error } = useMovie(clickedMovieDetails);
    const { closeOverlay, blurOverlayRef } = useModalTransition(closeModal);

    const bgImg = {
        backgroundImage: `url(https://image.tmdb.org/t/p/w200/${movieDetails?.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return (
        <div
            className='backdropOverlay visible'
            ref={blurOverlayRef}
            onClick={closeOverlay}
        >
            {isLoading && <p className={styles.info}>Loading...</p>}
            {error && <p className={styles.info}>Something went wrong. Please try again later.</p>}
            {movieDetails && (
                <div
                    className={styles.rateModalWrapper}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.rateModalContent}>
                        <Link
                            to={`/${movieDetails.id}`}
                            className={styles.imageWrapper}
                            style={bgImg}
                        />

                        <div className={styles.movieOverview}>
                            <MovieHeader
                                movieDetails={movieDetails}
                            />
                            <div className={styles.genres}>
                                {movieDetails.genres.map((genre, index, arr) => {
                                    if (arr.length === index + 1)
                                        return <span key={index}>{genre.name}</span>
                                    return (
                                        <span key={index}>
                                            <span>{genre.name}</span>
                                            <span> · </span>
                                        </span>
                                    )
                                })}
                            </div>
                            <div className={styles.ratingWrapper}>
                                <MovieRating
                                    rating={movieDetails.vote_average}
                                    variant="divided"
                                />
                                <RatePicker
                                    variant="large"
                                    iconWidth="16px"
                                    iconHeight="16px"
                                    movie={movieDetails}
                                />
                            </div>
                        </div>

                    </div>

                    <p>{movieDetails.overview}</p>

                    <div className={styles.movieDetailsActions}>
                        <WatchlistButton 
                            movie={movieDetails}
                            variant="wide"
                        />
                    </div>

                    <button
                        className={styles.closeButton}
                        onClick={closeOverlay}
                    >
                        <CloseIcon />
                    </button>

                </div>
            )}
        </div>
    )
}