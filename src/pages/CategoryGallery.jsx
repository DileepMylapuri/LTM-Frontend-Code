import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

const CategoryGallery = () => {
  const { id } = useParams();
  const [memories, setMemories] = useState([]);
  const token = localStorage.getItem("token");


  const fetchMemories = async () => {
    const res = await axios.get(`${API_BASE}/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMemories(res.data);
  };

    useEffect(() => {
        fetchMemories();
    }, [id]);



  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <h1 className="text-2xl font-semibold mb-8">
        Memory Gallery
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {memories.map((item) =>
          item.type === "image" ? (
            <img
              key={item._id}
              src={`http://localhost:5000${item.fileUrl}`}
              alt=""
              className="rounded-xl shadow-md hover:scale-105 transition"
            />
          ) : (
            <video
              key={item._id}
              src={`http://localhost:5000${item.fileUrl}`}
              controls
              className="rounded-xl shadow-md"
            />
          )
        )}

      </div>

    </div>
  );
};

export default CategoryGallery;