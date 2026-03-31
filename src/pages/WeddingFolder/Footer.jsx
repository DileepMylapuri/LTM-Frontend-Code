import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      padding: "90px 24px", textAlign: "center", background: "linear-gradient(135deg,#0d1b6e,#c62828)", color: "#fff"
    }}>
      <Heart size={44} color="#f9a8d4" fill="#f9a8d4" style={{ margin: "0 auto 20px" }} />
      <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 60, color: "#fde68a" }}>Venkatesu & Nandini</h2>
      <p style={{ marginTop: 20, letterSpacing: 2, opacity: 0.8 }}>06 · MARCH · 2026</p>
      <p style={{ fontSize: 12, opacity: 0.5, marginTop: 40 }}>MADE WITH LOVE</p>
    </footer>
  );
}