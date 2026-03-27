import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Life Time Memories
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400">
            Preserve your precious moments forever with beautifully designed digital albums. 
            Secure, accessible, and made for lasting memories.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Create Album</li>
            <li className="hover:text-white cursor-pointer">Upload Memories</li>
            <li className="hover:text-white cursor-pointer">Viewing Experience</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Security</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-zinc-800 mt-10 pt-5 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Lifetime Memories. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer