// --- Main Page ---

import Features from "./Features";
import Hero from "./Hero";
import Navbar from "./Navbar";

const AlbumLanding = () => {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gray-50">
      <Navbar />
      <Hero />
      <Features />
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p>© 2026 eAlbum.in - Powered by Codnix. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AlbumLanding;