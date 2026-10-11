import { Header } from "../../components/Header/Header";
import { ModalRoot } from "../../components/ModalRoot/ModalRoot";
import { NowPlayingHeroSlider } from "../../components/HeroSlider/NowPlayingHeroSlider";
import { TopPicksMovieSlider } from "../../components/MovieSlider/TopPicksMovieSlider";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { YourWatchlistSlider } from "../../components/MovieSlider/YourWatchlistSlider";
import styles from './Home.module.css'

export function Home() {

    return (
        <>
            <ModalRoot />
            
            <div className={styles.heroLayout}>
                <Header />
                <NowPlayingHeroSlider />

                <section className="container">
                    <SectionHeader
                        variant="standard"
                        preHeader="What to watch"
                        preHeaderLink="Get more recommendations"
                        header="Top picks"
                        headerDesc="Tv shows and movies just for you"
                    />
                    <TopPicksMovieSlider />
                </section>

                <section className="container">
                    <SectionHeader 
                        variant="reduced"
                        header="From your watchlist"
                    />
                    <YourWatchlistSlider />
                </section>


                <section style={{ padding: "200px 0" }}></section>
            </div>
        </>
    )
}
