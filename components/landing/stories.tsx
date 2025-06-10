import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { MessageSquare } from 'lucide-react'

const stories = () => {
  return (
    <div>
      <section id="testimonials" className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold mb-4 text-white animate-slide-in-up">Success Stories</h2>
            <div className="w-24 h-1 bg-[#3bc1cd] mx-auto mb-4 animate-expand"></div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-slide-in-up animate-delay-200">
              Hear from our members who have transformed their lives with FitPro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Jessica T.",
                image: "/landing/profile-user.png",
                quote:
                  "I've lost 30 pounds and gained so much confidence. The trainers at FitPro are amazing and the community keeps me motivated!",
                achievement: "Lost 30 lbs in 6 months",
              },
              {
                name: "Marcus L.",
                image: "/landing/profile-user.png",
                quote:
                  "After my injury, I thought I'd never be active again. The personalized program at FitPro helped me recover and get stronger than ever.",
                achievement: "Recovered from sports injury",
              },
              {
                name: "Aisha K.",
                image: "/landing/profile-user.png",
                quote:
                  "The nutrition coaching changed my relationship with food. I've gained muscle, improved my performance, and feel amazing every day.",
                achievement: "Gained 12 lbs of muscle",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-slate-800 border-slate-700 hover:border-teal-900 transition-all duration-500 animate-on-scroll group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="relative mr-4 transition-transform duration-300">
                      <div className="absolute inset-0 bg-[#3bc1cd]/20 rounded-full blur-sm group-hover:bg-[#3bc1cd]/40 transition-all duration-300"></div>
                      <Image
                        src={testimonial.image || "/img/fitness2.jpg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-[#3bc1cd] relative z-10 group-hover:border-[#3bc1cd] transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-[#3bc1cd] transition-colors duration-300">
                        {testimonial.name}
                      </h3>
                      <p className="text-[#3bc1cd] text-sm group-hover:text-[#3bc1cd] transition-colors duration-300">
                        {testimonial.achievement}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute -top-2 -left-2 h-8 w-8 text-slate-700 opacity-30 group-hover:text-[#3bc1cd]/30 transition-colors duration-300" />
                    <p className="text-slate-300 italic pl-6 group-hover:text-slate-200 transition-colors duration-300">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default stories
