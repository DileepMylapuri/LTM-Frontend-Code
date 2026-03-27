import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../pages/HomeFolder/Navbar";
import API_BASE from "../config/api";

const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/gallery`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const category = res.data.find((c) => c._id === id);

      if (category) {
        setFiles(category.files);
        setTitle(category.title);
      }

    } catch (err) {
      console.error(err);
    }
  };

    const handleDelete = async (memoryId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`${API_BASE}/memory/${memoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
        });

        // Remove from UI instantly
        setFiles(files.filter((file) => file._id !== memoryId));

    } catch (err) {
        alert(err.response?.data?.message || "Delete failed");
    }
    };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <div className="p-10">
        <button onClick={() => navigate("/gallery")} className="mb-6 text-rose-500 hover:underline">← Back to Albums</button>
        <h1 className="text-2xl font-bold text-rose-600 mb-8">{title}</h1>
        {files.length === 0 && (
          <p className="text-gray-500">No files in this category.</p>
        )}
       <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {files.map((file) => (
                <div key={file._id} className="relative group">
                {file.type === "image" ? (
                    <img src={file.fileUrl} className="w-full rounded-xl shadow-md mb-4 transition duration-300 hover:opacity-90" alt="Uploaded file"/>
                ) : (
                    <video src={file.fileUrl} controls className="w-full rounded-xl shadow-md mb-4" />
                )}
                {/* Delete Button INSIDE map */}
                <button onClick={() => handleDelete(file._id)} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    Delete
                </button>
                </div>
            ))}
            </div>
      </div>
    </>
  );
};

export default CategoryDetails;