import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null); // null = loading

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return setAuthorized(false);

        await axios.get(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAuthorized(true);
      } catch {
        setAuthorized(false);
      }
    };

    verifyUser();
  }, []);

  if (authorized === null) return <p className="text-center mt-10">Checking session...</p>;

  if (!authorized) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;