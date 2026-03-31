import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function Couple({ anim, bind }) {
  return (
    <section ref={bind("couple")} style={{
      padding: "110px 24px", background: "#fff", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg,#f59e0b,#e91e8c,#7c3aed,#1a237e)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div {...anim("couple", "anim-up")} style={{ textAlign: "center", marginBottom: 72 }}>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 76 }}>A New Beginning</h2>
        </div>
        <div className="couple-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, alignItems: "center" }}>
          <div {...anim("couple", "anim-left", 0.2)}>
            <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1600" alt="Couple" style={{ width: "100%", height: 490, objectFit: "cover", borderRadius: 14, boxShadow: "0 30px 80px rgba(0,0,0,0.1)" }} />
          </div>
          <div {...anim("couple", "anim-right", 0.3)}>
             <p style={{ fontSize: 18, lineHeight: 1.8, fontStyle: "italic", borderLeft: "4px solid #7c3aed", paddingLeft: 20 }}>
                With hearts overflowing with gratitude, we celebrate the union of two extraordinary souls.
             </p>
             <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 30 }}>
                {[
                  { Icon: Calendar, label: "Date", val: "06 Mar 2026", bg: "#f0f4ff", c: "#1a237e" },
                  { Icon: Clock, label: "Time", val: "4:30 – 6 AM", bg: "#fdf2f8", c: "#d81b60" },
                  { Icon: MapPin, label: "Venue", val: "GT Kandriga", bg: "#fffbf0", c: "#b45309" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "12px 20px", borderRadius: 12, background: item.bg, display: "flex", alignItems: "center", gap: 10 }}>
                    <item.Icon size={16} color={item.c} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: item.c }}>{item.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}