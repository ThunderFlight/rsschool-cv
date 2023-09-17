import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { AboutCarousel } from "./components/aboutCarousel/aboutCarousel";
import { CoffeShop } from "./components/coffeShop/coffeShop";
import { DigitalLibraryCards } from "./components/digitalLibraryCards/digitalLibraryCards";
import { Favorites } from "./components/favorites/favorites";
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { Contacts } from "./components/contacts/contacts";
import { WelcomeBanner } from "./components/welcomeBanner/welcomeBanner";
import booksData from "./data/booksData.json";
function App() {
  const [carousel, setCarousel] = useState(false);
  const [width, setWidth] = useState(window.screen.width);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.screen.width);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  useEffect(() => {
    if (width < 1024) {
      setCarousel(true);
    }
    if (width > 1024) {
      setCarousel(false);
    }
  }, [width]);
  return (
    <div className="App">
      <Header headerWidth={carousel} />
      <main style={styles.main}>
        <WelcomeBanner />
        <AboutCarousel isCarouselWidth={carousel} width={width}/>
        <Favorites data={booksData} />
        <CoffeShop />
        <Contacts />
        <DigitalLibraryCards />
      </main>
      <Footer />
    </div>
  );
}

export default App;