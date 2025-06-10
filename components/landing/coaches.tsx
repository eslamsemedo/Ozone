import React from 'react'
import Image from 'next/image'

const coaches = () => {
  return (
    <div>
      <section id="trainers" className="py-20 bg-slate-900 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold mb-4 text-white animate-slide-in-up">Meet Our Trainers</h2>
            <div className="w-24 h-1 bg-[#3bc1cd] mx-auto mb-4 animate-expand"></div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-slide-in-up animate-delay-200">
              Our certified fitness experts are dedicated to helping you achieve your goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Head Trainer",
                specialty: "Strength & Conditioning",
                image: "/landing/coache3.jpg",
              },
              {
                name: "Sarah Williams",
                role: "Yoga Instructor",
                specialty: "Flexibility & Mindfulness",
                image: "/landing/coache4.jpg",
              },
              {
                name: "Michael Chen",
                role: "Nutrition Coach",
                specialty: "Weight Management",
                image: "/landing/coache2.jpg",
              },
              {
                name: "Priya Patel",
                role: "HIIT Specialist",
                specialty: "Cardio & Fat Loss",
                image: "/landing/coache1.jpg",
              },
            ].map((trainer, index) => (
              <div key={index} className="group animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="relative overflow-hidden rounded-xl mb-4 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-4">
                    <div className="transform translate-y-full group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <p className="text-white font-medium text-center bg-[#3bc1cd] px-3 py-1 rounded-full text-sm">
                        {trainer.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-[#3bc1cd]/0 group-hover:border-[#3bc1cd]/50 rounded-xl transition-all duration-500"></div>
                  <Image
                    src={trainer.image || "/placeholder.svg"}
                    alt={trainer.name}
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-xl transition-all duration-500"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#3bc1cd] transition-colors duration-300">
                    {trainer.name}
                  </h3>
                  <p className="text-[#3bc1cd] group-hover:text-[#3bc1cd] transition-colors duration-300">
                    {trainer.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default coaches
