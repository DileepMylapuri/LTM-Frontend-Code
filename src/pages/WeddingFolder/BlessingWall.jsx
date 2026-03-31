import React, { useState } from "react";
import { Send, Heart, Sparkles, MessageCircle, Star } from "lucide-react";
import { DividerRow } from "./Shared";

export default function BlessingWall({ anim, bind }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [blessings, setBlessings] = useState([
    { name: "Rahul & Sneha", msg: "May your journey be filled with endless laughter and love!", time: "2 mins ago" },
    { name: "Uncle Prasad", msg: "A beautiful start to a magnificent life together. God bless!", time: "1 hour ago" }
  ]);

  const addBlessing = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const newEntry = { name, msg: message, time: "Just now" };
    setBlessings([newEntry, ...blessings]);
    setName("");
    setMessage("");
  };

  return (
    <section ref={bind("blessing-wall")} style={{ 
      padding: "110px 24px", 
      background: "linear-gradient(180deg, #fff 0%, #fff9f0 100%)",
      position: "relative" 
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        {/* Header */}
        <div {...anim("blessing-wall", "anim-up")} style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="sec-tag">The Guestbook</span>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(45px, 8vw, 75px)", color: "#b45309" }}>
            Shower Your Blessings
          </h2>
          <p style={{ fontStyle: "italic", color: "#6b7280", marginTop: 10 }}>
            As Venkatesu & Nandini begin their new life, leave a word of love.
          </p>
          <DividerRow color="#f59e0b" />
        </div>

        <div className="blessing-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          
          {/* Form Side */}
          <div {...anim("blessing-wall", "anim-left", 0.2)} style={{
            background: "#fff", padding: "40px", borderRadius: 24,
            boxShadow: "0 20px 50px rgba(180, 83, 9, 0.1)",
            border: "1px solid #fef3c7"
          }}>
            <h3 style={{ marginBottom: 25, fontFamily: "'Cormorant Upright', serif", fontSize: 24, color: "#1a237e" }}>
              Send a Virtual Blessing
            </h3>
            <form onSubmit={addBlessing}>
              <div style={{ marginBottom: 20 }}>
                <input 
                  type="text" placeholder="Your Name" value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid #e5e7eb", outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <textarea 
                  placeholder="Your message for the newlyweds..." value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid #e5e7eb", outline: "none", resize: "none" }}
                />
              </div>
              <button type="submit" style={{
                width: "100%", padding: "16px", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff",
                fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10
              }}>
                Post Blessing <Send size={18} />
              </button>
            </form>
          </div>

          {/* List Side */}
          <div {...anim("blessing-wall", "anim-right", 0.4)} style={{ 
            maxHeight: 500, overflowY: "auto", paddingRight: 10, display: "flex", flexDirection: "column", gap: 20 
          }}>
            {blessings.map((b, i) => (
              <div key={i} style={{
                background: "#fff", padding: "20px", borderRadius: 16,
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)", borderLeft: "4px solid #f59e0b"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontWeight: "bold", color: "#1a237e" }}>{b.name}</span>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{b.time}</span>
                </div>
                <p style={{ fontSize: 14, color: "#4b5563", fontStyle: "italic" }}>"{b.msg}"</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}