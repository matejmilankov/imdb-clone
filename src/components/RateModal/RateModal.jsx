import { useState, useRef } from "react"
import { useModalTransition } from "../../hooks/animations/useModalTransition";
import { StarIcon, CloseIcon } from "../Icons/Icons";
import { useGSAP } from "@gsap/react";
import { useModal } from "../../stores/Modal/modalStore";
import { useRateActions } from "../../stores/Rate/rateStore";
import { useRating } from "../../stores/Rate/rateStore";
import { useModalActions } from "../../stores/Modal/modalStore";
import styles from './RateModal.module.css';
import gsap from 'gsap';

export function RateModal() {
    const clickedMovie = useModal('rate');
    const { closeModal } = useModalActions();
    
    const { closeOverlay, blurOverlayRef } = useModalTransition(closeModal);

    const currentRating = useRating(clickedMovie.id);
    const { rateMovie, removeRate } = useRateActions();

    const [hoveredRating, setHoveredRating] = useState(0);
    const [rating, setRating] = useState(currentRating);


    const ratingIconRef = useRef(null);

    useGSAP(() => {
        const targetScale = 0.75 + rating * 0.05;
        if(rating !== 0) {
            gsap.to(ratingIconRef?.current, {
                scale: targetScale, duration: 0.3, ease: "power2.inOut"
            });
        }
    }, [rating]);

    const lockRating = (event, starNumber) => {
        setRating(starNumber);
        event.stopPropagation();
    }


    return (
        <>
            <div
                className='backdropOverlay visible isRateModal'
                ref={blurOverlayRef}
                onClick={closeOverlay}
            >
                <div 
                    className={styles.rateModalWrapper}
                    onClick={(e) => e.stopPropagation()}    
                >
                    <div className={styles.rateModalContent}>
                        <span className={styles.rateModalPreHeader}>Rate this</span>
                        <span className={styles.rateModalTitle}>{clickedMovie.title}</span>
                        <div
                            className={styles.stars}
                            onMouseLeave={() => setHoveredRating(0)}
                        >
                            {Array.from({ length: 10 }).map((_, index) => {
                                const starNumber = index + 1;
                                return (
                                    <button
                                        key={starNumber}
                                        onMouseEnter={() => setHoveredRating(starNumber)}
                                        onClick={(event) => lockRating(event, starNumber)}
                                    >
                                        <StarIcon
                                            width="24px"
                                            height="24px"
                                            filled={
                                                hoveredRating
                                                    ? starNumber <= hoveredRating
                                                    : starNumber <= rating
                                            }
                                        />
                                    </button>
                                )
                            })}
                        </div>
                        <button
                            className={styles.rateButton}
                            disabled={rating === 0 || rating === currentRating}
                            onClick={() => {
                                rateMovie(clickedMovie, rating);
                                closeOverlay();
                            }}
                        >
                            Rate
                        </button>
                        {currentRating !== 0 && (
                            <button
                                className={styles.removeRateButton}
                                onClick={() => {
                                    removeRate(clickedMovie.id);
                                    closeOverlay();
                                }}
                            >
                                Remove rating
                            </button>
                        )}
                    </div>
                    <button 
                        className={styles.closeButton}
                        onClick={closeOverlay}
                    >
                        <CloseIcon />
                    </button>
                    <div className={styles.bigRateIcon} ref={ratingIconRef}>
                        <StarIcon 
                            width="120px" 
                            height="120px" 
                            filled={true} 
                        />
                        <span>{rating === 0 ? "?" : rating}</span>
                    </div>

                </div>
            </div>
        </>
    )
}