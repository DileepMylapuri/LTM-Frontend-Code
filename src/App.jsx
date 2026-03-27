import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

import Home from "./pages/Home";
import LoginPage from "./pages/AuthenticFolder/LoginPage";
import WeddingHome from "./pages/WeddingHome";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallary";
import CategoryDetails from "./pages/CategoryDetails";
import Navbar from "./pages/HomeFolder/Navbar";
import About from "./pages/About";

const CreateMemoryPage = lazy(() =>
  import("./pages/CreateMemoryPage")
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [user] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          user={user}
        />
        <div className="min-h-screen bg-background text-ink font-sans bg-zinc-200">
          <Routes>
            <Route path="/"element={isAuthenticated ? (<WeddingHome/>) : (<Home/>)} />
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/features" element={<Home />} />
            <Route path="/gallery" element={<Gallery/>} />
            <Route path="/gallery/:id" element={<CategoryDetails/>} />
            <Route path="/profile" element={<Dashboard/>} />
            <Route path="/create-memory" element={<CreateMemoryPage/> }/>
            <Route path="/about" element={<About/> }/>
            </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;