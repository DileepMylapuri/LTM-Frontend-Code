import React from "react";
import CreateMemorySection from "../components/CreateMemorySection";
import { useNavigate } from "react-router-dom";

const CreateMemoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-rose-500 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <CreateMemorySection
        onSuccess={() => navigate("/gallery")}
      />

    </div>
  );
};

export default CreateMemoryPage;