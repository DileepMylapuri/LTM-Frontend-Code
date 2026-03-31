import React from "react";
import { Heart, Sun, Sparkles, Star, Music, Gift } from "lucide-react";
import { DividerRow } from "./Shared";

const WISHES = [
  { Icon: Heart,    c1:"#7c3aed", c2:"#ede9fe", title:"A Love That Lasts Forever",  text:"May your love deepen with every sunrise you share." },
  { Icon: Sun,      c1:"#d81b60", c2:"#fce7f3", title:"Boundless Joy & Happiness",  text:"May your home echo with warm laughter and peace." },
  { Icon: Sparkles, c1:"#f59e0b", c2:"#fef3c7", title:"Prosperity & Abundance",     text:"May every dream you whisper together bloom into reality." },
  { Icon: Star,     c1:"#0891b2", c2:"#e0f2fe", title:"Peace & Harmony Always",     text:"May your union be your sanctuary in every storm." },
  { Icon: Music,    c1:"#059669", c2:"#d1fae5", title:"Joy in Every Moment",        text:"May each day be filled with the music of laughter." },
  { Icon: Gift,     c1:"#dc2626", c2:"#fee2e2", title:"A Glorious New Chapter",     text:"May every page of your story be filled with wonder." },
];

export default function Wishes({ anim, bind }) {
  return (
    <section ref={bind("wishes")} style={{ padding: "110px 24px", background: "#f8f5ff" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div {...anim("wishes", "anim-up")} style={{ textAlign: "center", marginBottom: 72 }}>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 76 }}>Our Heartfelt Wishes</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}>
          {WISHES.map((w, i) => (
            <div key={i} {...anim("wishes", "anim-up", i * 0.1)} style={{ background: "#fff", padding: "40px 30px", borderRadius: 20, borderTop: `4px solid ${w.c1}`, boxShadow: "0 8px 40px rgba(0,0,0,.05)" }}>
              <w.Icon color={w.c1} size={28} />
              <h3 style={{ color: w.c1, margin: "15px 0" }}>{w.title}</h3>
              <p style={{ color: "#6b7280", fontStyle: "italic" }}>{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}