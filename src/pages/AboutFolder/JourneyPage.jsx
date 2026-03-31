import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = "https://ltm-frontend-code.onrender.com/api/journey";

const JourneyPage = () => {
  const { type } = useParams();
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: "", description: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(`${API}/${type}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  const handleSubmit = async () => {
    if (!form.date || !form.description) return;

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
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this memory?")) return;

    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchData();
  };

  const handleEdit = (item) => {
    setForm({
      date: item.date.split("T")[0],
      description: item.description
    });
    setEditId(item._id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-rose-50 p-6">

      {/* TITLE */}
      <h1 className="text-3xl text-center text-rose-700 mb-6 capitalize">
        {type} Memories
      </h1>

      {/* ADD BUTTON */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="bg-rose-500 text-white px-6 py-2 rounded-full"
        >
          + Add Memory
        </button>
      </div>

      {/* 🖼️ FRAME WALL */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {data.map((item, i) => (
          <div
            key={item._id}
            className={`bg-white p-4 rounded-xl shadow transform ${
              i % 2 === 0 ? "rotate-1" : "-rotate-1"
            } hover:rotate-0 transition`}
          >
            <div className="border-4 border-rose-100 p-3 rounded">

              <p className="text-xs text-gray-400 text-center">
                {new Date(item.date).toDateString()}
              </p>

              <p className="text-gray-700 mt-2 text-center">
                {item.description}
              </p>

            </div>

            <div className="flex justify-center gap-3 mt-3">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

            <h2 className="text-lg text-rose-700 mb-4">
              {editId ? "Edit Memory" : "Add Memory"}
            </h2>

            <input
              type="date"
              className="w-full border p-2 mb-3"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <textarea
              className="w-full border p-2 mb-3"
              placeholder="Write memory..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowForm(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-rose-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default JourneyPage;