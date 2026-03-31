import React from "react";
import { Sun, Sparkles, Users, Music } from "lucide-react";

export default function Timeline({ anim, bind }) {
  const EVENTS = [
    { Icon: Sun, time: "4:30 AM", title: "Muhurtham Begins", c: "#1a237e" },
    { Icon: Sparkles, time: "5:00 AM", title: "Wedding Rituals", c: "#7c3aed" },
    { Icon: Users, time: "5:30 AM", title: "Family Blessings", c: "#d81b60" },
    { Icon: Music, time: "6:00 AM", title: "Grand Reception", c: "#f59e0b" },
  ];

  return (
    <section ref={bind("timeline")} style={{ padding: "110px 24px", background: "#f8f5ff" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div {...anim("timeline", "anim-up")} style={{ textAlign: "center", marginBottom: 72 }}>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 76 }}>Wedding Timeline</h2>
        </div>
        <div style={{ position: "relative", paddingLeft: 40 }}>
          <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 4, background: "#ccc" }} />
          {EVENTS.map((ev, i) => (
            <div key={i} {...anim("timeline", "anim-left", i * 0.1)} style={{ marginBottom: 40, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: ev.c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                <ev.Icon size={20} />
              </div>
              <div style={{ background: "#fff", padding: "20px", borderRadius: 12, flex: 1, boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                <strong style={{ color: ev.c }}>{ev.time}</strong>
                <h3 style={{ margin: "5px 0" }}>{ev.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}