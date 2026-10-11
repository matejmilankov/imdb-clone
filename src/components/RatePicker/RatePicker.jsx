import { StarIcon } from "../Icons/Icons";
import { useRating } from "../../stores/Rate/rateStore";
import { useModalActions } from "../../stores/Modal/modalStore";
import styles from './RatePicker.module.css';

export function RatePicker({ variant, iconWidth, iconHeight, movie }) {
    const { openModal } = useModalActions();

    const currentRating = useRating(movie.id);

    return (
        <button
            className={styles.ratePickerWrapper}
            onClick={() => openModal('rate', movie)}
        >
            <StarIcon
                width={iconWidth}
                height={iconHeight}
                filled={currentRating > 0}
            />
            {currentRating !== 0 && variant === "small" && (
                <span className={styles.currentRating}>{currentRating}</span>
            )}
            {variant === 'large' && (
                <span>Rate</span>
            )}
        </button>
    )
}