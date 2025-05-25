import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTelegramPlane } from 'react-icons/fa'

export default function footer() {
  return (
    <footer className="bg-[#000000] text-white py-16 px-4 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="flex-1">
          <h4 className="text-[#3f9bd8] text-sm uppercase mb-2">Get in Touch</h4>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-400 mb-6">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="flex items-start mb-4 gap-3">
            <FaMapMarkerAlt className="text-[#3f9bd8] mt-1" />
            <div>
              <h5 className="font-semibold">Location</h5>
              <p className="text-gray-400">Ozone Street, Hurghada City</p>
            </div>
          </div>

          <div className="flex items-start mb-4 gap-3">
            <FaPhoneAlt className="text-[#3f9bd8] mt-1" />
            <div>
              <h5 className="font-semibold">Phone</h5>
              <p className="text-gray-400">+20123456789</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaEnvelope className="text-[#3f9bd8] mt-1" />
            <div>
              <h5 className="font-semibold">Email</h5>
              <p className="text-gray-400">EELU@ozonefitness.com</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-[#151825] p-8 rounded-2xl">
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-transparent border-b border-gray-600 py-2 text-white outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent border-b border-gray-600 py-2 text-white outline-none"
            />
            <input
              type="text"
              placeholder="Subject"
              className="bg-transparent border-b border-gray-600 py-2 text-white outline-none"
            />
            <textarea
              placeholder="Your Message"
              className="bg-transparent border-b border-gray-600 py-2 text-white outline-none h-24 resize-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#3f9bd8] hover:bg-[#3f9bd88c] text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
            >
              <FaTelegramPlane />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}
