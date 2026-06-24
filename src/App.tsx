import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import CarListings from './components/CarListings';
import Contact from './components/Contact';
import Map from './components/Map';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <CarListings />
      <Contact />
      <Map />
      <Footer />
    </div>
  );
}

export default App;
