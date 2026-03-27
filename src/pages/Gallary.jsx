import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";
import API_BASE from "../config/api";

const Gallery = () => {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/gallery`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm("Delete this entire category?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4">
        <div className="w-full lg:w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:w-full font-bold text-rose-800">My Albums</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Organize your wedding memories beautifully. </p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <button onClick={() => navigate("/create-memory")} className="w-full cursor-pointer lg:w-auto sm:w-auto flex justify-center items-center gap-2 bg-rose-800 text-white px-10 py-1 rounded-lg hover:bg-rose-700 active:scale-95 transition">
            <PlusCircle size={20} />
            Create Album
          </button>
        </div>
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-16 sm:py-20 bg-white rounded-2xl shadow-md px-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-600">No Albums Yet</h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Start creating beautiful memories today.</p>
          <button onClick={() => navigate("/create-memory")} className="mt-6 bg-rose-800 cursor-pointer text-white px-6 py-2.5 rounded-lg hover:bg-rose-600 active:scale-95 transition w-full sm:w-auto">
            Create Your First Album
          </button>
        </div>
      )}

      {/* Album Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {categories.map((cat) => (
          <div onClick={() => navigate(`/gallery/${cat._id}`)} key={cat._id} className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition duration-300">
            {/* Thumbnail */}
            {cat.files[0] && cat.files[0].type === "image" && (
              <img
                src={cat.files[0].fileUrl}
                alt="Category Thumbnail"
                className="h-44 sm:h-40 w-full object-cover"
              />
            )}

            {/* Card Content */}
            <div className="p-4 sm:p-5 cursor-pointer">
              <h2 className="text-base sm:text-lg font-semibold text-rose-800 truncate">
                {cat.title}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {cat.files.length} Files
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCategory(cat._id);
              }}
              className="absolute top-3 right-3 bg-red-800 text-white p-2 rounded-full shadow-md hover:bg-red-600 active:scale-90 transition"
            >
              <Trash2 size={16} />
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Gallery;