import React, { useState } from 'react'
import { HomeData } from '../assets/assets'
import Hero from './HomeFolder/Hero'
import Navbar from './HomeFolder/Navbar'
import WhyAlbum from './HomeFolder/WhyAlbum'
import HowItWorks from './HomeFolder/HowItWorks'
import ViewingExperience from './HomeFolder/ViewingExperience'
import Features from './HomeFolder/Features'
import Loveit from './HomeFolder/Loveit'
import Advice from './HomeFolder/Advice'
import Footer from './HomeFolder/Footer'

const Home = () => {

    const [isAuthenticated] = useState(
      !!localStorage.getItem("token")
    );

  return (
    <>
    <div id='home' className="relative h-screen bg-amber-50"
      style={{
        backgroundImage: `url(${HomeData.RoseLove})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: 'var(--color-TextColor)',
        backgroundColor: 'var(--color-BgColor)',
      }}>
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-10"></div>
     <div className="relative z-20 h-full">
        <Hero isAuthenticated={isAuthenticated} />
     </div>
    </div>
        <WhyAlbum />
        <HowItWorks />
        <ViewingExperience />
        <Loveit />
        <Features />
        <Advice />
        <Footer />
    </>
  )
}

export default Home
