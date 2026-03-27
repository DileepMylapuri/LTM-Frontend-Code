import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Images,
  Image as ImageIcon,
  Video,
  Calendar,
  Mail,
  User,
  Edit,
  Instagram, 
  Twitter
} from "lucide-react";
import { HomeData } from "../assets/assets";
// import CreateMemorySection from "../components/CreateMemorySection";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import API_BASE from "../config/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    bio: ""
  });
  const [stats, setStats] = useState(null);
  const [recentUploads, setRecentUploads] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const statsRes = await axios.get(`${API_BASE}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const recentRes = await axios.get(`${API_BASE}/recent`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStats(statsRes.data);
      setRecentUploads(recentRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);

  useEffect(() => {
  if (user) {
    setFormData({
      username: user.username,
      bio: user.bio || ""
    });
  }
}, [user]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login again.");
          return;
        }

        const res = await axios.get(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(res.data);
      } catch (err) {
        setError("Session expired. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
        {error}
      </div>
    );
  }


const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("username", formData.username);
    data.append("bio", formData.bio);

    if (formData.profileImage)
      data.append("profileImage", formData.profileImage);

    if (formData.coverImage)
      data.append("coverImage", formData.coverImage);

    const res = await axios.put(`${API_BASE}/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    setUser(res.data);
    setIsEditing(false);

  } catch (err) {
    alert(err.response?.data?.message || "Update failed");
  }
};

return (
  <div className="min-h-screen bg-gray-50">
    <div className="relative h-[300px] md:h-[300px] w-full">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${user.coverImage || HomeData.RoseLove})`
        }}/>
      <div className="absolute inset-0 bg-black/50" />
      {/* <div className="absolute top-0 left-0 w-full z-20">
      </div> */}
      {/* <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold">
            Welcome, {user.username}
          </h1>
          <p className="mt-3 text-gray-200">
            Manage and relive your beautiful memories
          </p>
        </div>
      </div> */}
    </div>

    <div className="-mt-50 sm:-mt-50 bg-transparent rounded-2xl p-6 md:p-8 relative z-20 flex flex-col md:flex-row items-center md:items-end gap-6">
      <button onClick={() => setIsEditing(true)}
        className="absolute top-5 right-5 text-gray-50 hover:text-rose-500 transition">
        <Edit size={20} />
      </button>

        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-4xl text-white font-bold">
              {user.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="text-center md:text-left flex-1 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-50">{user.username}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-50 text-sm">
            <div className="flex items-center text-gray-50 gap-2">
              <Mail size={16} />
              {user.email}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              Joined {new Date(user.createdAt).getFullYear()}
            </div>
          </div>
          <p className="text-gray-50 max-w-xl mt-2">
            Digital memory curator. Organizing life’s best moments into
            meaningful collections and stories.
          </p>
        </div>
      {isEditing && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <input type="text" value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Username"/>

                <div className="flex flex-col gap-6">
                {/* Profile Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                  <div className="relative">
                    <input 
                      id="profile-upload"
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })}
                    />
                    <label 
                      htmlFor="profile-upload"
                      className="flex items-center justify-between w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-rose-100 text-gray-500 group-hover:text-rose-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">
                          {formData.profileImage ? formData.profileImage.name : "Choose profile photo"}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded group-hover:bg-rose-100">Browse</span>
                    </label>
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                  <div className="relative">
                    <input 
                      id="cover-upload"
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.files[0] })}
                    />
                    <label 
                      htmlFor="cover-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-all group"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload cover</span></p>
                        <p className="text-xs text-gray-400">{formData.coverImage ? formData.coverImage.name : "PNG, JPG or GIF (max. 800x400px)"}</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <textarea value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="Bio" rows="3" />

              <div className="flex justify-end gap-3">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button onClick={handleUpdate} className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600">Save</button>
              </div>
            </div>
          </div>
        )}
    </div>

      {/* Album Guide */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10">
          {stats && [
            { label: "Albums", value: stats.categories, icon: <Images size={22} /> },
            { label: "Photos", value: stats.photos, icon: <ImageIcon size={22} /> },
            { label: "Videos", value: stats.videos, icon: <Video size={22} /> },
            {
              label: "Current Year",
              value: new Date(user.createdAt).getFullYear(),
              icon: <User size={22} />
            }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-3 text-rose-500">
                {item.icon}
                <span className="text-2xl font-bold text-gray-800">
                  {item.value}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{item.label}</p>
            </div>
          ))}
      </div>
        <div className="flex justify-end pr-10">
            <button
              onClick={() => navigate("/create-memory")}
              className="flex items-center gap-2 bg-rose-500 text-white px-5 py-2 rounded-lg hover:bg-rose-600 transition"
            >
              <Plus size={18} />
              Create Memory
            </button>
        </div>
      
      {/* Recent Uploded Images */}
        <div className="p-10 pb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Recent Uploads
          </h2>

          {recentUploads.length === 0 ? (
            <p className="text-gray-500">No uploads yet.</p>
          ) : (
            <div onClick={()=> navigate('/gallery')} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {recentUploads.map((file) =>
                file.type === "image" ? (
                  <img
                    key={file._id}
                    src={file.fileUrl}
                    alt=""
                    className="h-40 w-full object-cover rounded-xl hover:scale-105 transition"
                  />
                ) : (
                  <video
                    key={file._id}
                    src={file.fileUrl}
                    className="h-40 w-full object-cover rounded-xl"
                  />
                )
              )}
            </div>
          )}
        </div>


      {/* About Section */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Bio - 2/3 width */}
            <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <User className="text-rose-500" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  {user.bio || "Welcome to my digital sanctuary. I'm a curator of life's fleeting moments, dedicated to preserving the stories that matter most. From everyday joys to grand adventures, this space is where my memories live and breathe."}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Photography", "Travel", "Memory Keeping", "Storytelling"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-500 text-sm rounded-full border border-gray-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Info Sidebar - 1/3 width */}
            <div className="bg-rose-500 p-8 rounded-3xl text-white shadow-lg shadow-rose-200 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-6">Platform Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs opacity-70">Member Since</p>
                    <p className="font-medium text-lg">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs opacity-70">Contact Email</p>
                    <p className="font-medium truncate max-w-[150px]">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Create Memory */}
        <section className="py-12 bg-white sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-800 mb-3 sm:mb-4">you gonna Love it!</h2>
            <p className=" font-light sm:text-lg lg:text-lg leading-relaxed text-zinc-600 max-w-3xl mx-auto">
              Yes, you get that right! Just like a traditional album, with our FREE Book you can enjoy viewing every memory page by page. It is like a pocket album for you! Furthermore, you can share it with your loved ones as per your convenience. That is not all; with our Album, you also get a chance to relive all those precious memories again. Do not believe it? Test it on your own.
            </p>
          </div>
        </section>

      {/* Footer Section */}
      <footer className="mt-24 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white font-bold italic">R</div>
                <i className="text-xl font-bold tracking-tight text-gray-800">Lifetime Memory</i>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                Preserving your most precious moments in a beautiful, organized, and secure digital vault. Relive your story, one memory at a time.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="/dashboard" className="hover:text-rose-500 transition">Dashboard</a></li>
                <li><a href="/create-memory" className="hover:text-rose-500 transition">Create Memory</a></li>
                <li><a href="/gallery" className="hover:text-rose-500 transition">My Albums</a></li>
                <li><a href="/settings" className="hover:text-rose-500 transition">Settings</a></li>
              </ul>
            </div>

            {/* Social & Support */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-rose-500 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-rose-500 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-rose-500 transition">Terms of Service</a></li>
                <div className="flex gap-4 pt-2">
                  {/* Replace with actual social icons */}
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 cursor-pointer transition">
                    <span className="sr-only">Instagram</span>
                    <Instagram size={24} className="text-pink-500 hover:scale-110 transition cursor-pointer" />
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 cursor-pointer transition">
                    <span className="sr-only">Twitter</span>
                    <Twitter size={24} className="text-blue-500 hover:scale-110 transition cursor-pointer" />                  </div>
                </div>
              </ul>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} For VN life Memories. All rights reserved.</p>
            <p>Designed with ❤️ for your memories.</p>
          </div>
        </div>
      </footer>
  </div>
);
};

export default Dashboard;