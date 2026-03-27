import React from 'react'

const steps = [
  {
    title: "Login / Signup",
    desc: "Create your free account to start building your digital memory album securely.",
    icon: "https://cdn-icons-png.flaticon.com/128/7856/7856126.png",
    link: "Start Now",
  },
  {
    title: "Create Album",
    desc: "Start a new album for weddings, trips, birthdays or any special moments.",
    icon: "https://cdn-icons-png.flaticon.com/128/10390/10390733.png",
    link: "Learn More",
  },
  {
    title: "Create Memories",
    desc: "Organize your album into categories like events, days, or people.",
    icon: "https://cdn-icons-png.flaticon.com/128/3507/3507564.png",
    link: "Learn More",
  },
  {
    title: "Upload Photos & Videos",
    desc: "Add unlimited memories and relive them anytime on any device.",
    icon: "https://cdn-icons-png.flaticon.com/128/11764/11764930.png",
    link: "Learn More",
  }
]

const HowItWorks = () => {
  return (
    <section className="py-16 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-12">
          How to Create Album for Free?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col justify-center items-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-4xl mb-4"><img src={step.icon} alt="icon" className="w-16 h-16" /></div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">{step.desc}</p>
              <a className="text-rose-400 hover:text-rose-500 cursor-pointer text-sm font-medium mt-2 block">{step.link}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks