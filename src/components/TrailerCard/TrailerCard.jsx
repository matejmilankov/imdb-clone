import styles from './TrailerCard.module.css'
import clsx from 'clsx';
import gsap from 'gsap';
import { PlayIcon, LikeIcon } from "../../components/Icons/Icons";
import { useEffect, useRef } from 'react';
import { useSwiperSlide } from 'swiper/react';
import { WatchlistButton } from '../WatchlistButton/WatchlistButton';
import { formatRuntime } from '../../utils';
import { useModalActions } from '../../stores/Modal/modalStore';

export function TrailerCard({ movie, variant }) {
    const contentRef = useRef(null);
    const swiperSlide = useSwiperSlide();

    const { openModal } = useModalActions();

    useEffect(() => {
        if(swiperSlide?.isActive && variant === 'large' && contentRef.current) {
            gsap.fromTo(contentRef.current, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6 }
            );
        }
    }, [swiperSlide?.isActive, variant]);

    return (
        <div className={clsx(styles.heroSlideWrap, styles[variant])} ref={contentRef}>
            <div className={styles.coverImageWrapper}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                {variant === 'large' && (
                    <WatchlistButton 
                        movie={movie}
                    />
                )}
            </div>
            <div className={styles.heroSlideContent}>
                <button onClick={() => openModal('trailer', movie.id)}>
                    <PlayIcon width={"72px"} height={"72px"} />
                    {variant === 'small' && (
                        <span className={styles.movieRuntime}>{formatRuntime(movie.runtime)}</span>
                    )}
                </button>
                <div className={styles.heroSlideInfo}>
                    <div className={styles.heroSlideInfoHeader}>
                        <span className={styles.movieTitle}>'{movie.title}'</span>
                        {variant === 'large' && (
                            <span className={styles.movieRuntime}>{formatRuntime(movie.runtime)}</span>
                        )}
                    </div>
                    <span className={styles.trailerHeading}>Watch the Trailer</span>
                    <div className={styles.voteWrapper}>
                        <LikeIcon />
                        <span>{movie.vote_count}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}