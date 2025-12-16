import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GalleryElegant from "./pages/GalleryElegant";
import GallerySocial from "./pages/GallerySocial";
import Order from "./pages/Order";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="min-h-screen p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryElegant />} />
        <Route path="/gallery-social" element={<GallerySocial />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
