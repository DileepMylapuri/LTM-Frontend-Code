import React from 'react'

const Features = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-light  text-center mb-12">Website Features : Single Website, Multiple Options</h2>
      
      {/* CSS Grid for Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Page Flip Effect", desc: "Experience the real feel of flipping pages on your mobile or tablet." },
          { title: "Background Music", desc: "Add your favorite tracks to play while you relive your moments." },
          { title: "Privacy Protected", desc: "Share your albums via secure access codes only." },
          { title: "Offline Access", desc: "Download once and view your memories anytime, anywhere." },
          { title: "Video Integration", desc: "Embed videos within your photo pages for an interactive experience." },
          { title: "High Resolution", desc: "Crystal clear image quality optimized for retina displays." }
        ].map((feature, idx) => (
          <div key={idx} className="p-8 shadow-2xl hover:shadow-md transition-shadow bg-gray-50 group">
            <div className="h-12 w-12 bg-rose-100 rounded-lg mb-4 flex items-center justify-center text-rose-400 font-bold group-hover:bg-rose-500 group-hover:text-white transition-colors">
              {idx + 1}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features
