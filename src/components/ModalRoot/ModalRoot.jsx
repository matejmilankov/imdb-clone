import { useModal } from "../../stores/Modal/modalStore";
import { MovieDetailsModal } from "../MovieDetailsModal/MovieDetailsModal";
import { RateModal } from "../RateModal/RateModal";
import { TrailerModal } from "../TrailerModal/TrailerModal";

export function ModalRoot() {
    const trailerId = useModal('trailer');
    const movie = useModal('rate');
    // const details = useModal('details');

    return (
        <>
            {trailerId && <TrailerModal />}
            {movie && <RateModal />}
            {/* {details && <MovieDetailsModal />} */}
        </>
    )
}