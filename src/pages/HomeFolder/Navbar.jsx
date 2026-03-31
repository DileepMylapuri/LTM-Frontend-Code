import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setMobileOpen(false);
    setProfileOpen(false);
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
    setProfileOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      style={{
        background:
          "linear-gradient(135deg,#1c0514 0%,#3b1228 40%,#5e1a3a 70%,#8b1a4a 100%)",
      }}
      className="sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-rose-500"
            onClick={() => setMobileOpen(false)}
          >
            LTM<span className="text-white">.in</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center text-white">

            {isAuthenticated && (
              <>
                <Link to="/" className="hover:text-rose-400">Home</Link>
                <Link to="/profile" className="hover:text-rose-400">Profile</Link>
                <Link to="/create-memory" className="hover:text-rose-400">CreateMemory</Link>
                <Link to="/gallery" className="hover:text-rose-400">Gallery</Link>
                <Link to="/features" className="hover:text-rose-400">Features</Link>
                <Link to="/about" className="hover:text-rose-400">About</Link>
              </>
            )}

            {!isAuthenticated ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-rose-500 px-5 py-2 rounded hover:bg-rose-600 transition"
              >
                Login / Create Account
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center justify-center bg-rose-600 w-10 h-10 rounded-full overflow-hidden hover:bg-rose-700 transition">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} className="text-white" />
                    )}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg text-black p-4 animate-fadeIn">
                    <div className="border-b pb-3 mb-3">
                      <p className="font-semibold text-sm">
                        {user?.username || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <button onClick={() => handleNavigate("/profile")} className="block w-full text-left text-sm hover:text-rose-600 mb-2">
                      My Profile
                    </button>

                    <button onClick={handleLogout} className="block w-full text-left text-sm text-red-500 hover:text-red-600">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-white">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#3b1228] text-white px-6 py-4 space-y-4">

          {isAuthenticated && (
            <>
              <div onClick={() => handleNavigate("/")} className="cursor-pointer hover:text-rose-400">Home</div>
              <div onClick={() => handleNavigate("/profile")} className="cursor-pointer hover:text-rose-400">Profile</div>
              <div onClick={() => handleNavigate("/gallery")} className="cursor-pointer hover:text-rose-400">Gallery</div>
              <div onClick={() => handleNavigate("/features")} className="cursor-pointer hover:text-rose-400">Features</div>
              <div onClick={() => handleNavigate("/about")} className="cursor-pointer hover:text-rose-400">About</div>

              <div className="border-t border-gray-600 pt-4">
                <p className="text-sm">{user?.username}</p>
                <p className="text-xs text-gray-300">{user?.email}</p>
              </div>

              <button onClick={handleLogout} className="w-full bg-gray-700 py-2 rounded hover:bg-gray-800 transition mt-3" >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <button onClick={() => handleNavigate("/login")} className="w-full bg-rose-500 py-2 rounded hover:bg-rose-600 transition" >
              Login / Create Account
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;