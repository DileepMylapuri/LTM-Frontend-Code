import React, { useEffect, useState, useRef } from "react";
import { Heart, Star } from "lucide-react";

export function useReveal() {
  const [vis, setVis] = useState({});
  const refs = useRef({});
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVis(v => ({ ...v, [e.target.dataset.sec]: true }));
      }),
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const bind = (id) => (el) => {
    if (el) { el.dataset.sec = id; refs.current[id] = el; }
  };
  return { vis, bind };
}

export const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i, l: ((i * 37 + 13) % 100), t: ((i * 53 + 7) % 100),
  s: 1 + (i % 3) * 0.8, dur: 2 + (i % 5), del: (i % 7) * 0.7,
}));

export const DividerRow = ({ color = "#7c3aed" }) => (
  <div style={{ display:"flex", alignItems:"center", gap:14, justifyContent:"center", margin:"20px 0" }}>
    <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${color}60)` }} />
    <Heart size={14} color={color} fill={color} />
    <Star size={14} color="#f59e0b" fill="#f59e0b" />
    <Heart size={14} color={color} fill={color} />
    <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${color}60,transparent)` }} />
  </div>
);