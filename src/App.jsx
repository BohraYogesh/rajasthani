import { useEffect } from "react";
import { destroySmoothScroll, initSmoothScroll } from "./lib/scroll";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HawaMahalIntro from "./components/intro/HawaMahalIntro";
import BaraatScene from "./components/intro/BaraatScene";
import Hero from "./components/sections/Hero";
import FamilyInvitation from "./components/sections/FamilyInvitation";
import WeddingJourney from "./components/sections/WeddingJourney";
import Events from "./components/sections/Events";
import Venue from "./components/sections/Venue";
import OurStory from "./components/sections/OurStory";
import Gallery from "./components/sections/Gallery";
import Rsvp from "./components/sections/Rsvp";
import GiftBlessings from "./components/sections/GiftBlessings";
import { introAssets as a } from "./data/introAssets";
import MusicPlayer from "./components/ui/MusicPlayer";

export default function App() {
  useEffect(() => {
    // Refresh par hamesha intro se shuru ho
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    initSmoothScroll();
    return destroySmoothScroll;
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HawaMahalIntro {...a.hawaMahal}>
          <Hero />
        </HawaMahalIntro>
        {/* <BaraatScene village={a.village} cart={a.cart} musicians={a.musicians} /> */}
        <FamilyInvitation />
        <WeddingJourney />
        <Events />
        <Venue />
        <OurStory />
        <Gallery />
        <Rsvp />
        <GiftBlessings />
      </main>
      <Footer />
      <MusicPlayer triggerId="home" />
    </>
  );
}
