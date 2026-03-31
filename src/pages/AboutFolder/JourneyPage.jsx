import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = `${import.meta.env.VITE_API_URL}/journey`;

const JourneyPage = () => {
  const { type } = useParams();
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: "", description: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    try {
      if (!type) return;

      const res = await axios.get(`${API}/${type}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setData(res.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };


  const handleSubmit = async () => {
    if (!form.date || !form.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        if (!window.confirm("Update this memory?")) return;

        await axios.put(`${API}/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(
          API,
          { ...form, type },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setForm({ date: "", description: "" });
      setEditId(null);
      setShowForm(false);
      fetchData();

    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete this memory?")) return;

      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchData();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      date: item?.date ? item.date.split("T")[0] : "",
      description: item?.description || ""
    });

    setEditId(item._id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-rose-50 p-6">
      <h1 className="text-3xl text-center text-rose-700 mb-6 capitalize">{type || "Journey"} Memories</h1>

      <div className="text-center mb-8">
        <button onClick={() => setShowForm(true)} className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600">+ Add Memory</button>
      </div>

      {data.length === 0 && (
        <p className="text-center text-gray-400 mb-6">No memories yet. Click "Add Memory" to start</p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {data.map((item, i) => (
          <div key={item._id} className={`bg-white p-4 rounded-xl shadow transform ${i % 2 === 0 ? "rotate-1" : "-rotate-1"} hover:rotate-0 transition duration-300`}>
            <div className="border-4 border-rose-100 p-3 rounded">
              <p className="text-xs text-gray-400 text-center">{item?.date ? new Date(item.date).toDateString() : "No date"}</p>
              <p className="text-gray-700 mt-2 text-center">{item?.description}</p>
            </div>

            <div className="flex justify-center gap-3 mt-3">
              <button onClick={() => handleEdit(item)} className="text-blue-500 text-sm">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="text-red-500 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-lg text-rose-700 mb-4">{editId ? "Edit Memory" : "Add Memory"}</h2>
            <input type="date" className="w-full border p-2 mb-3 rounded" value={form.date} 
            onChange={(e) => setForm({ ...form, date: e.target.value })}/>
            <textarea className="w-full border p-2 mb-3 rounded" placeholder="Write memory..." value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}/>

            <div className="flex justify-end gap-2">
              <button onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleSubmit} className="bg-rose-500 text-white px-4 py-2 rounded">{editId ? "Update" : "Save"}</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default JourneyPage;