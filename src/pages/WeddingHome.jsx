// import { useState, useEffect, useRef, useCallback } from "react";
// import Navbar from "./HomeFolder/Navbar";

// import { useEffect, useRef, useState } from "react";

// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Satisfy&family=DM+Sans:wght@300;400;500&display=swap');

//   html { scroll-behavior: smooth; }
//   body { overflow-x: hidden; }

//   .heart-float {
//     position: fixed; bottom: -60px; pointer-events: none;
//     z-index: 20; user-select: none;
//     animation: floatUp linear infinite;
//   }
//   @keyframes floatUp {
//     0%   { transform: translateY(0) rotate(0deg);      opacity: .9; }
//     100% { transform: translateY(-115vh) rotate(22deg); opacity: 0;  }
//   }

//   .confetti-piece {
//     position: fixed; top: -24px; pointer-events: none; z-index: 200;
//     animation: confettiFall linear forwards;
//   }
//   @keyframes confettiFall {
//     0%   { transform: translateY(0) rotate(0deg);      opacity: 1; }
//     100% { transform: translateY(108vh) rotate(720deg); opacity: 0; }
//   }

//   .spark-dot {
//     position: absolute; width: 9px; height: 9px; border-radius: 50%;
//     animation: sparkOut .85s ease-out forwards;
//   }
//   @keyframes sparkOut {
//     0%   { transform: translate(0,0) scale(1); opacity: 1; }
//     100% { transform: translate(var(--tx),var(--ty)) scale(0); opacity: 0; }
//   }

//   .ring-gem { position: absolute; width: 54px; height: 54px; border-radius: 50%; border: 3px solid; }
//   .ring-gem.left  { border-color: #fda4af; left: 0;    animation: ringSway 3s ease-in-out infinite; }
//   .ring-gem.right { border-color: #d97706; left: 36px; animation: ringSway 3s ease-in-out infinite reverse; }
//   @keyframes ringSway { 0%,100%{transform:rotate(-7deg);} 50%{transform:rotate(7deg);} }

//   .tl-bar {
//     position: absolute; left: 50%; transform: translateX(-50%);
//     top: 0; bottom: 0; width: 2px;
//     background: linear-gradient(to bottom,#f43f5e,#d97706,#f43f5e);
//   }
//   @media(max-width:640px){ .tl-bar{left:20px;transform:none;} }

//   .sr { opacity:0; transform:translateY(36px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1); }
//   .sr.on { opacity:1; transform:translateY(0); }

//   .nav-lnk::after { content:''; display:block; height:1px; width:0; background:#fda4af; transition:width .3s; margin-top:2px; }
//   .nav-lnk:hover::after { width:100%; }

//   .shimmer-text {
//     background: linear-gradient(90deg,#f43f5e,#d97706,#fda4af,#f43f5e);
//     background-size: 300% 300%;
//     -webkit-background-clip: text; background-clip: text;
//     -webkit-text-fill-color: transparent;
//     animation: shimmerBg 4s ease infinite;
//   }
//   @keyframes shimmerBg { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }

//   .glow-dot { animation: glowPulse 2.2s ease-in-out infinite; }
//   @keyframes glowPulse { 0%,100%{box-shadow:0 0 0 5px rgba(244,63,94,.2);} 50%{box-shadow:0 0 0 14px rgba(244,63,94,.05);} }

//   .heartbeat { animation: heartbeat 1.8s ease-in-out infinite; }
//   @keyframes heartbeat { 0%,100%{transform:scale(1);} 50%{transform:scale(1.09);} }

//   .cd-1{animation:softPulse 2.2s 0s   ease-in-out infinite;}
//   .cd-2{animation:softPulse 2.2s .2s  ease-in-out infinite;}
//   .cd-3{animation:softPulse 2.2s .4s  ease-in-out infinite;}
//   .cd-4{animation:softPulse 2.2s .6s  ease-in-out infinite;}
//   @keyframes softPulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.026);} }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
//   .fu1{opacity:0;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .3s  forwards;}
//   .fu2{opacity:0;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .5s  forwards;}
//   .fu3{opacity:0;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .7s  forwards;}
//   .fu4{opacity:0;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .85s forwards;}
//   .fu5{opacity:0;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) 1s   forwards;}
//   .fu6{opacity:0;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) 1.1s forwards;}
//   .fu7{opacity:0;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) 1.25s forwards;}
//   .fu8{opacity:0;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) 1.4s forwards;}
// `;

// /* Font style helpers (applied via style prop) */
// const ff = {
//   playfair:  { fontFamily:"'Playfair Display',serif" },
//   cormorant: { fontFamily:"'Cormorant Garamond',serif" },
//   satisfy:   { fontFamily:"'Satisfy',cursive" },
//   dm:        { fontFamily:"'DM Sans',sans-serif" },
// };

// const EMOS        = ["💕","💖","💗","💝","🌸","✨","💫","🌹","🎀"];
// const CONF_COLORS = ["#fda4af","#fbbf24","#a78bfa","#34d399","#fb7185","#60a5fa","#fde68a","#f9a8d4"];
// const SPARK_COLS  = ["#f43f5e","#fda4af","#d97706","#fbbf24","#a78bfa"];


// /* ════════════════════════════════════════════════════════════════════════════
//    HERO   layout: flex flex-col items-center justify-center
// ════════════════════════════════════════════════════════════════════════════ */
// function Hero({ onSparkle, onConfetti }) {
//   return (
//     <section id="hero"
//       className="relative min-h-screen pt-20 px-4 overflow-hidden cursor-pointer
//                  flex flex-col items-center justify-center text-center"
//       style={{ background:"linear-gradient(135deg,#1c0514 0%,#3b1228 40%,#5e1a3a 70%,#8b1a4a 100%)" }}
//       onClick={onSparkle}>

//       {/* Glow blobs */}
//       <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-rose-500 opacity-10 blur-3xl pointer-events-none" />
//       <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-amber-400 opacity-10 blur-3xl pointer-events-none" />

//       {/* Rings */}
//       <div className="fu1 relative w-24 h-14 mx-auto mb-8">
//         <div className="ring-gem left" /><div className="ring-gem right" />
//       </div>

//       <p className="fu2 mb-3"
//          style={{ ...ff.satisfy, color:"#fda4af", fontSize:18, letterSpacing:"0.3em" }}>
//         With hearts full of joy, we announce
//       </p>

//       <h1 className="fu3 leading-none"
//           style={{ ...ff.playfair, fontWeight:700, color:"#fff",
//                    fontSize:"clamp(60px,12vw,130px)",
//                    textShadow:"0 4px 40px rgba(244,63,94,.45)" }}>
//         Arjun
//       </h1>
//       <p className="fu4 mt-2"
//          style={{ ...ff.satisfy, color:"#fda4af", fontSize:"clamp(36px,8vw,72px)" }}>
//         &amp; Meera
//       </p>

//       {/* Divider — Flexbox row */}
//       <div className="fu5 flex flex-row items-center gap-3 my-6">
//         <div className="h-px w-16 sm:w-28" style={{ background:"linear-gradient(to right,transparent,#fda4af)" }} />
//         <span className="heartbeat text-2xl">💍</span>
//         <div className="h-px w-16 sm:w-28" style={{ background:"linear-gradient(to left,transparent,#fda4af)" }} />
//       </div>

//       <p className="fu6 max-w-md leading-relaxed"
//          style={{ ...ff.cormorant, fontStyle:"italic", color:"rgba(253,164,175,0.9)",
//                   fontSize:"clamp(17px,2.5vw,22px)" }}>
//         Two souls, one beautiful journey — a love that is timeless, tender, and forever true.
//       </p>

//       <p className="fu7 mt-4"
//          style={{ ...ff.dm, fontSize:11, letterSpacing:"0.35em",
//                   color:"#fda4af", textTransform:"uppercase" }}>
//         December 20, 2025 &nbsp;·&nbsp; Hyderabad, India
//       </p>

//       {/* CTA buttons — Flexbox row */}
//       <div className="fu8 flex flex-row flex-wrap items-center justify-center gap-4 mt-10">
//         <button onClick={e => { e.stopPropagation(); onConfetti(); }}
//                 className="px-8 py-3 rounded-full text-white hover:scale-105 active:scale-95 transition-all duration-200"
//                 style={{ ...ff.dm, fontSize:13, letterSpacing:"0.2em", textTransform:"uppercase",
//                          background:"linear-gradient(135deg,#e11d48,#9f1239)",
//                          boxShadow:"0 8px 32px rgba(225,29,72,0.55)" }}>
//           🎊 Celebrate!
//         </button>
//         <a href="#wishes"
//            className="px-8 py-3 rounded-full text-rose-200 border border-rose-400/40
//                       hover:bg-rose-400/10 hover:scale-105 transition-all duration-200"
//            style={{ ...ff.dm, fontSize:13, letterSpacing:"0.2em", textTransform:"uppercase" }}>
//           💌 Send Wishes
//         </a>
//       </div>

//       {/* Scroll cue */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2
//                       flex flex-col items-center gap-2 opacity-50 heartbeat"
//            style={{ color:"#fda4af" }}>
//         <span style={{ ...ff.dm, fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase" }}>Scroll</span>
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M12 5v14M5 12l7 7 7-7"/>
//         </svg>
//       </div>
//     </section>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════════
//    COUNTDOWN   layout: CSS Grid grid-cols-2 sm:grid-cols-4
// ════════════════════════════════════════════════════════════════════════════ */
// function Countdown() {
//   const [t, setT] = useState({ d:"--", h:"--", m:"--", s:"--" });
//   useEffect(() => {
//     const target = new Date("2025-12-20T11:00:00");
//     const pad = n => String(Math.floor(n)).padStart(2,"0");
//     const tick = () => {
//       const diff = target - Date.now();
//       if (diff <= 0) { setT({ d:"🎉",h:"🎉",m:"🎉",s:"🎉" }); return; }
//       setT({ d:pad(diff/86400000), h:pad((diff%86400000)/3600000),
//              m:pad((diff%3600000)/60000), s:pad((diff%60000)/1000) });
//     };
//     tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id);
//   },[]);

//   const CARDS = [
//     { v:t.d, label:"Days",    cls:"cd-1", delay:".1s" },
//     { v:t.h, label:"Hours",   cls:"cd-2", delay:".2s" },
//     { v:t.m, label:"Minutes", cls:"cd-3", delay:".3s" },
//     { v:t.s, label:"Seconds", cls:"cd-4", delay:".4s" },
//   ];

//   return (
//     <section className="py-20 px-4 relative overflow-hidden"
//              style={{ background:"linear-gradient(135deg,#fff1f2,#fff9f0)" }}>
//       <div className="absolute inset-0 flex items-center justify-center
//                       pointer-events-none select-none opacity-[.04] text-[220px]">💍</div>
//       <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
//         <p className="sr mb-2" style={{ ...ff.satisfy, color:"#e11d48", fontSize:18 }}>
//           Counting Every Heartbeat
//         </p>
//         <h2 className="sr mb-12"
//             style={{ ...ff.playfair, fontStyle:"italic", color:"#1c0514",
//                      fontSize:"clamp(32px,5vw,52px)", transitionDelay:".1s" }}>
//           The Big Day Is Near
//         </h2>

//         {/* CSS Grid 2→4 cols */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
//           {CARDS.map(({ v, label, cls, delay }) => (
//             <div key={label}
//                  className={`${cls} sr bg-white rounded-2xl px-6 py-8 shadow-xl border border-rose-100
//                               flex flex-col items-center justify-center`}
//                  style={{ transitionDelay:delay }}>
//               <span style={{ ...ff.playfair, fontWeight:700, color:"#e11d48",
//                              fontSize:"clamp(40px,6vw,56px)", lineHeight:1 }}>{v}</span>
//               <span style={{ ...ff.dm, fontSize:10, letterSpacing:"0.3em",
//                              color:"#9f1239", textTransform:"uppercase", marginTop:8 }}>{label}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════════
//    PERSONAL MESSAGE   layout: flex flex-col items-center text-center
// ════════════════════════════════════════════════════════════════════════════ */
// function PersonalMessage() {
//   return (
//     <section className="py-20 px-4"
//              style={{ background:"linear-gradient(135deg,#1c0514 0%,#3b1228 60%,#5e1a3a 100%)" }}>
//       <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
//         <p className="sr mb-3" style={{ ...ff.satisfy, color:"#fda4af", fontSize:18 }}>
//           A Message From the Heart
//         </p>
//         <h2 className="sr mb-10"
//             style={{ ...ff.playfair, fontStyle:"italic", color:"#fff",
//                      fontSize:"clamp(32px,5vw,52px)", transitionDelay:".1s" }}>
//           Dear Bhaiya 💖
//         </h2>
//         {/* Glass card — Flex column */}
//         <div className="sr w-full rounded-3xl border border-white/10 bg-white/5
//                         backdrop-blur-sm p-8 sm:p-12 flex flex-col items-center gap-6"
//              style={{ transitionDelay:".2s" }}>
//           <p style={{ ...ff.cormorant, fontStyle:"italic", color:"rgba(253,164,175,0.9)",
//                       fontSize:"clamp(18px,2.5vw,24px)", lineHeight:1.75 }}>
//             "Watching you find your perfect partner has been one of the greatest joys of my life.
//              You deserve every ounce of happiness coming your way. As you begin this beautiful new chapter,
//              know that I could not be prouder to call you my brother."
//           </p>
//           <div className="h-px w-24"
//                style={{ background:"linear-gradient(to right,transparent,#fda4af,transparent)" }}/>
//           <p style={{ ...ff.playfair, fontStyle:"italic", color:"#fda4af", fontSize:20 }}>
//             May your love story be the most beautiful one ever told. 🌹
//           </p>
//           <p style={{ ...ff.dm, fontSize:11, letterSpacing:"0.25em",
//                       color:"#9f1239", textTransform:"uppercase" }}>
//             — With all my love, Your sibling ✨
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════════
//    LOVE STORY TIMELINE   layout: CSS Grid grid-cols-[1fr_48px_1fr]
// ════════════════════════════════════════════════════════════════════════════ */
// const TL_DATA = [
//   { year:"2019", icon:"☕", title:"First Meeting",       text:"A chance encounter over coffee that changed everything. Two strangers who instantly felt like old friends." },
//   { year:"2020", icon:"📖", title:"Falling in Love",     text:"Through long calls and shared dreams, they discovered a love deeper than either had imagined." },
//   { year:"2022", icon:"✈️", title:"Adventures Together", text:"Side by side they explored new horizons, building a lifetime of stories on every road." },
//   { year:"2024", icon:"💍", title:"The Proposal",        text:"Under a sky full of stars, he asked the question that made her world complete." },
//   { year:"2025", icon:"💒", title:"Forever Begins",      text:"Now they take the most beautiful step — becoming each other's forever. ❤️" },
// ];

// function TlContent({ item, align }) {
//   return (
//     <div className={align === "right" ? "text-right" : "text-left"}>
//       <span style={{ ...ff.dm, fontSize:10, letterSpacing:"0.3em",
//                      color:"#fda4af", textTransform:"uppercase" }}>
//         {item.year}
//       </span>
//       <h3 style={{ ...ff.playfair, fontStyle:"italic", color:"#1c0514", fontSize:20 }}
//           className="mt-1 mb-1">{item.title}</h3>
//       <p style={{ ...ff.cormorant, color:"#6b7280", fontSize:16, lineHeight:1.7 }}>{item.text}</p>
//     </div>
//   );
// }

// function LoveStory() {
//   return (
//     <section id="story" className="py-20 px-4 bg-rose-50">
//       <div className="max-w-4xl mx-auto">
//         <p className="sr text-center mb-2" style={{ ...ff.satisfy, color:"#e11d48", fontSize:18 }}>
//           Their Beautiful Journey
//         </p>
//         <h2 className="sr text-center mb-16"
//             style={{ ...ff.playfair, fontStyle:"italic", color:"#1c0514",
//                      fontSize:"clamp(32px,5vw,52px)", transitionDelay:".1s" }}>
//           A Love Story
//         </h2>
//         <div className="relative">
//           <div className="tl-bar" />
//           {TL_DATA.map((item, i) => {
//             const isEven = i % 2 === 0;
//             return (
//               <div key={i}
//                    className="sr grid items-start gap-x-6 mb-12"
//                    style={{ gridTemplateColumns:"1fr 48px 1fr", transitionDelay:`${i*.12+.1}s` }}>
//                 {/* Left slot */}
//                 <div>{isEven ? <TlContent item={item} align="right" /> : null}</div>
//                 {/* Centre dot */}
//                 <div className="flex justify-center">
//                   <div className="glow-dot w-11 h-11 rounded-full flex items-center justify-center text-lg z-10 shadow-lg"
//                        style={{ background:"linear-gradient(135deg,#f43f5e,#9f1239)" }}>
//                     {item.icon}
//                   </div>
//                 </div>
//                 {/* Right slot */}
//                 <div>{!isEven ? <TlContent item={item} align="left" /> : null}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════════
//    EVENT DETAILS   layout: CSS Grid grid-cols-1 md:grid-cols-3
// ════════════════════════════════════════════════════════════════════════════ */
// const EVENTS = [
//   { icon:"🌺", title:"Haldi & Mehendi", desc:"A vibrant celebration of colours, tradition & togetherness",
//     time:"Dec 18 · 4:00 PM", venue:"Botanical Garden Banquet",
//     featured:false, cardCls:"border border-rose-100 bg-gradient-to-br from-rose-50 to-white hover:shadow-rose-200",
//     divBg:"#fda4af", delay:".1s" },
//   { icon:"💍", title:"Wedding Ceremony", desc:"The sacred union of two beautiful souls",
//     time:"Dec 20 · 11:00 AM", venue:"Taj Krishna, Hyderabad",
//     featured:true, cardCls:"", divBg:"rgba(255,255,255,0.3)", delay:".2s" },
//   { icon:"🎊", title:"Sangeet Night", desc:"An electric evening of music, dance & laughter",
//     time:"Dec 19 · 7:00 PM", venue:"Grand Ballroom, ITC Kohenur",
//     featured:false, cardCls:"border border-amber-100 bg-gradient-to-br from-amber-50 to-white hover:shadow-amber-200",
//     divBg:"#fbbf24", delay:".3s" },
// ];

// function EventCard({ ev }) {
//   const base = `group flex flex-col items-center text-center rounded-3xl p-8
//                 hover:-translate-y-2 transition-all duration-300 cursor-default sr`;
//   if (ev.featured) {
//     return (
//       <div className={`${base} text-white relative`}
//            style={{ background:"linear-gradient(135deg,#e11d48,#9f1239)",
//                     boxShadow:"0 16px 48px rgba(225,29,72,0.4)", transitionDelay:ev.delay }}>
//         <span className="absolute top-4 right-4 rounded-full px-3 py-1 bg-white/20"
//               style={{ ...ff.dm, fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase" }}>
//           MAIN EVENT
//         </span>
//         <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-5
//                         bg-white/20 group-hover:scale-110 transition-transform duration-300">
//           {ev.icon}
//         </div>
//         <h3 style={{ ...ff.playfair, fontStyle:"italic", fontSize:24 }} className="mb-2">{ev.title}</h3>
//         <div className="h-px w-12 my-3 bg-white/30" />
//         <p style={{ ...ff.cormorant, fontSize:17, lineHeight:1.7, color:"rgba(255,255,255,0.85)" }} className="mb-3">
//           {ev.desc}
//         </p>
//         <p style={{ ...ff.playfair, fontStyle:"italic", fontSize:18, fontWeight:600 }}>{ev.time}</p>
//         <p style={{ ...ff.dm, fontSize:12, color:"rgba(253,164,175,0.8)", letterSpacing:"0.1em" }} className="mt-1">
//           {ev.venue}
//         </p>
//       </div>
//     );
//   }
//   return (
//     <div className={`${base} hover:shadow-2xl ${ev.cardCls}`} style={{ transitionDelay:ev.delay }}>
//       <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-5
//                       bg-white/60 group-hover:scale-110 transition-transform duration-300">
//         {ev.icon}
//       </div>
//       <h3 style={{ ...ff.playfair, fontStyle:"italic", color:"#1c0514", fontSize:24 }} className="mb-2">
//         {ev.title}
//       </h3>
//       <div className="h-px w-12 my-3" style={{ background:ev.divBg }} />
//       <p style={{ ...ff.cormorant, color:"#6b7280", fontSize:17, lineHeight:1.7 }} className="mb-3">
//         {ev.desc}
//       </p>
//       <p style={{ ...ff.playfair, fontStyle:"italic", color:"#e11d48", fontSize:18, fontWeight:600 }}>
//         {ev.time}
//       </p>
//       <p style={{ ...ff.dm, fontSize:12, color:"#9ca3af", letterSpacing:"0.1em" }} className="mt-1">
//         {ev.venue}
//       </p>
//     </div>
//   );
// }

// function EventDetails() {
//   return (
//     <section id="details" className="py-20 px-4 bg-white">
//       <div className="max-w-5xl mx-auto">
//         <p className="sr text-center mb-2" style={{ ...ff.satisfy, color:"#e11d48", fontSize:18 }}>
//           Save the Date
//         </p>
//         <h2 className="sr text-center mb-16"
//             style={{ ...ff.playfair, fontStyle:"italic", color:"#1c0514",
//                      fontSize:"clamp(32px,5vw,52px)", transitionDelay:".1s" }}>
//           Celebration Details
//         </h2>

//         {/* CSS Grid 1 col → 3 cols on md */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {EVENTS.map(ev => <EventCard key={ev.title} ev={ev} />)}
//         </div>

//         {/* Venue banner — flex column */}
//         <div className="sr mt-10 rounded-3xl border border-rose-100 bg-rose-50 p-8
//                         flex flex-col items-center text-center"
//              style={{ transitionDelay:".4s" }}>
//           <p style={{ ...ff.satisfy, color:"#e11d48", fontSize:16 }} className="mb-2">📍 Venue</p>
//           <p style={{ ...ff.playfair, fontStyle:"italic", color:"#1c0514", fontSize:24 }} className="mb-1">
//             Taj Krishna Hotel, Hyderabad
//           </p>
//           <p style={{ ...ff.dm, fontSize:14, color:"#9ca3af", letterSpacing:"0.05em" }}>
//             Road No. 1, Banjara Hills, Hyderabad – 500034, Telangana
//           </p>
//           <a href="https://maps.google.com" target="_blank" rel="noreferrer"
//              className="inline-flex flex-row items-center gap-2 mt-5 rounded-full px-6 py-2
//                         border border-rose-300 hover:bg-rose-500 hover:text-white transition-all duration-200"
//              style={{ ...ff.dm, fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"#e11d48" }}>
//             📌 View on Map
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════════
//    GALLERY   layout: CSS Grid grid-cols-3 grid-rows-3 + col/row-span
// ════════════════════════════════════════════════════════════════════════════ */
// const TILES = [
//   { emoji:"💑", cls:"col-span-2 row-span-2 text-8xl sm:text-9xl aspect-square", bg:"from-rose-200 to-rose-300" },
//   { emoji:"🌸", cls:"text-5xl", bg:"from-pink-100 to-rose-200"    },
//   { emoji:"💍", cls:"text-5xl", bg:"from-amber-100 to-amber-200"  },
//   { emoji:"🌹", cls:"text-5xl", bg:"from-rose-100 to-pink-200"    },
//   { emoji:"🎶", cls:"text-5xl", bg:"from-violet-100 to-rose-200"  },
//   { emoji:"✨", cls:"text-5xl", bg:"from-amber-100 to-amber-300"  },
// ];

// function Gallery({ onSparkle }) {
//   return (
//     <section id="gallery" className="py-20 px-4"
//              style={{ background:"linear-gradient(135deg,#fff9f0,#fff1f2)" }}>
//       <div className="max-w-4xl mx-auto">
//         <p className="sr text-center mb-2" style={{ ...ff.satisfy, color:"#e11d48", fontSize:18 }}>
//           Captured Moments
//         </p>
//         <h2 className="sr text-center mb-16"
//             style={{ ...ff.playfair, fontStyle:"italic", color:"#1c0514",
//                      fontSize:"clamp(32px,5vw,52px)", transitionDelay:".1s" }}>
//           Moments in Love
//         </h2>

//         {/* CSS Grid with spanning tiles */}
//         <div className="grid grid-cols-3 grid-rows-3 gap-3 sm:gap-4" onClick={onSparkle}>
//           {TILES.map((tile, i) => (
//             <div key={i}
//                  className={`${tile.cls} rounded-2xl sm:rounded-3xl bg-gradient-to-br ${tile.bg}
//                               flex items-center justify-center cursor-pointer
//                               hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 sr`}
//                  style={{ transitionDelay:`${i*.1+.1}s` }}>
//               {tile.emoji}
//             </div>
//           ))}
//         </div>

//         <p className="sr text-center mt-5"
//            style={{ ...ff.dm, fontSize:10, letterSpacing:"0.3em",
//                     color:"#fda4af", textTransform:"uppercase", transitionDelay:".7s" }}>
//           Click any photo to send sparkles of love ✨
//         </p>
//       </div>
//     </section>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════════
//    COUPLE CARDS   layout: CSS Grid grid-cols-1 sm:grid-cols-2
// ════════════════════════════════════════════════════════════════════════════ */
// const COUPLE = [
//   { name:"Arjun Sharma", role:"The Groom", emoji:"👨‍💼",
//     bio:"Software Engineer · Adventurous soul · Cricket lover · Always makes Meera smile 🏏",
//     avBg:"from-rose-200 to-rose-400", roleColor:"#fda4af", divBg:"#fecdd3",
//     cardCls:"border-rose-100 from-rose-50 hover:shadow-rose-200" },
//   { name:"Meera Reddy", role:"The Bride", emoji:"👰",
//     bio:"Doctor · Compassionate heart · Book lover · Arjun's greatest support 📚",
//     avBg:"from-amber-200 to-amber-400", roleColor:"#f59e0b", divBg:"#fde68a",
//     cardCls:"border-amber-100 from-amber-50 hover:shadow-amber-200" },
// ];

// function CoupleCards() {
//   return (
//     <section className="py-20 px-4 bg-white">
//       <div className="max-w-4xl mx-auto">
//         <p className="sr text-center mb-2" style={{ ...ff.satisfy, color:"#e11d48", fontSize:18 }}>
//           Two Becoming One
//         </p>
//         <h2 className="sr text-center mb-16"
//             style={{ ...ff.playfair, fontStyle:"italic", color:"#1c0514",
//                      fontSize:"clamp(32px,5vw,52px)", transitionDelay:".1s" }}>
//           The Happy Couple
//         </h2>

//         {/* CSS Grid 1 → 2 cols */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//           {COUPLE.map((p, i) => (
//             <div key={p.name}
//                  className={`flex flex-col items-center text-center rounded-3xl border p-10
//                               bg-gradient-to-br to-white hover:-translate-y-1 hover:shadow-2xl
//                               transition-all duration-300 sr ${p.cardCls}`}
//                  style={{ transitionDelay:`${i*.1+.1}s` }}>
//               <div className={`w-24 h-24 rounded-full flex items-center justify-center
//                                text-5xl mb-5 shadow-xl bg-gradient-to-br ${p.avBg}`}>
//                 {p.emoji}
//               </div>
//               <h3 style={{ ...ff.playfair, color:"#1c0514", fontSize:28 }} className="mb-1">{p.name}</h3>
//               <p style={{ ...ff.satisfy, color:p.roleColor, fontSize:16 }} className="mb-3">{p.role}</p>
//               <div className="h-px w-16 my-3" style={{ background:p.divBg }} />
//               <p style={{ ...ff.cormorant, color:"#6b7280", fontSize:18, lineHeight:1.7 }}>{p.bio}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════════
//    WISHES   layout: flex flex-col + CSS Grid grid-cols-1 sm:grid-cols-2
// ════════════════════════════════════════════════════════════════════════════ */
// const SEED = [
//   { name:"Mom & Dad", rel:"Parents",    msg:"Our hearts overflow with joy watching you begin this beautiful journey. May God bless you with endless love! 💖" },
//   { name:"Riya",      rel:"Sister",     msg:"Bhaiya, you deserve all the happiness in the world! Welcome to the family, Bhabhi! 🌸" },
//   { name:"Rahul",     rel:"Best Friend",msg:"Finally! Congratulations buddy! May your life together be as amazing as you two are! 🎊" },
// ];

// function WishBubble({ w }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
//       <div className="flex flex-row items-center gap-3">
//         <div className="w-10 h-10 rounded-full flex-shrink-0 bg-rose-500/30
//                         flex items-center justify-center"
//              style={{ ...ff.playfair, color:"#fda4af", fontSize:18, fontWeight:700 }}>
//           {w.name[0]}
//         </div>
//         <div className="flex flex-col">
//           <span style={{ ...ff.playfair, fontStyle:"italic", color:"#fda4af" }}>{w.name}</span>
//           <span style={{ ...ff.dm, fontSize:10, letterSpacing:"0.2em",
//                          color:"#9f1239", textTransform:"uppercase" }}>{w.rel}</span>
//         </div>
//         <span className="ml-auto text-rose-300 text-xl">💕</span>
//       </div>
//       <p style={{ ...ff.cormorant, fontStyle:"italic", color:"rgba(255,255,255,0.75)",
//                   fontSize:18, lineHeight:1.7 }}>
//         "{w.msg}"
//       </p>
//     </div>
//   );
// }

// function Wishes({ onConfetti }) {
//   const [wishes, setWishes] = useState(SEED);
//   const [name, setName] = useState("");
//   const [rel,  setRel]  = useState("");
//   const [msg,  setMsg]  = useState("");

//   const submit = () => {
//     if (!name.trim()||!msg.trim()) { alert("Please add your name and a message 💌"); return; }
//     setWishes(prev => [{ name:name.trim(), rel:rel.trim()||"Guest", msg:msg.trim() }, ...prev]);
//     setName(""); setRel(""); setMsg(""); onConfetti();
//   };

//   const inp = {
//     ...ff.cormorant, fontSize:18, width:"100%",
//     background:"rgba(255,255,255,0.08)",
//     border:"1px solid rgba(253,164,175,0.2)", borderRadius:12,
//     padding:"12px 16px", color:"#fff", outline:"none",
//   };

//   return (
//     <section id="wishes" className="py-20 px-4"
//              style={{ background:"linear-gradient(135deg,#1c0514,#3b1228 60%,#5e1a3a)" }}>
//       <div className="max-w-3xl mx-auto flex flex-col items-center">
//         <p className="sr mb-2" style={{ ...ff.satisfy, color:"#fda4af", fontSize:18 }}>
//           Shower Your Love
//         </p>
//         <h2 className="sr text-center mb-14"
//             style={{ ...ff.playfair, fontStyle:"italic", color:"#fff",
//                      fontSize:"clamp(32px,5vw,52px)", transitionDelay:".1s" }}>
//           Leave a Wish 💌
//         </h2>

//         {/* Input panel — flex column */}
//         <div className="sr w-full rounded-3xl border border-white/10 bg-white/5
//                         backdrop-blur-sm p-6 sm:p-10 mb-10 flex flex-col gap-4"
//              style={{ transitionDelay:".2s" }}>

//           {/* CSS Grid 1→2 cols for name + relation */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <input value={name} onChange={e=>setName(e.target.value)}
//                    placeholder="Your name…" style={inp}
//                    onFocus={e=>e.target.style.borderColor="rgba(253,164,175,0.6)"}
//                    onBlur={e=>e.target.style.borderColor="rgba(253,164,175,0.2)"} />
//             <input value={rel} onChange={e=>setRel(e.target.value)}
//                    placeholder="Relation (e.g. Sister, Friend)…" style={inp}
//                    onFocus={e=>e.target.style.borderColor="rgba(253,164,175,0.6)"}
//                    onBlur={e=>e.target.style.borderColor="rgba(253,164,175,0.2)"} />
//           </div>
//           <textarea value={msg} onChange={e=>setMsg(e.target.value)} rows={4}
//                     placeholder="Write your heartfelt wishes for the couple…"
//                     style={{ ...inp, resize:"none" }}
//                     onFocus={e=>e.target.style.borderColor="rgba(253,164,175,0.6)"}
//                     onBlur={e=>e.target.style.borderColor="rgba(253,164,175,0.2)"} />
//           <button onClick={submit}
//                   className="w-full py-3 rounded-full text-white
//                              hover:scale-[1.02] active:scale-95 transition-all duration-200"
//                   style={{ ...ff.dm, fontSize:13, letterSpacing:"0.2em", textTransform:"uppercase",
//                            background:"linear-gradient(135deg,#e11d48,#9f1239)",
//                            boxShadow:"0 8px 32px rgba(225,29,72,0.45)" }}>
//             💌 Send My Wishes
//           </button>
//         </div>

//         {/* Wishes feed — flex column */}
//         <div className="w-full flex flex-col gap-4">
//           {wishes.map((w,i) => <WishBubble key={i} w={w} />)}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════════
//    FINAL BLESSING   layout: flex flex-col items-center
// ════════════════════════════════════════════════════════════════════════════ */
// function FinalBlessing({ onConfetti }) {
//   return (
//     <section className="py-24 px-4 text-center relative overflow-hidden"
//              style={{ background:"linear-gradient(135deg,#e11d48,#be123c 40%,#9f1239)" }}>
//       <div className="absolute inset-0 pointer-events-none"
//            style={{ background:"radial-gradient(ellipse at center,rgba(255,255,255,0.07) 0%,transparent 65%)" }}/>
//       <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
//         <div className="sr heartbeat text-5xl">💕</div>
//         <h2 className="sr shimmer-text"
//             style={{ ...ff.playfair, fontStyle:"italic", WebkitTextFillColor:"white",
//                      fontSize:"clamp(36px,7vw,80px)", lineHeight:1.2, transitionDelay:".1s" }}>
//           Wishing You Both<br/>A Lifetime of Love
//         </h2>
//         <p className="sr max-w-lg"
//            style={{ ...ff.cormorant, fontStyle:"italic", color:"rgba(255,255,255,0.85)",
//                     fontSize:"clamp(18px,2.5vw,24px)", lineHeight:1.8, transitionDelay:".2s" }}>
//           May every day of your marriage overflow with laughter, warmth, and endless togetherness.
//           Here's to forever, Bhaiya! 🌹
//         </p>

//         {/* Divider — flex row */}
//         <div className="sr flex flex-row items-center gap-4" style={{ transitionDelay:".3s" }}>
//           <div className="h-px w-20"
//                style={{ background:"linear-gradient(to right,transparent,rgba(255,255,255,0.5))" }}/>
//           <span style={{ ...ff.satisfy, color:"#fff", fontSize:22 }}>Love • Trust • Forever</span>
//           <div className="h-px w-20"
//                style={{ background:"linear-gradient(to left,transparent,rgba(255,255,255,0.5))" }}/>
//         </div>

//         <button onClick={onConfetti}
//                 className="sr px-10 py-3 rounded-full bg-white hover:scale-105 active:scale-95
//                            transition-all duration-200 shadow-2xl"
//                 style={{ ...ff.dm, fontSize:13, letterSpacing:"0.2em",
//                          textTransform:"uppercase", color:"#be123c",
//                          fontWeight:600, transitionDelay:".4s" }}>
//           🎉 Celebrate Again!
//         </button>
//       </div>
//     </section>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════════
//    FOOTER   layout: flex flex-col items-center
// ════════════════════════════════════════════════════════════════════════════ */
// function Footer() {
//   return (
//     <footer className="py-10 px-4" style={{ background:"#1c0514" }}>
//       <div className="flex flex-col items-center gap-2 text-center">
//         <span style={{ ...ff.satisfy, color:"#fda4af", fontSize:24 }}>Arjun &amp; Meera</span>
//         <p style={{ ...ff.dm, fontSize:10, letterSpacing:"0.3em",
//                     color:"#9f1239", textTransform:"uppercase" }}>
//           December 20, 2025 · Hyderabad, India
//         </p>
//         <p style={{ ...ff.cormorant, fontStyle:"italic", color:"#6b2737", fontSize:16 }} className="mt-1">
//           Made with 💕 by someone who loves you dearly
//         </p>
//       </div>
//     </footer>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════════
//    ROOT COMPONENT
// ════════════════════════════════════════════════════════════════════════════ */
// export default function WeddingHome() {
//   const heartsRef  = useRef(null);
//   const confRef    = useRef(null);
//   const sparksRef  = useRef(null);

//   /* Inject global @keyframes CSS once */
//   useEffect(() => {
//     if (document.getElementById("wh-css")) return;
//     const tag = document.createElement("style");
//     tag.id = "wh-css";
//     tag.textContent = GLOBAL_CSS;
//     document.head.appendChild(tag);
//   }, []);

//   /* Floating hearts */
//   useEffect(() => {
//     const id = setInterval(() => {
//       if (!heartsRef.current) return;
//       const el = document.createElement("div");
//       el.className = "heart-float";
//       el.textContent = EMOS[Math.floor(Math.random()*EMOS.length)];
//       el.style.cssText = `left:${Math.random()*100}%;font-size:${13+Math.random()*18}px;animation-duration:${5+Math.random()*6}s;`;
//       heartsRef.current.appendChild(el);
//       setTimeout(()=>el?.remove(), 12000);
//     }, 850);
//     return ()=>clearInterval(id);
//   }, []);

//   /* Scroll reveal */
//   useEffect(() => {
//     const obs = new IntersectionObserver(entries => {
//       entries.forEach(e => { if(e.isIntersecting){e.target.classList.add("on");obs.unobserve(e.target);} });
//     }, { threshold:0.1 });
//     document.querySelectorAll(".sr").forEach(el=>obs.observe(el));
//     return ()=>obs.disconnect();
//   }, []);

//   /* Confetti */
//   const launchConfetti = useCallback(() => {
//     if (!confRef.current) return;
//     for (let i=0; i<70; i++) {
//       const el = document.createElement("div");
//       el.className = "confetti-piece";
//       const sz = 6+Math.random()*10;
//       el.style.cssText = `left:${Math.random()*100}%;width:${sz}px;height:${sz}px;
//         background:${CONF_COLORS[i%CONF_COLORS.length]};
//         border-radius:${Math.random()>.5?"50%":"3px"};
//         animation-duration:${2.8+Math.random()*3}s;
//         animation-delay:${Math.random()*1.5}s;`;
//       confRef.current.appendChild(el);
//       setTimeout(()=>el?.remove(), 6500);
//     }
//   }, []);

//   useEffect(()=>{ setTimeout(launchConfetti, 900); },[launchConfetti]);

//   /* Sparkle on click */
//   const clickSparkle = useCallback((e) => {
//     if (!sparksRef.current) return;
//     const wrap = document.createElement("div");
//     wrap.style.cssText = `position:fixed;left:${e.clientX-28}px;top:${e.clientY-28}px;pointer-events:none;z-index:999;`;
//     [0,60,120,180,240,300].forEach((angle,i)=>{
//       const dot = document.createElement("div");
//       dot.className = "spark-dot";
//       const rad=angle*Math.PI/180, d=28+Math.random()*40;
//       dot.style.setProperty("--tx",`${Math.cos(rad)*d}px`);
//       dot.style.setProperty("--ty",`${Math.sin(rad)*d}px`);
//       dot.style.cssText += `background:${SPARK_COLS[i%SPARK_COLS.length]};left:22px;top:22px;animation-duration:${.5+Math.random()*.4}s;`;
//       wrap.appendChild(dot);
//     });
//     const em = document.createElement("span");
//     em.textContent = EMOS[Math.floor(Math.random()*EMOS.length)];
//     em.style.cssText = "position:absolute;font-size:20px;left:16px;top:12px;animation:fadeUp .7s ease-out forwards;";
//     wrap.appendChild(em);
//     sparksRef.current.appendChild(wrap);
//     setTimeout(()=>wrap?.remove(), 1100);
//   }, []);

//   return (
//     <div className="font-cormorant bg-rose-50 text-rose-950 selection:bg-rose-200 selection:text-rose-950"
//          style={{ fontFamily:"'Cormorant Garamond',serif" }}>

//       {/* Fixed DOM portals for dynamically spawned elements */}
//       <div ref={heartsRef} style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:20 }} />
//       <div ref={confRef}   style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:200 }} />
//       <div ref={sparksRef} style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:999 }} />

//       <Navbar />
//       <Hero         onSparkle={clickSparkle} onConfetti={launchConfetti} />
//       <Countdown />
//       <PersonalMessage />
//       <LoveStory />
//       <EventDetails />
//       <Gallery      onSparkle={clickSparkle} />
//       <CoupleCards />
//       <Wishes       onConfetti={launchConfetti} />
//       <FinalBlessing onConfetti={launchConfetti} />
//       <Footer />
//     </div>
//   );
// }

import React from "react";
import { useReveal } from "./WeddingFolder/Shared";
import Hero from "./WeddingFolder/Hero";
import Wishes from "./WeddingFolder/Whishes";
// import Gallery from "./Gallary";
import Footer from "./HomeFolder/Footer";
import Couple from "./WeddingFolder/Couple";
import Details from "./WeddingFolder/Details";
import Timeline from "./WeddingFolder/Timeline";
import BlessingWall from "./WeddingFolder/BlessingWall";

// Import Components


export default function WeddingHome() {
  const { vis, bind } = useReveal();
  
  // Animation helper
  const anim = (sec, cls, delay = 0) =>
    vis[sec] ? { className: cls, style: { animationDelay: `${delay}s` } } : { style: { opacity: 0 } };

  return (
    <div style={{ fontFamily: "'Cormorant Upright',serif", overflowX: "hidden", background: "#f8f5ff" }}>
      {/* Inject Global CSS (The CSS variable from your original code) */}
      <style dangerouslySetInnerHTML={{ __html: CSS_STYLES }} />

      <Hero />
      
      <Wishes anim={anim} bind={bind} />
      
      <Couple anim={anim} bind={bind} />

      <BlessingWall anim={anim} bind={bind} />
      
      <Details anim={anim} bind={bind} />
      
      <Timeline anim={anim} bind={bind} />
      
      {/* <Gallery anim={anim} bind={bind} /> */}
      
      <Footer />
    </div>
  );
}

// Keep your CSS string constant here or in a separate file
const CSS_STYLES = `
  @keyframes hue { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(360deg); } }
  .anim-up { animation: fadeUp 1s forwards; }
  /* ... rest of your original CSS ... */
`;