import React from "react";
import { Heart } from "lucide-react";
import { STARS } from "./Shared";

export default function Hero() {
  return (
    <section className="p-10" style={{
      minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", background: "linear-gradient(135deg,#0d1b6e 0%,#1a237e 20%,#3949ab 40%,#6a1b9a 60%,#ad1457 80%,#c62828 100%)",
      backgroundSize: "400% 400%", animation: "hue 14s ease infinite",
    }}>
      {STARS.map(st => (
        <div key={st.id} style={{
          position: "absolute", left: `${st.l}%`, top: `${st.t}%`, width: st.s, height: st.s,
          borderRadius: "50%", background: "white", animation: `twinkle ${st.dur}s ${st.del}s infinite ease-in-out`,
        }} />
      ))}
      <div style={{ position: "relative", zIndex: 10, width: "92%", maxWidth: 680, textAlign: "center", animation: "float 7s ease-in-out infinite" }}>
        <div className="hero-inner" style={{
          background: "rgba(255,255,255,.08)", backdropFilter: "blur(24px)", borderRadius: 14, padding: "64px 52px",
          border: "1px solid rgba(255,255,255,.22)", boxShadow: "0 40px 120px rgba(0,0,0,.4)",
        }}>
          <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 88, background: "linear-gradient(160deg,#fef9c3,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Venkatesu</h1>
          <div style={{ display: "flex", justifyContent: "center", margin: "6px 0", animation: "heartbeat 2.8s ease-in-out infinite" }}>
            <Heart size={32} color="#f9a8d4" fill="#f9a8d4" />
          </div>
          <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 88, background: "linear-gradient(160deg,#fce7f3,#e91e8c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Nandini</h1>
          <div style={{ width: 180, height: 3, background: "linear-gradient(90deg,transparent,#f59e0b,#e91e8c,#7c3aed,#4fc3f7,transparent)", margin: "0 auto 28px" }} />
          <div style={{ display: "inline-block", padding: "12px 40px", border: "1px solid rgba(245,158,11,.5)", borderRadius: 50, color: "#fde68a" }}>06 · MARCH · 2026</div>
        </div>
      </div>
    </section>
  );
}