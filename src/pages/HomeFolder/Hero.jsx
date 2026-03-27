import React from 'react'
import { useNavigate } from 'react-router-dom';

const Hero = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  return (
  <section className="bg-transparent lg:py-20 p-10">
    <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center">
      <div className="lg:w-1/2 text-center m-10 lg:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-light text-white ">Creating memories for a lifetime</h1>
        <p className="text-lg text-white max-w-lg mx-auto lg:mx-0">Store your valuable memories in a secure, interactive digital album. Relive your moments with page whishes, videos, and more. Create your Album today!</p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
          <button  onClick={() => navigate(!isAuthenticated ? "/login" : "/create-memory")} className=" bg-rose-400 text-white cursor-pointer px-10 py-2 rounded-lg font-semibold hover:bg-rose-400 hover:underline">Create Album Account</button>
        </div>
        <h3 className='text-2xl text-white mt-4'>Now you can view your album as VIDEO!</h3>
      </div>
      <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center px-2 sm:px-0">
        <div className="relative w-full max-w-md sm:max-w-lg aspect-video rounded-xl overflow-hidden shadow-2xl">
          <iframe className="w-full h-full"
            src="https://www.youtube.com/embed/JNKZN8uq1H8"
            title="Album Preview Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"/>
        </div>
      </div>
    </div>
  </section>
  )
};

export default Hero


