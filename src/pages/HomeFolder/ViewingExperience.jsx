import React from 'react'
import { HomeData } from '../../assets/assets'

const ViewingExperience = () => {
  return (
    <section className="relative h-[800px] p-10  flex items-center"
      style={{
        backgroundImage: `url(${HomeData.BannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="flex justify-start">
          <div className="bg-white/95 backdrop-blur rounded shadow-2xl p-6 sm:p-8 lg:p-10 max-w-lg w-full">
            <span className="text-sm uppercase tracking-wide text-rose-500">Viewing Experience</span>
            <h2 className="text-2xl sm:text-xl lg:text-2xl font-semibold mt-2 mb-4 text-zinc-900">Designed to Bring Your Memories to Life</h2>
            <p className="text-zinc-600 leading-relaxed mb-6">
              Experience your digital albums in a beautifully crafted interface built for clarity, speed, and emotional connection. 
              Every photo and video is displayed in high resolution, optimized for any screen — from smartphones to large displays.
            </p>
            <div className="space-y-3 text-sm sm:text-base text-zinc-700">
              <div>• Immersive full-screen album viewing</div>
              <div>• Seamless mobile swipe navigation</div>
              <div>• High-definition image and video playback</div>
              <div>• Private, secure access to your memories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewingExperience