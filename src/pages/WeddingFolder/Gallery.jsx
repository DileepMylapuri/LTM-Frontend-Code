import React from "react";

export default function Gallery({ anim, bind }) {
  const IMGS = [
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc", span: 2 },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a", span: 1 },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552", span: 1 },
    { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92", span: 1 },
    { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf", span: 2 },
  ];

  return (
    <section ref={bind("gallery")} style={{ padding: "110px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div {...anim("gallery", "anim-up")} style={{ textAlign: "center", marginBottom: 72 }}>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 76 }}>Moments to Remember</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {IMGS.map((img, i) => (
            <div key={i} {...anim("gallery", "anim-up", i * 0.1)} style={{ gridColumn: `span ${img.span}`, overflow: "hidden", borderRadius: 12 }}>
              <img src={img.src} alt="" style={{ width: "100%", height: 300, objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}