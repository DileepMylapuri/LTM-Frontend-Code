import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function Details({ anim, bind }) {
  const INFO = [
    { Icon: Calendar, label: "Date", main: "06 March 2026", sub: "Thursday", top: "#f59e0b" },
    { Icon: Clock, label: "Muhurtham", main: "4:30 – 6:00 AM", sub: "Auspicious Morning", top: "#e91e8c" },
    { Icon: MapPin, label: "Venue", main: "PRC Convention Hall", sub: "GT Kandriga", top: "#7c3aed" },
  ];

  return (
    <section ref={bind("details")} style={{
      padding: "110px 24px", background: "linear-gradient(135deg,#0d1b6e,#4a0082)", color: "#fff"
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div {...anim("details", "anim-up")} style={{ textAlign: "center", marginBottom: 72 }}>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 76, color: "#fde68a" }}>Wedding Details</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}>
          {INFO.map((item, i) => (
            <div key={i} {...anim("details", "anim-up", i * 0.15)} style={{
              background: "rgba(255,255,255,0.1)", padding: "40px", borderRadius: 18, borderTop: `4px solid ${item.top}`, textAlign: "center"
            }}>
              <item.Icon color={item.top} size={32} style={{ marginBottom: 15 }} />
              <div style={{ fontSize: 20, fontWeight: "bold" }}>{item.main}</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}