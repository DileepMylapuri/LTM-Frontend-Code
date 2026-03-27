import React, { useState } from "react";
import axios from "axios";
import { FolderPlus, UploadCloud, X } from "lucide-react";
import API_BASE from "../config/api";

const CreateMemorySection = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleUpload = async () => {
    if (!title || files.length === 0) {
      alert("Please enter category title and select files.");
      return;
  }
    // Debug: Ensure token exists
    if (!token) {
      alert("Authentication token missing. Please log in again.");
      return;
    }

    try {
      setLoading(true); 
      const data = new FormData();
      data.append("title", title);
      data.append("date", date);

      files.forEach((file) => {
        data.append("files", file);
      });

      await axios.post(`${API_BASE}/memory`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        }
      });
      alert("Memory category created successfully!");
      setTitle("");
      setDate("");
      setFiles([]);
      onSuccess && onSuccess(); // refresh dashboard stats

    } catch (err) {
      console.log("Upload Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create memory category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mt-10">

      <div className="flex items-center gap-2 mb-6">
        <FolderPlus className="text-rose-500" />
        <h2 className="text-xl font-semibold">Create New Memory Category</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input type="text" placeholder="Category Title (e.g., Dileep Birthday)" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none"/>
      </div>

      <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
        <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-600">
          <UploadCloud size={32} />
          <span className="text-sm">Click to upload Images or Videos</span>
          <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileChange}/>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative">
              {file.type.startsWith("image") ? (
                <img src={URL.createObjectURL(file)} alt="preview" className="rounded-lg object-cover h-24 w-full" />
              ) : (
                <video src={URL.createObjectURL(file)} className="rounded-lg h-24 w-full object-cover"/>)}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button onClick={handleUpload} disabled={loading}
        className="mt-6 bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition disabled:opacity-50">
        {loading ? "Uploading..." : "Upload Memory"}
      </button>

    </div>
  );
};

export default CreateMemorySection;